"use client";
import Navbar from "../../components/Navbar";


const IMAGES = {
  hero: "/images/about/banner_our.jpg",
  story: "/images/about/banner_our.jpg",
  scent: "/images/about/scent.jpg",
  craft: "https://images.unsplash.com/photo-1612852098516-55d01c75769a?w=900&q=80&fit=crop",
  ahead: "https://images.unsplash.com/photo-1595514535215-9b5aed62c0e4?w=900&q=80&fit=crop",
};

const philosophyItems = [
  {
    title: "Calm",
    thai: "สร้างพื้นที่แห่งความสงบให้เกิดขึ้นได้ทุกที่ ไม่ว่าจะอยู่ที่บ้าน ที่ทำงาน หรือระหว่างการเดินทาง",
    icon: "🌿",
  },
  {
    title: "Balance",
    thai: "ช่วยคืนความสมดุลให้กับร่างกายและจิตใจ ผ่านช่วงเวลาสั้น ๆ ของการหยุดพักและการหายใจอย่างมีสติ",
    icon: "☯",
  },
  {
    title: "Bliss",
    thai: "เติมเต็มความสุขเล็ก ๆ ที่เกิดขึ้นได้ในทุกวัน เพราะเราเชื่อว่าความสุขไม่ได้มาจากสิ่งยิ่งใหญ่เสมอไป",
    icon: "✦",
  },
];

export default function AboutPage() {
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
        {/* ── HERO ── full-bleed with overlaid text */}
        <section style={{ position: "relative", height: "92vh", minHeight: 560 }}>
          <img
            src={IMAGES.hero}
            alt="Aromatic botanicals"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "right",
            }}
          />
          {/* dark-to-transparent scrim for legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(15,30,20,0.55) 0%, rgba(15,30,20,0.15) 60%, rgba(15,30,20,0.65) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "0 6vw 5rem",
            }}
          >
            <p
              style={{
                color: "rgba(251,245,221,0.75)",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1rem",
              }}
            >
              About Thara Bliss
            </p>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                fontWeight: 300,
                color: "#FBF5DD",
                lineHeight: 1.1,
                maxWidth: "760px",
                margin: 0,
              }}
            >
              Inspired By Scent.
              <br />
              <em style={{ fontStyle: "italic" }}>Crafted For Bliss.</em>
            </h1>
            <p
              style={{
                maxWidth: "480px",
                color: "rgba(251,245,221,0.82)",
                lineHeight: 1.8,
                marginTop: "1.5rem",
                fontSize: "1.05rem",
              }}
            >
              Creating small moments of calm, balance, and happiness through the power of fragrance.
            </p>
          </div>
        </section>

        {/* ── OUR STORY — text left, image right ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            minHeight: 560,
          }}
        >
          <div
            style={{
              padding: "6rem 5vw 6rem 8vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1.2rem",
              }}
            >
              Our Story
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}
            >
              A belief in the extraordinary power of ordinary moments.
            </h2>
            <p style={{ lineHeight: 2, color: "#555", fontSize: "1rem" }}>
              Thara Bliss เกิดขึ้นจากความเชื่อที่เรียบง่ายว่า "กลิ่นหอมสามารถเปลี่ยนช่วงเวลาธรรมดาให้กลายเป็นช่วงเวลาที่พิเศษได้"
              ในโลกที่เต็มไปด้วยความเร่งรีบ เราอยากสร้างสิ่งเล็ก ๆ ที่ช่วยให้ผู้คนได้หยุดพัก หายใจลึกขึ้น และกลับมาอยู่กับตัวเองอีกครั้ง
              ผ่านพลังของกลิ่นหอมที่ถูกคัดสรรอย่างพิถีพิถัน
            </p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <img
              src={IMAGES.story}
              alt="Handcrafted aroma balm"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </section>

        {/* ── POWER OF SCENT — image left, text right ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            minHeight: 560,
            background: "#FFFFFF",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <img
              src={IMAGES.scent}
              alt="Close-up of botanical fragrance ingredients"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          <div
            style={{
              padding: "6rem 8vw 6rem 5vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1.2rem",
              }}
            >
              The Power of Scent
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}
            >
              An invisible language felt through emotion.
            </h2>
            <p style={{ lineHeight: 2, color: "#555" }}>
              กลิ่นเป็นภาษาที่มองไม่เห็น แต่สัมผัสได้ด้วยความรู้สึก กลิ่นหนึ่งอาจพาเราย้อนกลับไปยังความทรงจำที่งดงาม
              อีกกลิ่นหนึ่งอาจช่วยปลอบประโลมหัวใจในวันที่เหนื่อยล้า
            </p>
            <p style={{ lineHeight: 2, color: "#555", marginTop: "1.5rem" }}>
              ที่ Thara Bliss เราเชื่อว่ากลิ่นไม่ได้เป็นเพียงความหอม แต่เป็นส่วนหนึ่งของอารมณ์ ความทรงจำ และคุณภาพชีวิตในแต่ละวัน
            </p>
          </div>
        </section>

        {/* ── PHILOSOPHY — three cards over a warm background ── */}
        <section style={{ background: "#FBF5DD", padding: "8rem 6vw" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1rem",
              }}
            >
              Our Philosophy
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                margin: 0,
              }}
            >
              Three pillars, one intention.
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {philosophyItems.map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  padding: "2.5rem 2rem",
                  border: "1px solid #EFEAE1",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    fontSize: "2rem",
                    opacity: 0.15,
                  }}
                >
                  {item.icon}
                </span>
                <div
                  style={{
                    width: 40,
                    height: 3,
                    background: "#0F6E56",
                    marginBottom: "1.5rem",
                    borderRadius: 2,
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 300,
                    marginBottom: "1rem",
                    color: "#2F3A33",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#666", lineHeight: 1.9, fontSize: "0.95rem" }}>{item.thai}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUR CRAFT — text left, image right ── */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
            minHeight: 560,
            background: "#FAFAF7",
          }}
        >
          <div
            style={{
              padding: "6rem 5vw 6rem 8vw",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1.2rem",
              }}
            >
              Our Craft
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: "2rem",
              }}
            >
              Every detail, every note, every texture — considered.
            </h2>
            <p style={{ lineHeight: 2, color: "#555" }}>
              ทุกผลิตภัณฑ์ของ Thara Bliss ได้รับการพัฒนาโดยให้ความสำคัญกับประสบการณ์การใช้งานเป็นหัวใจสำคัญ
              เราเลือกใช้ส่วนผสมและกลิ่นหอมที่ให้ความรู้สึกนุ่มนวล สง่างาม และผ่อนคลาย
              เพื่อให้ทุกครั้งที่ใช้งานเป็นช่วงเวลาแห่งการดูแลตัวเองอย่างแท้จริง
            </p>
          </div>
          <div style={{ overflow: "hidden" }}>
            <img
              src={IMAGES.craft}
              alt="Crafting aroma balm"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </section>

        {/* ── LOOKING AHEAD — full-width image banner with text overlay ── */}
        <section style={{ position: "relative", minHeight: 520 }}>
          <img
            src={IMAGES.ahead}
            alt="Calm home space with candles"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(15,30,20,0.62)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "720px",
              margin: "0 auto",
              padding: "7rem 4vw",
              textAlign: "center",
              color: "#FBF5DD",
            }}
          >
            <p
              style={{
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "11px",
                opacity: 0.7,
                marginBottom: "1.2rem",
              }}
            >
              Looking Ahead
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.25,
                marginBottom: "2rem",
              }}
            >
              From your pocket to every corner of your home.
            </h2>
            <p style={{ lineHeight: 2, opacity: 0.85, fontSize: "1rem" }}>
              Thara Bliss เริ่มต้นจาก Aroma Balm ที่ออกแบบมาเพื่อการพกพาและใช้งานได้ทุกวัน ในอนาคตเราจะขยายประสบการณ์แห่งความผ่อนคลายนี้ไปสู่ผลิตภัณฑ์สำหรับบ้านและพื้นที่อยู่อาศัย
              เพื่อให้ทุกพื้นที่สามารถกลายเป็นพื้นที่แห่งความสุขได้เช่นกัน
            </p>
          </div>
        </section>

        {/* ── FOOTER BANNER ── */}
        <section
          style={{
            background: "#0F6E56",
            color: "#FFFFFF",
            textAlign: "center",
            padding: "6rem 2rem",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.02em",
            }}
          >
            Calm. Balance. Bliss.
          </h2>
          <p style={{ marginTop: "1rem", opacity: 0.85, fontSize: "1.05rem" }}>
            More than fragrance — a daily ritual of well-being.
          </p>
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