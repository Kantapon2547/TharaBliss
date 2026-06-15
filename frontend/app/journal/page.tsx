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
    text: "Thara Bliss เกิดขึ้นจากความหลงใหลในศาสตร์แห่งกลิ่นหอมและความเชื่อว่าการดูแลตัวเองไม่จำเป็นต้องซับซ้อน เราอยากสร้างผลิตภัณฑ์ที่สามารถอยู่ร่วมกับชีวิตประจำวันได้อย่างเป็นธรรมชาติ",
    tag: "Our Story",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&q=80&fit=crop",
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

      <main className="journal">

        {/* HERO */}
        <section className="hero">
          <img src="images/services/stories.jpg" alt="Journal" />

          <div className="hero-overlay" />

          <div className="hero-content">
            <div>
              <p className="label">Thara Bliss Journal</p>

              <h1>
                Stories,&nbsp;
                <em>Scents</em>
                <br />& Moments.
              </h1>
            </div>

            <p className="hero-text">
              คอลเลกชันกลิ่นของ Thara Bliss ถูกพัฒนาขึ้นอย่างตั้งใจ
              เพื่อสะท้อนอารมณ์และช่วงเวลาในชีวิต
            </p>
          </div>
        </section>

        <div className="divider" />

        {/* CONTENT */}
        <div className="container">

          {/* FEATURED */}
          <article className="featured">
            <img src={featured.image} alt={featured.title} />
            <div className="overlay" />

            <div className="featured-content">
              <span className="tag">{featured.tag}</span>
              <h2>{featured.title}</h2>
              <p className="sub">{featured.subtitle}</p>
              <p>{featured.text}</p>
            </div>
          </article>

          {/* WIDE */}
          <article className="wide">
            <img src={wide.image} alt={wide.title} />

            <div className="wide-content">
              <span className="tag">{wide.tag}</span>
              <h2>{wide.title}</h2>
              <p className="sub">{wide.subtitle}</p>
              <p>{wide.text}</p>
            </div>
          </article>

          {/* GRID */}
          <div className="grid">
            {grid.map((a) => (
              <article key={a.title} className="card">
                <img
                  src={a.image}
                  alt={a.title}
                  className="card-img"
                />

                <div className="card-content">
                  <span className="tag">{a.tag}</span>
                  <h3>{a.title}</h3>
                  <p className="sub">{a.subtitle}</p>
                  <p>{a.text}</p>
                </div>
              </article>
            ))}
          </div>

        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div>
            <h3>Thara Bliss</h3>
            <p>Luxury Aromatic Wellness Brand</p>
          </div>

          <div className="footer-grid">
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
        .journal {
          font-family: Helvetica, Arial;
          background: #FAFAF7;
          color: #2F3A33;
          overflow-x: hidden;
        }

        /* HERO */
        .hero {
          position: relative;
          min-height: 72vh;
          display: flex;
          align-items: flex-end;
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
          background: linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2));
        }

        .hero-content {
          position: relative;
          z-index: 1;
          padding: 5rem 6vw;
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          color: #FBF5DD;
        }

        .hero-content h1 {
          font-size: 4rem;
          font-weight: 300;
          line-height: 1.05;
        }

        .hero-text {
          max-width: 360px;
          color: rgba(251,245,221,0.7);
          line-height: 1.8;
        }

        .label {
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9FCBAD;
        }

        .divider {
          height: 3px;
          background: #0F6E56;
        }

        /* CONTAINER */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 4rem 6vw 6rem;
        }

        /* FEATURED */
        .featured {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          min-height: 500px;
          margin-bottom: 2.5rem;
        }

        .featured img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85), transparent);
        }

        .featured-content {
          position: relative;
          z-index: 1;
          padding: 3rem;
          max-width: 700px;
          color: #FBF5DD;
        }

        .tag {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 20px;
          background: rgba(255,255,255,0.15);
        }

        /* WIDE */
        .wide {
          display: grid;
          grid-template-columns: 1fr 1fr;
          background: #fff;
          border: 1px solid #EFEAE1;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }

        .wide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wide-content {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sub {
          color: #0F6E56;
          font-style: italic;
        }

        /* GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #EFEAE1;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .card-content {
          padding: 1.75rem;
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
          gap: 2rem;
        }

        a {
          color: rgba(255,255,255,0.7);
          display: block;
          margin-top: 0.5rem;
          text-decoration: none;
        }

        /* ================= MOBILE ================= */
        @media (max-width: 768px) {

          .hero-content {
            flex-direction: column;
          }

          .hero-content h1 {
            font-size: 2.2rem;
          }

          .wide {
            grid-template-columns: 1fr;
          }

          .featured-content {
            padding: 2rem;
          }

          .container {
            padding: 3rem 5vw;
          }

          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}