"use client";
import Navbar from "@/components/Navbar";

const articles = [
  {
    title: "Why Scent Matters More Than You Think",
    subtitle: "ทำไมกลิ่นหอมจึงส่งผลต่อความรู้สึกของเรา",
    text: "กลิ่นเป็นประสาทสัมผัสเพียงอย่างเดียวที่เชื่อมโยงกับส่วนของสมองที่เกี่ยวข้องกับอารมณ์และความทรงจำโดยตรง นั่นคือเหตุผลที่บางกลิ่นสามารถทำให้เรารู้สึกผ่อนคลาย อบอุ่น หรือคิดถึงช่วงเวลาบางช่วงได้ทันที",
    tag: "Science of Scent",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200&q=80&fit=crop",
    featured: true,
  },
  {
    title: "The Art of Slowing Down",
    subtitle: "ศิลปะแห่งการใช้ชีวิตให้ช้าลง",
    text: "บางครั้งความสุขอาจเริ่มต้นจากเรื่องง่าย ๆ การจิบชาอุ่น ๆ การอ่านหนังสือเล่มโปรด หรือการสูดลมหายใจลึก ๆ พร้อมกลิ่นหอมที่คุณชื่นชอบ การใช้ชีวิตอย่างช้าลงไม่ได้หมายถึงการทำอะไรน้อยลง แต่คือการรับรู้ช่วงเวลาตรงหน้าได้มากขึ้น",
    tag: "Mindfulness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80&fit=crop",
  },
  {
    title: "How to Create a Relaxing Atmosphere at Home",
    subtitle: "เปลี่ยนบ้านให้เป็นพื้นที่แห่งความผ่อนคลาย",
    text: "เริ่มต้นจากแสงธรรมชาติที่นุ่มนวล เสียงเพลงเบา ๆ มุมพักผ่อนที่เป็นระเบียบ และกลิ่นหอมที่ช่วยสร้างบรรยากาศให้บ้านรู้สึกอบอุ่นและน่าอยู่มากยิ่งขึ้น",
    tag: "Home & Space",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&q=80&fit=crop",
  },
  {
    title: "Morning Rituals for a Better Day",
    subtitle: "เริ่มต้นวันใหม่ด้วยความสงบ",
    text: "ก่อนหยิบโทรศัพท์ขึ้นมา ลองให้เวลากับตัวเองสัก 5 นาที หายใจลึก ๆ ยืดร่างกายเบา ๆ และเลือกกลิ่นหอมที่ช่วยปลุกความสดชื่นให้กับเช้าวันใหม่",
    tag: "Rituals",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80&fit=crop",
  },
  {
    title: "Behind The Brand",
    subtitle: "จุดเริ่มต้นของ Thara Bliss",
    text: "เมื่อกลิ่นหอมกลายเป็นส่วนหนึ่งของชีวิตประจำวัน Thara Bliss เกิดจากความเชื่อว่าการดูแลตัวเองไม่จำเป็นต้องซับซ้อน เราสร้างสรรค์กลิ่นหอมที่อ่อนโยนเพื่ออยู่กับคุณในช่วงเวลาธรรมดาแต่มีความหมาย—ทุกวัน",
    tag: "Our Story",
    image: "/images/banner/test.jpg",
  },
];

const TAG_STYLE = {
  display: "inline-block",
  background: "#EAF3EC",
  color: "#0F6E56",
  fontSize: "10px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  padding: "4px 10px",
  borderRadius: "20px",
  marginBottom: "1rem",
};

export default function JournalPage() {
  const [featured, ...rest] = articles;
  const wide = rest[0];
  const grid = rest.slice(1);

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

        {/* ── HERO ── full-width bg image + gradient overlay */}
        <section
          className="journal-hero"
          style={{
            position: "relative",
            minHeight: "72vh",
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          }}
        >
          {/* Background image */}
          <img
            src="/images/services/stories.jpg"
            alt="Thara Bliss Journal — fragrance atelier"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          {/* Gradient overlay: dark bottom for legibility, near-transparent top */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(10,22,14,0.85) 0%, rgba(10,22,14,0.35) 52%, rgba(10,22,14,0.08) 100%)",
            }}
          />

          {/* Text content pinned to bottom */}
          <div
            className="journal-hero-content"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              padding: "5rem 6vw 4.5rem",
              display: "flex",
              alignItems: "flex-end",
              gap: "3rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <p
                style={{
                  color: "#9FCBAD",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontSize: "11px",
                  marginBottom: "1.2rem",
                }}
              >
                Thara Bliss Journal
              </p>
              <h1
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 5rem)",
                  fontWeight: 300,
                  lineHeight: 1.05,
                  margin: 0,
                  color: "#FBF5DD",
                }}
              >
                Stories,&nbsp;
                <em style={{ fontStyle: "italic", color: "#FBF5DD" }}>Scents</em>
                <br />& Moments.
              </h1>
            </div>

            <p
              className="journal-hero-subtitle"
              style={{
                flex: "0 0 340px",
                color: "rgba(251,245,221,0.72)",
                lineHeight: 1.85,
                fontSize: "1.0rem",
                paddingBottom: "0.25rem",
              }}
            >
              คอลเลกชันกลิ่นของ Thara Bliss ถูกพัฒนาขึ้นอย่างตั้งใจใน 3
              แนวกลิ่นหลัก ซึ่งสะท้อนอารมณ์และการใช้งานที่แตกต่างกัน
              เพื่อให้สามารถเลือกใช้ได้อย่างเหมาะสมกับแต่ละช่วงเวลาและพื้นที่
            </p>
          </div>
        </section>

        {/* thin sage divider */}
        <div style={{ height: 3, background: "#0F6E56" }} />

        <div className="journal-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "4rem 6vw 6rem" }}>

          {/* ── FEATURED ARTICLE ── */}
          <article
            className="featured-article"
            style={{
              position: "relative",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: "2.5rem",
              minHeight: 500,
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <img
              src={featured.image}
              alt={featured.title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(10,22,14,0.88) 0%, rgba(10,22,14,0.3) 55%, transparent 100%)",
              }}
            />
            <div
              className="featured-article-content"
              style={{
                position: "relative",
                zIndex: 1,
                padding: "3rem",
                maxWidth: 680,
              }}
            >
              <span style={{ ...TAG_STYLE, background: "rgba(251,245,221,0.18)", color: "#FBF5DD" }}>
                {featured.tag}
              </span>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 300,
                  color: "#FBF5DD",
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  color: "rgba(251,245,221,0.75)",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                {featured.subtitle}
              </p>
              <p style={{ color: "rgba(251,245,221,0.85)", lineHeight: 1.85, maxWidth: 520 }}>
                {featured.text}
              </p>
            </div>
          </article>

          {/* ── WIDE ARTICLE ── */}
          <article
            className="wide-article"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              borderRadius: 20,
              overflow: "hidden",
              marginBottom: "2.5rem",
              background: "#FFFFFF",
              border: "1px solid #EFEAE1",
              minHeight: 340,
            }}
          >
            <div className="wide-article-image" style={{ overflow: "hidden" }}>
              <img
                src={wide.image}
                alt={wide.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            <div
              className="wide-article-text"
              style={{
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span style={TAG_STYLE}>{wide.tag}</span>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  fontWeight: 300,
                  lineHeight: 1.25,
                  marginBottom: "0.75rem",
                }}
              >
                {wide.title}
              </h2>
              <p style={{ color: "#0F6E56", fontSize: "0.85rem", marginBottom: "1rem", fontStyle: "italic" }}>
                {wide.subtitle}
              </p>
              <p style={{ lineHeight: 1.9, color: "#555", fontSize: "0.95rem" }}>{wide.text}</p>
            </div>
          </article>

          {/* ── GRID OF 3 ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {grid.map((article) => (
              <article
                key={article.title}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #EFEAE1",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ height: 220, overflow: "hidden", flexShrink: 0 }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "1.75rem", flex: 1 }}>
                  <span style={TAG_STYLE}>{article.tag}</span>
                  <h2
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      lineHeight: 1.3,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {article.title}
                  </h2>
                  <p style={{ color: "#0F6E56", fontSize: "0.82rem", marginBottom: "0.75rem", fontStyle: "italic" }}>
                    {article.subtitle}
                  </p>
                  <p style={{ lineHeight: 1.85, color: "#666", fontSize: "0.9rem" }}>{article.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ── FOOTER BANNER ── */}
        <section
          className="journal-footer-banner"
          style={{
            background: "#0F6E56",
            color: "#FBF5DD",
            textAlign: "center",
            padding: "5rem 2rem",
          }}
        >
          <p
            style={{
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontSize: "11px",
              opacity: 0.65,
              marginBottom: "1rem",
            }}
          >
            Thara Bliss
          </p>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300, margin: 0 }}>
            Calm. Balance. Bliss.
          </h2>
          <p style={{ marginTop: "1rem", opacity: 0.8 }}>
            Aroma blam fragrance — a daily ritual of well-being.
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
                Connect
              </p>
              {[
                { name: "Instagram", href: "https://shorturl.at/AfAPc" },
                { name: "Facebook",  href: "https://shorturl.at/BJPYF" },
                { name: "TikTok",    href: "https://www.tiktok.com/@tharabliss" },
                { name: "Shopee",    href: "https://shorturl.at/2Eg4w" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    color: "rgba(251,245,221,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>© 2026 Thara Bliss. All rights reserved.</p>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>Calm. Balance. Bliss.</p>
          </div>
        </footer>

      </main>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          /* Hero: shorter, content doesn't sit side-by-side */
          .journal-hero {
            min-height: 60vh !important;
          }
          .journal-hero-content {
            padding: 3rem 6vw 3rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
          .journal-hero-subtitle {
            flex: 1 1 auto !important;
            max-width: 100% !important;
          }

          /* Container padding */
          .journal-container {
            padding: 2.5rem 6vw 4rem !important;
          }

          /* Featured article: shorter, less padding */
          .featured-article {
            min-height: 380px !important;
          }
          .featured-article-content {
            padding: 1.75rem !important;
            max-width: 100% !important;
          }

          /* Wide article: stack image above text */
          .wide-article {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .wide-article-image {
            height: 240px;
            order: -1;
          }
          .wide-article-text {
            padding: 1.75rem !important;
          }

          /* Footer banner */
          .journal-footer-banner {
            padding: 3.5rem 6vw !important;
          }

          /* Footer columns stack */
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .journal-hero {
            min-height: 52vh !important;
          }
          .featured-article {
            min-height: 320px !important;
          }
          .wide-article-image {
            height: 200px;
          }
        }
      `}</style>
    </>
  );
}