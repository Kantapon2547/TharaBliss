import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "@/lib/api";

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
        <section
          style={{
            position: "relative",
            height: "88vh",
            minHeight: 540,
          }}
        >
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
              maxWidth: 700,
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
              }}
            >
              Find Your <br />
              <em style={{ fontStyle: "italic" }}>Signature</em> <br />
              Scent.
            </h1>

            <p
              style={{
                color: "rgba(251,245,221,0.8)",
                lineHeight: 1.8,
                fontSize: "1rem",
                maxWidth: 420,
                marginTop: "1.5rem",
              }}
            >
              บาล์มอโรมาสัญชาติไทย ออกแบบกลิ่นให้หอมละมุน ใช้ได้ทุกวัน
              ช่วยผ่อนคลาย สดชื่น และดูแลอารมณ์อย่างอ่อนโยน
            </p>

            <a
              href="#collection"
              style={{
                display: "inline-block",
                marginTop: "2rem",
                background: "#FBF5DD",
                color: "#0F6E56",
                padding: "0.85rem 2.2rem",
                borderRadius: 40,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
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
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          {CERTIFICATIONS.map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#FBF5DD",
              }}
            >
              <span style={{ opacity: 0.6 }}>{c.icon}</span>
              <span
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {c.label}
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
            padding: "5rem 5vw",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "3rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "#0F6E56",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontSize: "11px",
                }}
              >
                Featured Collection
              </p>
              <h2 style={{ fontWeight: 300, margin: 0 }}>
                Aroma Balm Series
              </h2>
            </div>

            <p style={{ color: "#888" }}>
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>

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
                padding: "4rem",
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #EFEAE1",
              }}
            >
              <p style={{ fontSize: "2rem" }}>🌿</p>
              <p>Products are coming soon</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* ── BRAND STRIP ── */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "5rem 6vw",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
          }}
        >
          <div>
            <p style={{ color: "#0F6E56", textTransform: "uppercase" }}>
              Why Thara Bliss
            </p>
            <h2 style={{ fontWeight: 300 }}>
              More than a balm — <em>a ritual</em>
            </h2>
            <p style={{ color: "#555" }}>
              Aromatic Balm crafted for emotional balance and daily calm.
            </p>
          </div>

          <img
            src="/images/products/aroma.jpg"
            alt="product"
            style={{ width: "100%", borderRadius: 16 }}
          />
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: "#0F6E56",
            color: "#FBF5DD",
            textAlign: "center",
            padding: "5rem 2rem",
          }}
        >
          <h2 style={{ fontWeight: 300 }}>
            Choose Your Signature Scent
          </h2>
          <a
            href="#collection"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              border: "1px solid #FBF5DD",
              padding: "0.8rem 2rem",
              borderRadius: 40,
              color: "#FBF5DD",
              textDecoration: "none",
            }}
          >
            Browse Collection
          </a>
        </section>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#2F3A33",
            color: "#FBF5DD",
            padding: "3rem 6vw",
          }}
        >
          <p style={{ opacity: 0.6, fontSize: 12 }}>
            © 2026 Thara Bliss
          </p>
        </footer>
      </main>
    </>
  );
}