"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getAnnouncements } from "@/lib/api";
import type { Announcement } from "@/lib/api";
import { matchFaq, QUICK_REPLIES } from "@/lib/faqData";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageGroup,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const POLL_INTERVAL = 30_000;
const STORAGE_KEY = "thara_last_seen_announcement_id";
const SIZE_KEY = "thara_widget_size";

const DEFAULT_SIZE = { width: 340, height: 540 };
const MIN_SIZE = { width: 280, height: 360 };
const MAX_SIZE = { width: 520, height: 760 };

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  image?: string;
}

interface Size {
  width: number;
  height: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showSuggestionPopup, setShowSuggestionPopup] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    const faq = matchFaq(trimmed);
    const botMessages: ChatMessage[] = [];

    if (faq.image) {
      const now = Date.now();
      botMessages.push({ id: `b-t-${now}`, sender: "bot", text: faq.answer });
      botMessages.push({ id: `b-i-${now + 1}`, sender: "bot", text: "", image: faq.image });
    } else {
      botMessages.push({ id: `b-${Date.now()}`, sender: "bot", text: faq.answer });
    }

    setChatMessages((prev) => [...prev, userMsg, ...botMessages]);
  };

  const handleSend = (text: string) => sendMessage(text);

  const handleQuickReply = (triggerText: string) => {
    sendMessage(triggerText);
    setShowSuggestionPopup(false);
  };

  return (
    <>
      <style>{`
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
          padding-left: 48px !important;
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
                      ) : (
                        <Message
                          model={{
                            message: m.text,
                            sentTime: "just now",
                            sender: m.sender === "user" ? "You" : "Thara Bliss",
                            direction: m.sender === "user" ? "outgoing" : "incoming",
                            position: "single",
                          }}
                        />
                          )}
                        </MessageGroup.Messages>
                      </MessageGroup>
                    ))}

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