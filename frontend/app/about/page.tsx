"use client";

import Navbar from "../../components/Navbar";

const IMAGES = {
  hero: "/images/about/banner_our.jpg",
  story: "/images/about/banner_our.jpg",
  scent: "/images/about/scent.jpg",
  craft: "/images/about/decorate.jpg",
  ahead:
    "https://images.unsplash.com/photo-1595514535215-9b5aed62c0e4?w=900&q=80&fit=crop",
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

      <main className="about-page">
        {/* HERO */}
        <section className="hero">
          <img src={IMAGES.hero} alt="Aromatic botanicals" />

          <div className="hero-overlay" />

          <div className="hero-content">
            <p>About Thara Bliss</p>

            <h1>
              Inspired By Scent.
              <br />
              <em>Crafted For Bliss.</em>
            </h1>

            <p>
              Creating small moments of calm, balance, and happiness through the
              power of fragrance.
            </p>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="split">
          <div className="text pad">
            <p className="label">Our Story</p>
            <h2>A belief in the extraordinary power of ordinary moments.</h2>
            <p>
              Thara Bliss เกิดขึ้นจากความเชื่อที่เรียบง่ายว่า "กลิ่นหอมสามารถเปลี่ยนช่วงเวลาธรรมดาให้กลายเป็นช่วงเวลาที่พิเศษได้"
              ในโลกที่เต็มไปด้วยความเร่งรีบ เราอยากสร้างสิ่งเล็ก ๆ ที่ช่วยให้ผู้คนได้หยุดพัก หายใจลึกขึ้น และกลับมาอยู่กับตัวเองอีกครั้ง
            </p>
          </div>

          <div className="image">
            <img src={IMAGES.story} alt="Story" />
          </div>
        </section>

        {/* SCENT */}
        <section className="split reverse">
          <div className="image">
            <img src={IMAGES.scent} alt="Scent" />
          </div>

          <div className="text pad">
            <p className="label">The Power of Scent</p>
            <h2>An invisible language felt through emotion.</h2>
            <p>
              กลิ่นเป็นภาษาที่มองไม่เห็น แต่สัมผัสได้ด้วยความรู้สึก กลิ่นหนึ่งอาจพาเราย้อนกลับไปยังความทรงจำที่งดงาม
            </p>
            <p>
              ที่ Thara Bliss เราเชื่อว่ากลิ่นไม่ได้เป็นเพียงความหอม แต่เป็นส่วนหนึ่งของอารมณ์ ความทรงจำ และคุณภาพชีวิต
            </p>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section className="philosophy">
          <div className="center">
            <p className="label">Our Philosophy</p>
            <h2>Three pillars, one intention.</h2>
          </div>

          <div className="grid">
            {philosophyItems.map((item) => (
              <div key={item.title} className="card">
                <span className="icon">{item.icon}</span>
                <div className="line" />
                <h3>{item.title}</h3>
                <p>{item.thai}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CRAFT */}
        <section className="split">
          <div className="text pad">
            <p className="label">Our Craft</p>
            <h2>Every detail, every note, every texture — considered.</h2>
            <p>
              ทุกผลิตภัณฑ์ของ Thara Bliss ได้รับการพัฒนาโดยให้ความสำคัญกับประสบการณ์การใช้งานเป็นหัวใจสำคัญ
            </p>
          </div>

          <div className="image">
            <img src={IMAGES.craft} alt="Craft" />
          </div>
        </section>

        {/* LOOKING AHEAD */}
        <section className="ahead">
          <img src={IMAGES.ahead} alt="Ahead" />
          <div className="overlay" />

          <div className="content">
            <p>Looking Ahead</p>
            <h2>From your pocket to every corner of your home.</h2>
            <p>
              Thara Bliss เริ่มต้นจาก Aroma Balm และจะขยายสู่บ้านและพื้นที่อยู่อาศัย
            </p>
          </div>
        </section>

        {/* FOOTER BANNER */}
        <section className="footer-banner">
          <h2>Calm. Balance. Bliss.</h2>
          <p>More than fragrance — a daily ritual of well-being.</p>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-grid">
            <div>
              <h3>Thara Bliss</h3>
              <p>
                ไม่ใช่แค่ความหอม แต่คือการดูแลอารมณ์และจิตใจในทุกวัน
              </p>
            </div>

            <div>
              <p className="label">Explore</p>
              {["Products", "About", "Journal", "Help-Center"].map((l) => (
                <a key={l} href={`/${l.toLowerCase()}`}>
                  {l}
                </a>
              ))}
            </div>

            <div>
              <p className="label">Connect</p>
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">TikTok</a>
              <a href="#">Shopee</a>
            </div>
          </div>

          <div className="bottom">
            <p>© 2026 Thara Bliss</p>
            <p>Calm. Balance. Bliss.</p>
          </div>
        </footer>
      </main>

      {/* ================= CSS ================= */}
      <style>{`
        .about-page {
          background: #FAFAF7;
          color: #2F3A33;
          font-family: Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }

        /* HERO */
        .hero {
          position: relative;
          height: 92vh;
          min-height: 520px;
        }

        .hero img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.6));
        }

        .hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 6vw 4rem;
          color: #FBF5DD;
        }

        .hero-content h1 {
          font-size: 4rem;
          font-weight: 300;
          margin: 0;
        }

        /* SPLIT */
        .split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 520px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .pad {
          padding: 6rem 6vw;
        }

        .label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0F6E56;
          margin-bottom: 1rem;
        }

        .image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* PHILOSOPHY */
        .philosophy {
          padding: 7rem 6vw;
          background: #FBF5DD;
          text-align: center;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          position: relative;
        }

        .icon {
          position: absolute;
          top: 20px;
          right: 20px;
          opacity: 0.15;
          font-size: 2rem;
        }

        .line {
          width: 40px;
          height: 3px;
          background: #0F6E56;
          margin-bottom: 1rem;
        }

        /* AHEAD */
        .ahead {
          position: relative;
          min-height: 520px;
          text-align: center;
          color: #FBF5DD;
        }

        .ahead img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
        }

        .content {
          position: relative;
          padding: 6rem 6vw;
        }

        /* FOOTER */
        .footer {
          background: #2F3A33;
          color: #FBF5DD;
          padding: 4rem 6vw;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 3rem;
        }

        .bottom {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        a {
          color: rgba(251,245,221,0.7);
          text-decoration: none;
          display: block;
          margin-bottom: 0.5rem;
        }

        /* ================= MOBILE ================= */
        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 2.2rem;
          }

          .split {
            grid-template-columns: 1fr;
          }

          .pad {
            padding: 3.5rem 6vw;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}