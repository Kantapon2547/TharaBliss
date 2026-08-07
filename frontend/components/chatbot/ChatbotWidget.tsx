"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getAnnouncements, Announcement } from "@/lib/api";
import { matchFaq, QUICK_REPLIES } from "@/lib/faqData";
import { usePathname } from "next/navigation";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageGroup,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { QUIZ_QUESTIONS, scoredToScent, ScentResult, QuizOption } from "@/lib/quizData";

const POLL_INTERVAL = 30_000;
const STORAGE_KEY = "thara_last_seen_announcement_id";
const SIZE_KEY = "thara_widget_size";

const DEFAULT_SIZE = { width: 340, height: 540 };
const MIN_SIZE = { width: 280, height: 360 };
const MAX_SIZE = { width: 520, height: 760 };

interface ChatProduct {
  id: string | number;
  name: string;
  image: string | null;
  caption?: string; // price for products, tagline for announcements/coming-soon
  url?: string; // omitted for coming-soon items with nothing to link to yet
  ctaLabel?: string;
}

interface QuizQuestionPayload {
  type: "question";
  questionIndex: number; // 0-based index into QUIZ_QUESTIONS
  question: string;
  options: QuizOption[];
  step: number;
  total: number;
}

interface QuizResultPayload {
  type: "result";
  result: ScentResult;
}

type QuizPayload = QuizQuestionPayload | QuizResultPayload;

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  image?: string;
  products?: ChatProduct[];
  quiz?: QuizPayload;
}

interface Size {
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

// ── Scent quiz intent detection (Thai + English) ──
const QUIZ_KEYWORDS = [
  "แบบทดสอบกลิ่น", "แบบทดสอบ", "ทำควิซ", "ควิซ", "หากลิ่นที่ใช่", "หากลิ่นให้หน่อย",
  "ไม่รู้จะเลือกกลิ่นไหน", "scent quiz", "find my scent", "which scent", "scent finder",
];
function isQuizIntent(text: string): boolean {
  const q = text.toLowerCase();
  return QUIZ_KEYWORDS.some((k) => q.includes(k.toLowerCase()));
}

export default function ChatbotWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Array<"calm" | "elegant" | "fresh">>([]);
  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Resizable panel size
  const [size, setSize] = useState<Size>(DEFAULT_SIZE);
  const [isResizing, setIsResizing] = useState(false);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const suggestionRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const resizeState = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });

  // ── Load persisted chat history and panel size ──
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("thara_chat_history");
      if (savedHistory) setChatMessages(JSON.parse(savedHistory));
    } catch (e) {
      console.error("Error loading chat history:", e);
    }

    try {
      const savedSize = localStorage.getItem(SIZE_KEY);
      if (savedSize) {
        const parsed = JSON.parse(savedSize) as Size;
        setSize({
          width: clamp(parsed.width, MIN_SIZE.width, MAX_SIZE.width),
          height: clamp(parsed.height, MIN_SIZE.height, MAX_SIZE.height),
        });
      }
    } catch (e) {
      console.error("Error loading widget size:", e);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("thara_chat_history", JSON.stringify(chatMessages));
    }
  }, [chatMessages, isLoaded]);

  const fetchAnnouncements = async () => {
    try {
      const data = await getAnnouncements();
      setAnnouncements(data);
      const lastSeen = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
      const unread = data.filter((a) => a.id > lastSeen).length;
      setUnreadCount(unread);
    } catch (err) {
      console.error("Widget fetch error:", err);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    intervalRef.current = setInterval(fetchAnnouncements, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestionPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Drag-to-resize panel (handle sits at the panel's top-left corner) ──
  const handleResizePointerMove = useCallback((e: PointerEvent) => {
    const dx = resizeState.current.startX - e.clientX; // dragging left grows width
    const dy = resizeState.current.startY - e.clientY; // dragging up grows height

    const width = clamp(resizeState.current.startWidth + dx, MIN_SIZE.width, MAX_SIZE.width);
    const height = clamp(resizeState.current.startHeight + dy, MIN_SIZE.height, MAX_SIZE.height);
    setSize({ width, height });
  }, []);

  const handleResizePointerUp = useCallback(() => {
    window.removeEventListener("pointermove", handleResizePointerMove);
    window.removeEventListener("pointerup", handleResizePointerUp);
    document.body.style.userSelect = "";
    setIsResizing(false);

    setSize((prev) => {
      try {
        localStorage.setItem(SIZE_KEY, JSON.stringify(prev));
      } catch (e) {
        console.error("Error saving widget size:", e);
      }
      return prev;
    });
  }, [handleResizePointerMove]);

  const handleResizePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    resizeState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: size.width,
      startHeight: size.height,
    };
    setIsResizing(true);
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", handleResizePointerMove);
    window.addEventListener("pointerup", handleResizePointerUp);
  };

  const resetSize = () => {
    setSize(DEFAULT_SIZE);
    try {
      localStorage.setItem(SIZE_KEY, JSON.stringify(DEFAULT_SIZE));
    } catch (e) {
      console.error("Error saving widget size:", e);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (announcements.length > 0) {
      const maxId = Math.max(...announcements.map((a) => a.id));
      localStorage.setItem(STORAGE_KEY, String(maxId));
      setUnreadCount(0);
    }
  };

  const handleClose = () => setOpen(false);

  const handleBubbleClick = () => {
    if (open) handleClose(); else handleOpen();
  };

  const handleClearHistory = () => {
    if (window.confirm("คุณต้องการลบประวัติการสนทนาทั้งหมดใช่หรือไม่? / Do you want to clear all chat history?")) {
      setChatMessages([]);
      localStorage.removeItem("thara_chat_history");
    }
  };

  // ── sendMessage: quick-reply buttons use the instant local FAQ matcher,
  //    free-typed messages go to the local Qwen3-8B model via /api/chat ──
  const sendMessage = async (text: string, opts?: { skipLLM?: boolean }) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };
    setChatMessages((prev) => [...prev, userMsg]);

    if (!opts?.skipLLM && isQuizIntent(trimmed)) {
      startQuiz();
      return;
    }

    if (opts?.skipLLM) {
      const faq = matchFaq(trimmed);
      const botMessages: ChatMessage[] = [];
      const now = Date.now();

      if (faq.image) {
        botMessages.push({ id: `b-t-${now}`, sender: "bot", text: faq.answer });
        botMessages.push({ id: `b-i-${now + 1}`, sender: "bot", text: "", image: faq.image });
      } else {
        botMessages.push({ id: `b-${now}`, sender: "bot", text: faq.answer });
      }

      setChatMessages((prev) => [...prev, ...botMessages]);
      return;
    }

    setIsTyping(true);
    try {
      const history = chatMessages
        .filter((m) => !m.image) // keep image/QR cards out of LLM context
        .map((m) => ({
          role: m.sender === "user" ? ("user" as const) : ("assistant" as const),
          content: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history, pathname }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: `b-${Date.now()}`,
        sender: "bot",
        text: res.ok
          ? data.reply
          : (data.error || "ขออภัยค่ะ ระบบแชทขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้งค่ะ 🙏"),
        products:
          res.ok && Array.isArray(data.products) && data.products.length > 0
            ? data.products
            : undefined,
      };
      setChatMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setChatMessages((prev) => [
        ...prev,
        { id: `b-${Date.now()}`, sender: "bot", text: "ขออภัยค่ะ เชื่อมต่อกับผู้ช่วยไม่ได้ในขณะนี้" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── Scent quiz: runs entirely client-side, mirrors the Help Center's
  //    ScentQuiz component using the same QUIZ_QUESTIONS / scoredToScent ──
  const startQuiz = () => {
    setShowSuggestionPopup(false);
    setQuizAnswers([]);
    const firstQuestion = QUIZ_QUESTIONS[0];
    const introMsg: ChatMessage = {
      id: `b-quiz-intro-${Date.now()}`,
      sender: "bot",
      text: "มาช่วยหากลิ่นที่ใช่สำหรับคุณกันเถอะค่ะ 🌿 ตอบคำถามสั้นๆ 3 ข้อนะคะ",
    };
    const questionMsg: ChatMessage = {
      id: `b-quiz-q-${firstQuestion.id}-${Date.now()}`,
      sender: "bot",
      text: "",
      quiz: {
        type: "question",
        questionIndex: 0,
        question: firstQuestion.question,
        options: firstQuestion.options,
        step: 1,
        total: QUIZ_QUESTIONS.length,
      },
    };
    setChatMessages((prev) => [...prev, introMsg, questionMsg]);
  };

  const handleQuizAnswer = (questionIndex: number, option: QuizOption) => {
    const nextAnswers = [...quizAnswers, option.value];
    setQuizAnswers(nextAnswers);

    const userMsg: ChatMessage = {
      id: `u-quiz-${Date.now()}`,
      sender: "user",
      text: option.text,
    };

    const nextIndex = questionIndex + 1;
    if (nextIndex < QUIZ_QUESTIONS.length) {
      const nextQuestion = QUIZ_QUESTIONS[nextIndex];
      const nextQuestionMsg: ChatMessage = {
        id: `b-quiz-q-${nextQuestion.id}-${Date.now()}`,
        sender: "bot",
        text: "",
        quiz: {
          type: "question",
          questionIndex: nextIndex,
          question: nextQuestion.question,
          options: nextQuestion.options,
          step: nextIndex + 1,
          total: QUIZ_QUESTIONS.length,
        },
      };
      setChatMessages((prev) => [...prev, userMsg, nextQuestionMsg]);
    } else {
      const result = scoredToScent(nextAnswers);
      const resultMsg: ChatMessage = {
        id: `b-quiz-result-${Date.now()}`,
        sender: "bot",
        text: "",
        quiz: { type: "result", result },
      };
      setChatMessages((prev) => [...prev, userMsg, resultMsg]);
      setQuizAnswers([]);
    }
  };

  const handleSend = (text: string) => sendMessage(text);

  const handleQuickReply = (triggerText: string) => {
    sendMessage(triggerText, { skipLLM: true });
    setShowSuggestionPopup(false);
  };

  return (
    <>
      <style>{`
        .thara-markdown p { margin: 0 0 0.5em; }
        .thara-markdown p:last-child { margin-bottom: 0; }
        .thara-markdown ul, .thara-markdown ol { margin: 0.3em 0; padding-left: 1.2em; }
        .thara-markdown strong { font-weight: 600; }
        .thara-markdown a {
          color: #0F6E56;
          text-decoration: underline;
          word-break: break-word;
        }
        .thara-markdown a:hover {
          color: #0a5240;
        }
        .thara-chat-wrapper {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 1rem;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
        .thara-chat-panel {
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 40px rgba(0,0,0,0.15);
          border: 1px solid #EFEAE1;
          display: flex;
          flex-direction: column;
          animation: slide-up 0.25s ease;
          position: relative;
        }
        .thara-chat-panel.is-resizing {
          transition: none !important;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .thara-chat-header {
          background: #0F6E56;
          color: #FBF5DD;
          padding: 0.9rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .thara-chat-header-btn {
          background: rgba(255,255,255,0.15);
          border: none;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          cursor: pointer;
          color: #FBF5DD;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s, transform 0.1s;
        }
        .thara-chat-header-btn:hover {
          background: rgba(255,255,255,0.25);
        }
        .thara-chat-header-btn:active {
          transform: scale(0.95);
        }

        .thara-chat-panel .cs-main-container {
          border: none !important;
        }
        .thara-chat-panel .cs-chat-container {
          background: #F5F2EB !important;
        }
        .thara-chat-panel .cs-message-list {
          background: #F5F2EB !important;
          padding: 0.75rem !important;
        }
        .thara-chat-panel .cs-message__content {
          background: #FFFFFF !important;
          color: #2F3A33 !important;
          border: 1px solid #EFEAE1 !important;
          border-radius: 0 12px 12px 12px !important;
          font-size: 0.85rem !important;
          line-height: 1.6 !important;
        }
        .thara-chat-panel .cs-message--outgoing .cs-message__content {
          background: #0F6E56 !important;
          color: #FBF5DD !important;
          border: none !important;
          border-radius: 12px 0 12px 12px !important;
        }
        .thara-chat-panel .cs-message-group__avatar .cs-avatar {
          background: #0F6E56 !important;
        }
        .thara-chat-panel .cs-message-list__scroll-wrapper {
          padding: 0 !important;
        }
        .thara-chat-panel .cs-message-input {
          background: #FFFFFF !important;
          border-top: 1px solid #EFEAE1 !important;
          padding-left: 84px !important;
        }
        .thara-chat-panel .cs-message-input__content-editor-wrapper,
        .thara-chat-panel .cs-message-input__content-editor {
          background: #F5F2EB !important;
          color: #2F3A33 !important;
        }
        .thara-chat-panel .cs-button--send svg path {
          fill: #0F6E56 !important;
        }

        @keyframes pulse-ring {
          0%   { transform: scale(1);    opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0;   }
          100% { transform: scale(1.55); opacity: 0;   }
        }
        .thara-bubble-pulse::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #0F6E56;
          animation: pulse-ring 2s ease-out infinite;
          z-index: -1;
        }
        .thara-bubble {
          position: relative;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #0F6E56;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(15,110,86,0.35);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .thara-bubble:hover {
          transform: scale(1.08);
        }
        .thara-badge {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #E53935;
          color: #fff;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }

        .thara-announce-card {
          background: #FFFFFF;
          border: 1px solid #EFEAE1;
          border-radius: 12px;
          overflow: hidden;
          width: 220px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .thara-announce-card:hover {
          border-color: #0F6E56;
          box-shadow: 0 2px 12px rgba(15,110,86,0.10);
        }
        .thara-announce-card img {
          width: 100%;
          height: 100px;
          object-fit: cover;
          display: block;
        }
        .thara-announce-card-body {
          padding: 0.6rem 0.8rem;
        }
        .thara-announce-card-name {
          font-size: 0.75rem;
          color: #0F6E56;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin: 0 0 0.2rem;
        }
        .thara-announce-card-msg {
          font-size: 0.82rem;
          color: #2F3A33;
          line-height: 1.5;
          margin: 0 0 0.45rem;
        }
        .thara-announce-card-link {
          font-size: 0.76rem;
          color: #0F6E56;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .thara-announce-card-link:hover {
          color: #0a5240;
        }

        /* ── PRODUCT CARDS (shown under bot replies that mention specific products) ── */
        .thara-product-row {
          display: flex;
          gap: 0.6rem;
          overflow-x: auto;
          margin-top: 0.6rem;
          padding-bottom: 2px;
        }
        .thara-product-card {
          background: #FFFFFF;
          border: 1px solid #EFEAE1;
          border-radius: 12px;
          overflow: hidden;
          width: 148px;
          flex: 0 0 auto;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .thara-product-card:hover {
          border-color: #0F6E56;
          box-shadow: 0 2px 12px rgba(15,110,86,0.10);
        }
        .thara-product-card-img {
          width: 100%;
          height: 88px;
          object-fit: cover;
          display: block;
          background: #F5F2EB;
        }
        .thara-product-card-img-placeholder {
          width: 100%;
          height: 88px;
          background: #F5F2EB;
        }
        .thara-product-card-body {
          padding: 0.5rem 0.65rem 0.6rem;
        }
        .thara-product-card-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: #2F3A33;
          margin: 0 0 0.15rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .thara-product-card-price {
          font-size: 0.74rem;
          color: #0F6E56;
          font-weight: 600;
          margin: 0 0 0.35rem;
        }
        .thara-product-card-link {
          font-size: 0.72rem;
          color: #0F6E56;
          text-decoration: none;
          font-weight: 500;
        }
        .thara-product-card-link:hover {
          color: #0a5240;
        }
        .thara-product-card-badge {
          display: inline-block;
          font-size: 0.68rem;
          color: #0F6E56;
          background: #EAF3EC;
          border-radius: 999px;
          padding: 0.15rem 0.5rem;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        /* ── SCENT QUIZ (question buttons + result card) ── */
        .thara-quiz-question {
          max-width: 240px;
        }
        .thara-quiz-progress {
          font-size: 0.7rem;
          color: #0F6E56;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin: 0 0 0.4rem;
        }
        .thara-quiz-question-text {
          font-size: 0.85rem;
          color: #2F3A33;
          line-height: 1.5;
          margin: 0 0 0.65rem;
        }
        .thara-quiz-options {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .thara-quiz-option-btn {
          background: #F5F2EB;
          border: 1px solid #EFEAE1;
          color: #2F3A33;
          font-size: 0.8rem;
          line-height: 1.4;
          padding: 0.55rem 0.75rem;
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s;
        }
        .thara-quiz-option-btn:hover:not(:disabled) {
          background: #EAF3EC;
          border-color: #0F6E56;
          color: #0F6E56;
        }
        .thara-quiz-option-btn:disabled {
          opacity: 0.45;
          cursor: default;
        }
        .thara-quiz-result {
          width: 220px;
          border-radius: 14px;
          border: 1px solid #EFEAE1;
          padding: 1rem 1.1rem;
          text-align: center;
        }
        .thara-quiz-result-mood {
          display: inline-block;
          background: rgba(255,255,255,0.7);
          font-size: 9px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 2px 10px;
          border-radius: 20px;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .thara-quiz-result-name {
          font-size: 1rem;
          font-weight: 500;
          color: #2F3A33;
          margin: 0 0 0.5rem;
        }
        .thara-quiz-result-desc {
          font-size: 0.78rem;
          color: #2F3A33;
          line-height: 1.6;
          margin: 0 0 0.65rem;
        }
        .thara-quiz-result-best {
          font-size: 0.72rem;
          color: #666;
          margin: 0 0 0.85rem;
        }
        .thara-quiz-result-actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .thara-quiz-retake-btn {
          background: transparent;
          border: 1px solid #0F6E56;
          color: #0F6E56;
          border-radius: 20px;
          padding: 0.45rem 0.9rem;
          font-size: 0.75rem;
          cursor: pointer;
          transition: background 0.15s;
        }
        .thara-quiz-retake-btn:hover {
          background: rgba(15,110,86,0.08);
        }
        .thara-quiz-cta-btn {
          background: #0F6E56;
          color: #FBF5DD;
          border-radius: 20px;
          padding: 0.45rem 0.9rem;
          font-size: 0.75rem;
          text-decoration: none;
          font-weight: 500;
          transition: background 0.15s;
        }
        .thara-quiz-cta-btn:hover {
          background: #0a5240;
        }

        /* ── SUGGESTION ICON + POPUP (overlay, outside ChatContainer) ── */
        .thara-suggestion-overlay {
          position: absolute;
          left: 10px;
          bottom: 10px;
          z-index: 20;
        }
        .thara-suggestion-icon-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #0F6E56;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s;
        }
        .thara-suggestion-icon-btn:hover {
          transform: scale(1.08);
        }
        .thara-suggestion-popup {
          position: absolute;
          left: 0;
          bottom: 40px;
          width: 250px;
          max-height: 260px;
          overflow-y: auto;
          background: #FFFFFF;
          border: 1px solid #EFEAE1;
          border-radius: 14px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.14);
          padding: 0.6rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          animation: pop-up 0.18s ease;
        }
        @keyframes pop-up {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .thara-suggestion-popup-item {
          background: #F5F2EB;
          border: 1px solid #EFEAE1;
          color: #2F3A33;
          font-size: 0.82rem;
          padding: 0.55rem 0.8rem;
          border-radius: 10px;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s;
        }
        .thara-suggestion-popup-item:hover {
          background: #EAF3EC;
          border-color: #0F6E56;
          color: #0F6E56;
        }

        /* ── RESIZE HANDLE ── */
        .thara-resize-handle {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          cursor: nwse-resize;
          z-index: 30;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 4px;
          touch-action: none;
        }
        .thara-resize-handle svg path {
          stroke: rgba(251,245,221,0.75);
          transition: stroke 0.15s;
        }
        .thara-resize-handle:hover svg path {
          stroke: #FBF5DD;
        }
      `}</style>

      <div className="thara-chat-wrapper" ref={wrapperRef}>

        {open && (
          <div
            className={`thara-chat-panel ${isResizing ? "is-resizing" : ""}`}
            style={{ width: size.width, height: size.height }}
          >
            {/* Resize handle — drag to change panel size */}
            <div
              className="thara-resize-handle"
              onPointerDown={handleResizePointerDown}
              onDoubleClick={resetSize}
              title="Drag to resize · double-click to reset"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M10 2L2 10M10 6L6 10" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="thara-chat-header">
              <div>
                <p style={{ margin: 0, fontWeight: 500, fontSize: "0.95rem" }}>
                  Thara Bliss 🌿
                </p>
                <p style={{ margin: 0, fontSize: "11px", opacity: 0.7, marginTop: 2 }}>
                  Refresh Your Senses. Relax Your Mind
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Clear History Button */}
                <button
                  className="thara-chat-header-btn"
                  onClick={handleClearHistory}
                  title="ล้างประวัติการสนทนา / Clear Chat History"
                  aria-label="Clear Chat History"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M16 3h5v5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M8 21H3v-5" />
                  </svg>
                </button>

                {/* Close Button */}
                <button
                  className="thara-chat-header-btn"
                  onClick={handleClose}
                  aria-label="Close"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", position: "relative" }}>
              <MainContainer>
                <ChatContainer>
                  <MessageList>

                    <MessageGroup direction="incoming" sender="Thara Bliss" avatarPosition="cl">
                      <MessageGroup.Messages>
                        <Message
                          model={{
                            message: "สวัสดีค่ะ! 👋 มีอะไรให้ช่วยไหมคะ กดปุ่ม 💬 ด้านล่างเพื่อดูคำถามแนะนำ หรือพิมพ์คำถามได้เลยค่ะ",
                            sentTime: "just now",
                            sender: "Thara Bliss",
                            direction: "incoming",
                            position: "single",
                          }}
                        />
                      </MessageGroup.Messages>
                    </MessageGroup>

                    {announcements.length > 0 && announcements.map((a) => (
                      <MessageGroup
                        key={a.id}
                        direction="incoming"
                        sender="Thara Bliss"
                        avatarPosition="cl"
                      >
                        <MessageGroup.Messages>
                          <Message
                            model={{
                              type: "custom",
                              sentTime: a.created_at,
                              sender: "Thara Bliss",
                              direction: "incoming",
                              position: "single",
                            }}
                          >
                            <Message.CustomContent>
                              <div className="thara-announce-card">
                                {a.product_image_url && (
                                  <img src={a.product_image_url} alt={a.product_name} />
                                )}
                                <div className="thara-announce-card-body">
                                  <p className="thara-announce-card-name">{a.product_name}</p>
                                  <p className="thara-announce-card-msg">{a.message}</p>
                                  <a
                                    href={`/products/${a.product_id}`}
                                    className="thara-announce-card-link"
                                  >
                                    View Product →
                                  </a>
                                </div>
                              </div>
                            </Message.CustomContent>
                          </Message>
                        </MessageGroup.Messages>
                      </MessageGroup>
                    ))}

                    {chatMessages.map((m) => (
                      <MessageGroup
                        key={m.id}
                        direction={m.sender === "user" ? "outgoing" : "incoming"}
                        sender={m.sender === "user" ? "You" : "Thara Bliss"}
                        avatarPosition={m.sender === "user" ? "cr" : "cl"}
                      >
                        <MessageGroup.Messages>
                          {m.image ? (
                            <Message
                              model={{
                              type: "custom",
                              direction: "incoming",
                              position: "single",
                          }}
                        >
                          <Message.CustomContent>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                              {m.text && <p style={{ margin: 0, marginBottom: 8 }}>{m.text}</p>}
                              <img
                                src={m.image}
                                alt="QR Code"
                                style={{
                                  width: 180,
                                  borderRadius: 8,
                                  display: "block",
                                }}
                              />
                            </div>
                          </Message.CustomContent>
                        </Message>
                      ) : m.quiz ? (
                        <Message
                          model={{
                            type: "custom",
                            sentTime: "just now",
                            sender: "Thara Bliss",
                            direction: "incoming",
                            position: "single",
                          }}
                        >
                          <Message.CustomContent>
                            {m.quiz.type === "question" ? (
                              <div className="thara-quiz-question">
                                <p className="thara-quiz-progress">
                                  คำถามที่ {m.quiz.step} จาก {m.quiz.total}
                                </p>
                                <p className="thara-quiz-question-text">{m.quiz.question}</p>
                                <div className="thara-quiz-options">
                                  {m.quiz.options.map((opt, idx) => {
                                    const isLatest =
                                      chatMessages.length > 0 &&
                                      chatMessages[chatMessages.length - 1].id === m.id;
                                    return (
                                      <button
                                        key={idx}
                                        className="thara-quiz-option-btn"
                                        disabled={!isLatest}
                                        onClick={() =>
                                          handleQuizAnswer(m.quiz!.type === "question" ? m.quiz!.questionIndex : 0, opt)
                                        }
                                      >
                                        {opt.text}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : (
                              <div className="thara-quiz-result" style={{ background: m.quiz.result.color }}>
                                <span className="thara-quiz-result-mood" style={{ color: m.quiz.result.accent }}>
                                  {m.quiz.result.mood}
                                </span>
                                <h4 className="thara-quiz-result-name">{m.quiz.result.name}</h4>
                                <p className="thara-quiz-result-desc">{m.quiz.result.description}</p>
                                <p className="thara-quiz-result-best">
                                  <span>เหมาะสำหรับ: </span>
                                  <span style={{ color: m.quiz.result.accent }}>{m.quiz.result.best}</span>
                                </p>
                                <div className="thara-quiz-result-actions">
                                  <button className="thara-quiz-retake-btn" onClick={startQuiz}>
                                    ทำแบบทดสอบใหม่
                                  </button>
                                  <a href="/products" className="thara-quiz-cta-btn">
                                    ดูสินค้าทั้งหมด
                                  </a>
                                </div>
                              </div>
                            )}
                          </Message.CustomContent>
                        </Message>
                      ) : (
                      <Message
                        model={{
                          type: "custom",
                          sentTime: "just now",
                          sender: m.sender === "user" ? "You" : "Thara Bliss",
                          direction: m.sender === "user" ? "outgoing" : "incoming",
                          position: "single",
                        }}
                      >
                        <Message.CustomContent>
                          <div className="thara-markdown">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                a: ({ node, ...props }) => (
                                <a {...props} target="_blank" rel="noopener noreferrer" />
                                ),
                              }}
                            >
                            {m.text}
                            </ReactMarkdown>
                          </div>

                          {m.products && m.products.length > 0 && (
                            <div className="thara-product-row">
                              {m.products.map((p) => (
                                <div key={p.id} className="thara-product-card">
                                  {p.image ? (
                                    <img className="thara-product-card-img" src={p.image} alt={p.name} />
                                  ) : (
                                    <div className="thara-product-card-img-placeholder" />
                                  )}
                                  <div className="thara-product-card-body">
                                    <p className="thara-product-card-name">{p.name}</p>
                                    {p.caption && (
                                      <p className="thara-product-card-price">{p.caption}</p>
                                    )}
                                    {p.url ? (
                                      <a href={p.url} className="thara-product-card-link">
                                        {p.ctaLabel || "View Product →"}
                                      </a>
                                    ) : (
                                      <span className="thara-product-card-badge">
                                        {p.ctaLabel || "Coming Soon"}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </Message.CustomContent>
                      </Message>
                      )}
                        </MessageGroup.Messages>
                      </MessageGroup>
                    ))}

                    {isTyping && (
                      <MessageGroup direction="incoming" sender="Thara Bliss" avatarPosition="cl">
                        <MessageGroup.Messages>
                          <Message
                            model={{
                              message: "กำลังพิมพ์...",
                              sentTime: "just now",
                              sender: "Thara Bliss",
                              direction: "incoming",
                              position: "single",
                            }}
                          />
                        </MessageGroup.Messages>
                      </MessageGroup>
                    )}

                  </MessageList>

                  <MessageInput
                    placeholder="พิมพ์คำถามของคุณที่นี่..."
                    onSend={handleSend}
                    attachButton={false}
                  />
                </ChatContainer>
              </MainContainer>

              {/* Suggestion icon + popup — overlay sibling, not nested inside ChatContainer */}
              <div className="thara-suggestion-overlay" ref={suggestionRef}>
                {showSuggestionPopup && (
                  <div className="thara-suggestion-popup">
                    {QUICK_REPLIES.map((qr) => (
                      <button
                        key={qr.label}
                        className="thara-suggestion-popup-item"
                        onClick={() => handleQuickReply(qr.triggerText)}
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="thara-suggestion-icon-btn"
                    onClick={startQuiz}
                    title="หากลิ่นที่ใช่สำหรับคุณ / Find your scent"
                    aria-label="Start scent quiz"
                    type="button"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 11 13.5 11 13.5" />
                    </svg>
                  </button>

                  <button
                    className="thara-suggestion-icon-btn"
                    onClick={() => setShowSuggestionPopup((prev) => !prev)}
                    aria-label="Show suggested questions"
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        <button
          className={`thara-bubble ${!open ? "thara-bubble-pulse" : ""}`}
          onClick={handleBubbleClick}
          aria-label="Open chat"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}

          {!open && unreadCount > 0 && (
            <span className="thara-badge">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

      </div>
    </>
  );
}