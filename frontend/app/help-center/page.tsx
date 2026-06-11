"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

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
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    title: "Delivery & Care",
    description: "การจัดส่งและการดูแลเราดูแลทุกขั้นตอน จนถึงมือคุณ",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: "Our Creations",
    description: "กลิ่นและคอลเลกชั่นแรงบันดาลใจ ส่วนผสม และวิธีใช้",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    title: "For Spaces & Gifting",
    description: "สำหรับพื้นที่และของขวัญเติมความสงบให้บ้าน ที่ทำงาน หรือคนพิเศษ 🌿🎁",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
      </svg>
    ),
  },
];

const SCENT_GUIDE = [
  {
    name: "Thara Mist 🌿",
    mood: "Calm",
    color: "#EAF3EC",
    accent: "#0F6E56",
    description: "กลิ่นอ่อนโยนที่โอบล้อมความรู้สึกช่วยให้จิตใจสงบ ผ่อนคลายและปล่อยวางจากความวุ่นวายระหว่างวัน",
    best: "ทำงานพักผ่อน · เวลาที่อยากอยู่กับตัวเอง",
  },
  {
    name: "Poised Pear & Freesia ✨",
    mood: "Elegant",
    color: "#FBF5DD",
    accent: "#8B6F2E",
    description: "ความหอมละมุนของลูกแพร์และดอกไม้ขาวให้ความรู้สึกสุภาพ นุ่มลึก และมีเสน่ห์อย่างเป็นธรรมชาติ",
    best: "ทำงาน · พบปะผู้คน · โอกาสพิเศษ",
  },
  {
    name: "Aqua No.1 💧",
    mood: "Fresh",
    color: "#E6F1FB",
    accent: "#185FA5",
    description: "กลิ่นสะอาด สดชื่น โปร่งเบาปลุกความรู้สึกกระปรี้กระเปร่า ให้วันธรรมดาดูสดใสขึ้นทันที",
    best: "เช้า · ออกกำลังกาย · วันสบายๆ",
  },
];

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

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: "#2F3A33",
          overflowX: "hidden",
        }}
      >
        {/* ── HERO ── */}
        <section
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
              ค้นหาคำตอบเกี่ยวกับการสั่งซื้อ การจัดส่งสินค้า ผลิตภัณฑ์ บริการ OEM และการติดต่อทีมงานของเรา
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
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
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

          {/* decorative right side */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {["คำสั่งซื้อ & การชำระเงิน →", "การจัดส่ง & ติดตามพัสดุ →", "ข้อมูลผลิตภัณฑ์ →", "บริการ OEM →"].map((label) => (
              <div
                key={label}
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
            ))}
          </div>
        </section>

        {/* thin sage rule */}
        <div style={{ height: 3, background: "#0F6E56" }} />

        {/* ── QUICK LINKS ── */}
        <section
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
        <section style={{ background: "#F5F2EB", padding: "6rem 6vw" }}>
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
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "6rem 6vw" }}>
          <p
            style={{
              color: "#0F6E56",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "11px",
              marginBottom: "0.75rem",
            }}
          >
            Fragrance Guide
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "2.5rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 300, margin: 0 }}>
              คู่มือเลือกกลิ่น
            </h2>
            <p style={{ color: "#888", fontSize: "0.9rem" }}>
              เลือกกลิ่นที่ใช่ให้ทุกช่วงเวลาของคุณพิเศษขึ้น
            </p>
          </div>

          <div
            style={{
              height: 1,
              background: "#EFEAE1",
              marginBottom: "2.5rem",
            }}
          />

          <div
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
              ทีมงานของเราพร้อมให้คำแนะนำเกี่ยวกับผลิตภัณฑ์ การสั่งซื้อ บริการ OEM และความร่วมมือทางธุรกิจ
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 340 }}>
            <a
              href="mailto:hello@tharabliss.com"
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
                Luxury Aromatic Products & Wellness Collection — crafted in Thailand for daily calm.
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
                Explore
              </p>
              {["Shop", "About", "Journal", "Help"].map((link) => (
                <a key={link} href={`/${link.toLowerCase()}`} style={{ display: "block", color: "rgba(251,245,221,0.7)", textDecoration: "none", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
                Connect
              </p>
              {["Instagram", "LINE Official", "TikTok Shop", "Shopee"].map((ch) => (
                <p key={ch} style={{ color: "rgba(251,245,221,0.7)", fontSize: "0.9rem", marginBottom: "0.6rem" }}>{ch}</p>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>© 2026 Thara Bliss. All rights reserved.</p>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>Calm. Balance. Bliss.</p>
          </div>
        </footer>
      </main>
    </>
  );
}