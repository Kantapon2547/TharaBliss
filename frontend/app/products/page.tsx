import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  scent: string;
  image: string | null;
  category?: {
    id: number;
    name: string;
  };
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/products/", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const CERTIFICATIONS = [
  { label: "Natural Essence", icon: "✦" },
  { label: "Inspired By Nature", icon: "✦" },
  { label: "Crafted With Intention", icon: "✦" },
];

export default async function DashboardPage() {
  const products = await getProducts();

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
        <section style={{ position: "relative", height: "88vh", minHeight: 540 }}>
          <img
            src="/images/banner/home_banner.jpg"
            alt="Thara Bliss aroma balm collection"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* gradient: lighter on right so text pops on left */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,22,14,0.78) 0%, rgba(10,22,14,0.35) 55%, rgba(10,22,14,0.1) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 8vw",
              maxWidth: 680,
            }}
          >
            <p
              style={{
                color: "rgba(251,245,221,0.7)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1.2rem",
              }}
            >
              Product Collection
            </p>
            <h1
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5.2rem)",
                fontWeight: 300,
                color: "#FBF5DD",
                lineHeight: 1.08,
                margin: "0 0 1.5rem",
              }}
            >
              Find Your
              <br />
              <em style={{ fontStyle: "italic" }}>Signature</em>
              <br />
              Scent.
            </h1>
            <p
              style={{
                color: "rgba(251,245,221,0.8)",
                lineHeight: 1.8,
                fontSize: "1rem",
                maxWidth: 420,
                marginBottom: "2rem",
              }}
            >
              บาล์มอโรมาสัญชาติไทย ออกแบบกลิ่นให้หอมละมุน ใช้ได้ทุกวัน
              ช่วยผ่อนคลาย สดชื่น และดูแลอารมณ์อย่างอ่อนโยน
            </p>
            <a
              href="#collection"
              style={{
                display: "inline-block",
                background: "#FBF5DD",
                color: "#0F6E56",
                padding: "0.85rem 2.2rem",
                borderRadius: 40,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 500,
                width: "fit-content",
              }}
            >
              Shop Now
            </a>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <div
          style={{
            background: "#0F6E56",
            padding: "1rem 4vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(1.5rem, 4vw, 4rem)",
            flexWrap: "wrap",
          }}
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#FBF5DD",
              }}
            >
              <span style={{ color: "rgba(251,245,221,0.5)", fontSize: "0.6rem" }}>
                {cert.icon}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.9,
                }}
              >
                {cert.label}
              </span>
            </div>
          ))}
        </div>

        {/* ── COLLECTION ── */}
        <section
          id="collection"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "5rem 5vw 6rem",
          }}
        >
          {/* section header */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: "3rem",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#0F6E56",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontSize: "11px",
                  marginBottom: "0.5rem",
                }}
              >
                Featured Collection
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Aroma Balm Series
              </h2>
            </div>
            <p style={{ color: "#888", fontSize: "0.9rem" }}>
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* decorative rule */}
          <div
            style={{
              height: 1,
              background: "#EFEAE1",
              marginBottom: "3rem",
            }}
          />

          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#888",
                padding: "5rem 0",
                background: "#FFFFFF",
                borderRadius: 16,
                border: "1px solid #EFEAE1",
              }}
            >
              <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌿</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 300 }}>
                Products are on their way.
              </p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                Check back soon for our full collection.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "2rem",
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* ── BRAND STRIP — mid-page palette break ── */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "5rem 6vw",
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
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontSize: "11px",
                marginBottom: "1.2rem",
              }}
            >
              Why Thara Bliss
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              More than a balm —<br />
              <em style={{ fontStyle: "italic" }}>a daily ritual.</em>
            </h2>
            <p style={{ lineHeight: 1.9, color: "#555", maxWidth: 400 }}>
              Aromatic Balm สูตรพรีเมียมสัญชาติไทย ผลิตจากส่วนผสมคุณภาพสูง ออกแบบกลิ่นให้ช่วยผ่อนคลาย
              สดชื่น และดูแลสุขภาพจิตใจอย่างอ่อนโยนในทุกวัน
            </p>
          </div>
          <div style={{ overflow: "hidden", borderRadius: 16, height: 500 }}>
            <img
              src="images/products/aroma.jpg"
              alt="Thara Bliss product lifestyle"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section
          style={{
            background: "#0F6E56",
            color: "#FBF5DD",
            textAlign: "center",
            padding: "6rem 2rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* faint large watermark text */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(8rem, 20vw, 18rem)",
              fontWeight: 700,
              opacity: 0.04,
              whiteSpace: "nowrap",
              letterSpacing: "0.05em",
              color: "#FBF5DD",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            BLISS
          </span>
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                fontSize: "11px",
                opacity: 0.6,
                marginBottom: "1.2rem",
              }}
            >
              Discover Your Scent
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 300,
                margin: "0 0 1.5rem",
                lineHeight: 1.1,
              }}
            >
              เลือกกลิ่นที่เป็น<em style={{ fontStyle: "italic" }}>ตัวคุณ</em>
            </h2>
            <p
              style={{
                opacity: 0.8,
                lineHeight: 1.8,
                maxWidth: 480,
                margin: "0 auto 2.5rem",
                fontSize: "0.95rem",
              }}
            >
              เติมเต็มช่วงเวลาแห่งความผ่อนคลายกับผลิตภัณฑ์กลิ่นหอมที่สะท้อนตัวตนของคุณ
            </p>
            <a
              href="#collection"
              style={{
                display: "inline-block",
                border: "1px solid rgba(251,245,221,0.6)",
                color: "#FBF5DD",
                padding: "0.85rem 2.5rem",
                borderRadius: 40,
                fontSize: "0.85rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Browse Collection
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
              borderBottom: "1px solid rgba(251,245,221,0.12)",
              flexWrap: "wrap",
            }}
          >
            {/* brand column */}
            <div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 300,
                  marginBottom: "0.75rem",
                  color: "#FBF5DD",
                }}
              >
                Thara Bliss
              </h3>
              <p
                style={{
                  color: "rgba(251,245,221,0.55)",
                  lineHeight: 1.8,
                  fontSize: "0.9rem",
                  maxWidth: 280,
                }}
              >
                ไม่ใช่แค่ความหอม แต่คือการดูแลอารมณ์และจิตใจในทุกวัน — เลือกกลิ่นที่สะท้อนตัวตนและอยู่กับคุณในทุกช่วงเวลา
              </p>
            </div>

            {/* nav column */}
            <div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                  marginBottom: "1.2rem",
                }}
              >
                Explore
              </p>
              {["Shop", "About", "Journal"].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  style={{
                    display: "block",
                    color: "rgba(251,245,221,0.75)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>

            {/* contact column */}
            <div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                  marginBottom: "1.2rem",
                }}
              >
                Connect
              </p>
              {[
                {
                 name: "Instagram",
                 href: "https://shorturl.at/AfAPc",
                },
                {
                name: "Facebook",
                href: "https://shorturl.at/BJPYF",
                },
                {
                name: "TikTok",
                href: "https://www.tiktok.com/@tharabliss?_r=1&_t=ZS-975GjfaqjAe",
                },
                {
                name: "Shopee",
                href: "https://shorturl.at/2Eg4w",
                },
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
                    transition: "0.2s",
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <p style={{ color: "rgba(251,245,221,0.35)", fontSize: "12px" }}>
              © 2026 Thara Bliss. All rights reserved.
            </p>
            <p style={{ color: "rgba(251,245,221,0.35)", fontSize: "12px" }}>
              Calm. Balance. Bliss.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}