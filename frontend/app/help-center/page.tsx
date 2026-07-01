"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaInstagram, FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";
import SocialIcons from "../../components/SocialLinks";
import DecoratedBackground from "@/components/DecoratedBackground";
import { SCENT_GUIDE, QUIZ_QUESTIONS, scoredToScent, ScentResult } from "@/lib/quizData";

const FAQS = [
  {
    question: "Thara Bliss จัดส่งสินค้าอย่างไร?",
    answer:
      "เราดูแลการจัดส่งสินค้าอย่างพิถีพิถัน คำสั่งซื้อจะได้รับการเตรียมภายใน 1 – 3 วันทำการและจัดส่งถึงคุณภายในประมาณ 3 – 7 วันทำการระยะเวลาขึ้นอยู่กับพื้นที่ปลายทาง",
  },
  {
    question: "สามารถจัดเตรียมสินค้าในรูปแบบของขวัญหรือของชำร่วยได้หรือไม่?",
    answer:
      "Thara Bliss ยินดีดูแลการจัดเตรียมสินค้าสำหรับ ของขวัญ ของชำร่วย และโอกาสพิเศษ สามารถติดต่อเราเพื่อพูดคุยรายละเอียดเพิ่มเติมได้",
  },
  {
    question: "มีบริการสำหรับโรงแรมหรือองค์กรหรือไม่?",
    answer:
      "เรามีบริการ For Spaces & Gifting สำหรับโรงแรม ที่พัก องค์กร หรือกิจกรรมพิเศษโดยสามารถออกแบบรูปแบบสินค้าให้เหมาะกับแต่ละการใช้งาน",
  },
  {
    question: "กลิ่นของ Thara Bliss เหมาะกับการใช้งานลักษณะใด?",
    answer:
      "กลิ่นของ Thara Bliss ถูกออกแบบให้ใช้งานได้หลากหลายทั้งการใช้ส่วนตัว การสร้างบรรยากาศในบ้านและการใช้ในพื้นที่บริการหรือมอบเป็นของขวัญ",
  },
  {
    question: "ผลิตภัณฑ์เหมาะสำหรับผิวแพ้ง่ายหรือไม่?",
    answer:
      "เราให้ความสำคัญกับความอ่อนโยนและความสมดุลของส่วนผสมอย่างไรก็ตาม หากมีผิวบอบบางเป็นพิเศษแนะนำให้ทดสอบในปริมาณเล็กน้อยก่อนการใช้งาน",
  },
  {
    question: "หากต้องการคำแนะนำเพิ่มเติม ควรติดต่ออย่างไร?",
    answer:
      "คุณสามารถติดต่อทีม Thara Bliss ได้ผ่านหน้า Contact Us เรายินดีดูแลและให้คำแนะนำอย่างใกล้ชิด",
  },
];

const QUICK_LINKS = [
  {
    title: "Ordering & Payment",
    description: "สั่งซื้อและการชำระเงินขั้นตอนง่าย ๆ เพื่อความสบายใจ",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: "Delivery & Care",
    description: "การจัดส่งและการดูแลเราดูแลทุกขั้นตอน จนถึงมือคุณ",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Our Creations",
    description: "กลิ่นและคอลเลกชั่นแรงบันดาลใจ ส่วนผสม และวิธีใช้",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: "For Spaces & Gifting",
    description: "สำหรับพื้นที่และของขวัญเติมความสงบให้บ้าน ที่ทำงาน หรือคนพิเศษ 🌿🎁",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
  },
];

// SCENT_GUIDE is now imported from @/lib/quizData

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        border: `1px solid ${open ? "#0F6E56" : "#EFEAE1"}`,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "1.4rem 1.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          textAlign: "left",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <span style={{ fontWeight: 400, color: "#2F3A33", fontSize: "1rem", lineHeight: 1.5 }}>
          {question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: open ? "#0F6E56" : "#F5F2EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
          >
            <line x1="6" y1="1" x2="6" y2="11" stroke={open ? "#FBF5DD" : "#666"} strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke={open ? "#FBF5DD" : "#666"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 1.75rem 1.4rem",
            color: "#666",
            lineHeight: 1.85,
            fontSize: "0.95rem",
            borderTop: "1px solid #EFEAE1",
          }}
        >
          <p style={{ margin: "1rem 0 0" }}>{answer}</p>
        </div>
      )}
    </div>
  );
}

// QUIZ_QUESTIONS is now imported from @/lib/quizData

function ScentQuiz() {
  const [step, setStep] = useState(0); // 0: Start, 1-3: Questions, 4: Result
  const [answers, setAnswers] = useState<Array<"calm" | "elegant" | "fresh">>([]);
  const [result, setResult] = useState<ScentResult | null>(null);

  const handleStart = () => {
    setStep(1);
    setAnswers([]);
    setResult(null);
  };

  const handleSelectOption = (value: "calm" | "elegant" | "fresh") => {
    const nextAnswers = [...answers, value];
    setAnswers(nextAnswers);

    if (step < QUIZ_QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setResult(scoredToScent(nextAnswers));
      setStep(4);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div
      style={{
        maxWidth: 680,
        margin: "0 auto 3.5rem",
        background: "#FBF5DD",
        borderRadius: 24,
        border: "1px solid #EFEAE1",
        boxShadow: "0 10px 40px rgba(15, 110, 86, 0.05)",
        padding: "3rem 2.5rem",
        textAlign: "center",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      {step === 0 && (
        <div>
          <span
            style={{
              color: "#0F6E56",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "inline-block",
              marginBottom: "1rem",
            }}
          >
            Scent Finder Quiz
          </span>
          <h3
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 2.1rem)",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 300,
              color: "#2F3A33",
              margin: "0 0 1rem",
            }}
          >
            ค้นหากลิ่นอโรม่าที่บอกความเป็นคุณ 🌿
          </h3>
          <p style={{ color: "#555", lineHeight: 1.8, fontSize: "0.95rem", maxWidth: 480, margin: "0 auto 2.5rem" }}>
            ตอบคำถามสั้นๆ 3 ข้อ เพื่อให้ Thara Bliss คัดสรรแนวกลิ่นอโรม่าที่ช่วยเติมเต็มความรู้สึกและการพักผ่อนที่เหมาะกับคุณที่สุดในเวลานี้
          </p>
          <button
            onClick={handleStart}
            style={{
              background: "#0F6E56",
              color: "#FBF5DD",
              border: "none",
              borderRadius: 30,
              padding: "0.9rem 2.5rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(15, 110, 86, 0.2)",
              transition: "transform 0.2s, background-color 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#0C5A46";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#0F6E56";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            เริ่มทำแบบทดสอบ
          </button>
        </div>
      )}

      {step > 0 && step <= QUIZ_QUESTIONS.length && (
        <div>
          {/* Progress Indicator */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "12px", color: "#888", fontWeight: 500 }}>
              คำถามที่ {step} จาก {QUIZ_QUESTIONS.length}
            </span>
            <div style={{ width: "100px", height: "4px", background: "rgba(15, 110, 86, 0.1)", borderRadius: 2, marginLeft: "10px", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  height: "100%",
                  width: `${(step / QUIZ_QUESTIONS.length) * 100}%`,
                  background: "#0F6E56",
                  borderRadius: 2,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>

          <h3
            style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
              fontFamily: "var(--font-cormorant), serif",
              fontWeight: 400,
              color: "#2F3A33",
              lineHeight: 1.4,
              marginBottom: "2rem",
              textAlign: "left",
            }}
          >
            {QUIZ_QUESTIONS[step - 1].question}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {QUIZ_QUESTIONS[step - 1].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt.value)}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #EFEAE1",
                  borderRadius: 16,
                  padding: "1.2rem 1.5rem",
                  fontSize: "0.92rem",
                  textAlign: "left",
                  color: "#2F3A33",
                  cursor: "pointer",
                  transition: "transform 0.15s, border-color 0.15s, box-shadow 0.15s",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  lineHeight: 1.5,
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "#0F6E56";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(15, 110, 86, 0.08)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "#EFEAE1";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.02)";
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && result && (
        <div style={{ animation: "fadeIn 0.4s ease" }}>
          <span
            style={{
              color: "#0F6E56",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
              display: "inline-block",
              marginBottom: "0.75rem",
            }}
          >
            Your Perfect Match
          </span>
          <p style={{ color: "#888", fontSize: "0.9rem", margin: "0 0 1.25rem" }}>
            จากการวิเคราะห์คำตอบ กลิ่นหอมที่เหมาะกับบรรยากาศและความรู้สึกของคุณคือ...
          </p>

          {/* Scent Result Card */}
          <div
            style={{
              background: result.color,
              border: `1px solid #EFEAE1`,
              borderRadius: 20,
              padding: "2rem",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(255, 255, 255, 0.7)",
                color: result.accent,
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "3px 12px",
                borderRadius: 20,
                marginBottom: "0.75rem",
                fontWeight: 600,
              }}
            >
              {result.mood}
            </span>
            <h4
              style={{
                fontSize: "1.7rem",
                fontFamily: "var(--font-cormorant), serif",
                color: "#2F3A33",
                margin: "0 0 1rem",
                fontWeight: 400,
              }}
            >
              {result.name}
            </h4>
            <p style={{ color: "#2F3A33", fontSize: "0.95rem", lineHeight: 1.8, margin: "0 auto 1.5rem", maxWidth: 480 }}>
              {result.description}
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255, 255, 255, 0.4)", padding: "6px 14px", borderRadius: 12 }}>
              <span style={{ fontSize: "11px", color: "#666", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                เหมาะสำหรับ:
              </span>
              <span style={{ fontSize: "0.85rem", color: result.accent, fontWeight: 500 }}>
                {result.best}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
            <button
              onClick={handleReset}
              style={{
                background: "transparent",
                color: "#0F6E56",
                border: "1px solid #0F6E56",
                borderRadius: 30,
                padding: "0.8rem 1.8rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(15, 110, 86, 0.05)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              ทำแบบทดสอบใหม่
            </button>
            <a
              href="/products"
              style={{
                background: "#0F6E56",
                color: "#FBF5DD",
                borderRadius: 30,
                padding: "0.8rem 2.2rem",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                display: "inline-block",
                boxShadow: "0 4px 12px rgba(15, 110, 86, 0.15)",
                transition: "background-color 0.2s, transform 0.2s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "#0C5A46";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "#0F6E56";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              ดูสินค้าทั้งหมด
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HelpCenterPage() {
  return (
    <>
      <DecoratedBackground />
      <Navbar />

      <style>{`
        @media (max-width: 768px) {
          .help-hero {
            grid-template-columns: 1fr !important;
            padding: 4rem 6vw !important;
            gap: 2.5rem !important;
          }
          .help-hero-links {
            display: none !important;
          }
          .contact-banner {
            grid-template-columns: 1fr !important;
            padding: 4rem 6vw !important;
            gap: 2rem !important;
          }
          .contact-buttons {
            max-width: 100% !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .quick-links-section {
            padding: 3.5rem 6vw !important;
          }
          .faq-section {
            padding: 4rem 6vw !important;
          }
          .scent-section {
            padding: 4rem 6vw !important;
          }
        }

        @media (max-width: 480px) {
          .quick-links-grid {
            grid-template-columns: 1fr !important;
          }
          .scent-grid {
            grid-template-columns: 1fr !important;
          }
          .accordion-button {
            padding: 1.2rem 1.25rem !important;
          }
          .accordion-answer {
            padding: 0 1.25rem 1.2rem !important;
          }
        }
      `}</style>

      <main
        style={{
          background: "transparent",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: "#2F3A33",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── HERO ── */}
        <section
          className="help-hero"
          style={{
            background: "#FBF5DD",
            padding: "6rem 6vw",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1.25rem",
              }}
            >
              Customer Care
            </p>
            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 300,
                color: "#2F3A33",
                lineHeight: 1.08,
                margin: "0 0 1.5rem",
              }}
            >
              ศูนย์
              <br />
              <em style={{ fontStyle: "italic", color: "#0F6E56" }}>ช่วยเหลือ</em>
            </h1>
            <p
              style={{
                color: "#666",
                lineHeight: 1.85,
                maxWidth: 400,
                marginBottom: "2rem",
              }}
            >
              ค้นหาคำตอบเกี่ยวกับการสั่งซื้อ การจัดส่งสินค้า ผลิตภัณฑ์ บริการและการติดต่อทีมงานของเรา
            </p>
            {/* search bar */}
            <div style={{ position: "relative", maxWidth: 420 }}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#aaa"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }}
              >
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="ค้นหาคำถามที่ต้องการ..."
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 44px",
                  borderRadius: 40,
                  border: "1px solid #EFEAE1",
                  fontSize: "14px",
                  outline: "none",
                  background: "#FFFFFF",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* decorative right side — hidden on mobile */}
          <div
            className="help-hero-links"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {[
              { label: "คำสั่งซื้อ & การชำระเงิน →", href: "https://www.facebook.com/people/Thara-Bliss-official/61579045994213/" },
              { label: "การจัดส่ง & ติดตามพัสดุ →", href: "https://www.facebook.com/people/Thara-Bliss-official/61579045994213/" },
              { label: "ข้อมูลผลิตภัณฑ์ →", href: "https://cosmetica.fda.moph.go.th/CMT_SEARCH_FRONT_NEW/DetailNotify?regnos=1316800042881&checkpage=2" },
              { label: "บริการของเรา →", href: "https://www.thailandpostmart.com/product/1013490004355" },
            ].map(({ label, href }) => {
              const content = (
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #EFEAE1",
                    borderRadius: 12,
                    padding: "1rem 1.5rem",
                    color: "#2F3A33",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{label}</span>
                </div>
              );
              return href ? (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  {content}
                </a>
              ) : (
                <div key={label}>{content}</div>
              );
            })}
          </div>
        </section>

        {/* thin sage rule */}
        <div style={{ height: 3, background: "#0F6E56" }} />

        {/* ── QUICK LINKS ── */}
        <section
          className="quick-links-section"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "5rem 6vw",
          }}
        >
          <p
            style={{
              color: "#0F6E56",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "11px",
              marginBottom: "0.75rem",
            }}
          >
            Browse by Topic
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 300,
              marginBottom: "2.5rem",
            }}
          >
            หัวข้อยอดนิยม
          </h2>
          <div
            className="quick-links-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {QUICK_LINKS.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#FFFFFF",
                  padding: "2rem",
                  borderRadius: 20,
                  border: "1px solid #EFEAE1",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = "#0F6E56")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor = "#EFEAE1")
                }
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#EAF3EC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#0F6E56",
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3
                    style={{
                      color: "#2F3A33",
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ color: "#888", lineHeight: 1.7, fontSize: "0.9rem" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-section" style={{ background: "#F5F2EB", padding: "6rem 6vw" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "0.75rem",
                textAlign: "center",
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: 300,
                textAlign: "center",
                marginBottom: "3rem",
              }}
            >
              คำถามที่พบบ่อย
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {FAQS.map((faq) => (
                <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SCENT GUIDE ── */}
        <section className="scent-section" style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 6vw" }}>
          <p
            style={{
              color: "#0F6E56",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "11px",
              marginBottom: "0.75rem",
              textAlign: "center",
            }}
          >
            Fragrance Guide
          </p>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 300,
              margin: "0 0 0.5rem",
              textAlign: "center",
            }}
          >
            คู่มือเลือกกลิ่น
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: "0.95rem",
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            เลือกกลิ่นที่ใช่ให้ทุกช่วงเวลาของคุณพิเศษขึ้น
          </p>

          <ScentQuiz />

          <div
            style={{
              height: 1,
              background: "#EFEAE1",
              marginTop: "4rem",
              marginBottom: "3rem",
            }}
          />

          <div
            className="scent-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {SCENT_GUIDE.map((scent) => (
              <div
                key={scent.name}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #EFEAE1",
                }}
              >
                {/* coloured top band */}
                <div
                  style={{
                    background: scent.color,
                    padding: "1.5rem 1.75rem 1.25rem",
                    borderBottom: "1px solid #EFEAE1",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(255,255,255,0.6)",
                      color: scent.accent,
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "3px 10px",
                      borderRadius: 20,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {scent.mood}
                  </span>
                  <h3
                    style={{
                      fontSize: "1.15rem",
                      fontWeight: 400,
                      color: "#2F3A33",
                      margin: 0,
                    }}
                  >
                    {scent.name}
                  </h3>
                </div>
                <div style={{ padding: "1.5rem 1.75rem" }}>
                  <p style={{ color: "#555", lineHeight: 1.85, marginBottom: "1.25rem", fontSize: "0.9rem" }}>
                    {scent.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "#aaa", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      เหมาะสำหรับ
                    </span>
                    <span style={{ fontSize: "0.82rem", color: scent.accent, fontStyle: "italic" }}>
                      {scent.best}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT BANNER ── */}
        <section
          className="contact-banner"
          style={{
            background: "#0F6E56",
            color: "#FBF5DD",
            padding: "6rem 6vw",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "11px",
                opacity: 0.55,
                marginBottom: "1.25rem",
              }}
            >
              Still need help?
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                margin: "0 0 1rem",
              }}
            >
              ต้องการความ
              <br />
              <em style={{ fontStyle: "italic" }}>ช่วยเหลือเพิ่มเติม?</em>
            </h2>
            <p style={{ opacity: 0.75, lineHeight: 1.8, maxWidth: 360 }}>
              "Because every day deserves a moment of bliss." เพราะทุกวันควรมีช่วงเวลาแห่งความสุขเล็ก ๆ ซ่อนอยู่เสมอ
            </p>
          </div>
          <div
            className="contact-buttons"
            style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 340 }}
          >
            <a
              href="mailto:tharabliss2025@gmail.com"
              style={{
                display: "block",
                background: "#FBF5DD",
                color: "#0F6E56",
                textDecoration: "none",
                padding: "1rem 1.75rem",
                borderRadius: 40,
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              ส่งอีเมลหาเรา
            </a>
            <a
              href="https://line.me"
              target="_blank"
              style={{
                display: "block",
                border: "1px solid rgba(251,245,221,0.4)",
                color: "#FBF5DD",
                textDecoration: "none",
                padding: "1rem 1.75rem",
                borderRadius: 40,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
                textAlign: "center",
              }}
            >
              ติดต่อผ่าน LINE Official
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#2F3A33",
            color: "#FBF5DD",
            padding: "4rem 8vw 2.5rem",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "3rem",
              paddingBottom: "3rem",
              borderBottom: "1px solid rgba(251,245,221,0.1)",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: "0.75rem" }}>
                Thara Bliss
              </h3>
              <p style={{ color: "rgba(251,245,221,0.5)", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 280 }}>
                ไม่ใช่แค่ความหอม แต่คือการดูแลอารมณ์และจิตใจในทุกวัน — เลือกกลิ่นที่สะท้อนตัวตนและอยู่กับคุณในทุกช่วงเวลา
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
                Explore
              </p>
              {["Products", "About", "Journal", "Help-Center"].map((link) => (
                <a key={link} href={`/${link.toLowerCase()}`} style={{ display: "block", color: "rgba(251,245,221,0.7)", textDecoration: "none", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
                Follow Us
              </p>
              <SocialIcons />
            </div>
          </div>
          <div
            className="footer-bottom"
            style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}
          >
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>© 2026 Thara Bliss. All rights reserved.</p>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>Calm. Balance. Bliss.</p>
          </div>
        </footer>
      </main>
    </>
  );
}