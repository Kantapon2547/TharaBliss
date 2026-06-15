"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";

/* ================= DATA ================= */

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

/* ================= ACCORDION ================= */

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-btn" onClick={() => setOpen(!open)}>
        <span>{question}</span>
        <span className={`icon ${open ? "open" : ""}`}>＋</span>
      </button>

      {open && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

/* ================= PAGE ================= */

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />

      <main className="help-page">

        {/* HERO */}
        <section className="hero">
          <div>
            <p className="label">Customer Care</p>

            <h1>
              ศูนย์ <br />
              <em>ช่วยเหลือ</em>
            </h1>

            <p className="desc">
              ค้นหาคำตอบเกี่ยวกับการสั่งซื้อ การจัดส่งสินค้า และบริการของเรา
            </p>

            <div className="search">
              <input placeholder="ค้นหาคำถามที่ต้องการ..." />
            </div>
          </div>

          <div className="hero-links">
            {["คำสั่งซื้อ", "การจัดส่ง", "ผลิตภัณฑ์", "OEM"].map((l) => (
              <div key={l} className="hero-box">
                {l} →
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* QUICK LINKS */}
        <section className="section">
          <h2>หัวข้อยอดนิยม</h2>

          <div className="grid">
            {QUICK_LINKS.map((item) => (
              <div key={item.title} className="card">
                <div className="icon-box">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="faq">
          <h2>คำถามที่พบบ่อย</h2>

          <div className="faq-list">
            {FAQS.map((faq) => (
              <AccordionItem key={faq.question} {...faq} />
            ))}
          </div>
        </section>

        {/* SCENT GUIDE */}
        <section className="section">
          <h2>คู่มือเลือกกลิ่น</h2>

          <div className="grid">
            {SCENT_GUIDE.map((s) => (
              <div key={s.name} className="scent-card">
                <div className="top" style={{ background: s.color }}>
                  <span>{s.mood}</span>
                  <h3>{s.name}</h3>
                </div>

                <div className="body">
                  <p>{s.description}</p>
                  <small>{s.best}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="contact">
          <div>
            <h2>
              ต้องการ <em>ความช่วยเหลือ?</em>
            </h2>
            <p>เราพร้อมช่วยเหลือคุณเสมอ</p>
          </div>

          <div className="buttons">
            <a href="mailto:hello@tharabliss.com">ส่งอีเมล</a>
            <a href="https://line.me" target="_blank">LINE Official</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <h3>Thara Bliss</h3>
              <p>Luxury Aromatic Wellness Brand</p>
            </div>

            <div>
              <p>Explore</p>
              {["Shop", "About", "Journal", "Help"].map((l) => (
                <a key={l} href={`/${l.toLowerCase()}`}>{l}</a>
              ))}
            </div>

            <div>
              <p>Connect</p>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">TikTok</a>
            </div>
          </div>
        </footer>
      </main>

      {/* ================= CSS ================= */}
      <style>{`
        .help-page {
          font-family: Helvetica, Arial;
          background: #FAFAF7;
          color: #2F3A33;
        }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 6rem 6vw;
          gap: 3rem;
          background: #FBF5DD;
        }

        .label {
          color: #0F6E56;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        h1 {
          font-size: 3.5rem;
          font-weight: 300;
        }

        .desc {
          color: #666;
          max-width: 420px;
          line-height: 1.8;
        }

        .search input {
          width: 100%;
          padding: 14px;
          border-radius: 40px;
          border: 1px solid #ddd;
        }

        .hero-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .hero-box {
          background: #fff;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid #eee;
        }

        .divider {
          height: 3px;
          background: #0F6E56;
        }

        .section {
          padding: 5rem 6vw;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .card, .scent-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 16px;
          padding: 2rem;
        }

        .faq {
          padding: 5rem 6vw;
          background: #F5F2EB;
        }

        .faq-item {
          background: #fff;
          margin-bottom: 1rem;
          border-radius: 14px;
          border: 1px solid #eee;
        }

        .faq-btn {
          width: 100%;
          padding: 1.2rem;
          display: flex;
          justify-content: space-between;
          background: none;
          border: none;
        }

        .faq-answer {
          padding: 0 1.2rem 1.2rem;
          color: #666;
        }

        .contact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 5rem 6vw;
          background: #0F6E56;
          color: #fff;
        }

        .contact a {
          display: block;
          padding: 1rem;
          background: #FBF5DD;
          color: #0F6E56;
          text-align: center;
          border-radius: 40px;
          margin-bottom: 1rem;
          text-decoration: none;
        }

        .footer {
          background: #2F3A33;
          color: #FBF5DD;
          padding: 4rem 6vw;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 2rem;
        }

        a {
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          display: block;
          margin-top: 0.5rem;
        }

        /* ================= MOBILE ================= */
        @media (max-width: 768px) {
          .hero {
            grid-template-columns: 1fr;
          }

          h1 {
            font-size: 2.2rem;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .contact {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}