import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

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
    slug?: string;
  };
}

interface SiteSettings {
  shopee_regular_url: string | null;
  shopee_set_url: string | null;
  tiktok_url: string | null;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
  }
}

async function getSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/site-settings/", {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("getSettings error:", err);
    return null;
  }
}

const PERKS = [
  { icon: "✦", label: "Alcohol Free" },
  { icon: "✦", label: "Paraben Free" },
  { icon: "✦", label: "SLES Free" },
  { icon: "✦", label: "Certified อย." },
];

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, settings] = await Promise.all([getProduct(id), getSettings()]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            background: "#FAFAF7",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            gap: "1.5rem",
          }}
        >
          <p style={{ fontSize: "3rem" }}>🌿</p>
          <h1 style={{ fontWeight: 300, fontSize: "2rem", color: "#2F3A33" }}>
            Product not found
          </h1>
          <Link
            href="/products"
            style={{
              color: "#0F6E56",
              textDecoration: "none",
              fontSize: "0.9rem",
              letterSpacing: "0.1em",
              borderBottom: "1px solid #0F6E56",
              paddingBottom: 2,
            }}
          >
            ← Back to collection
          </Link>
        </main>
      </>
    );
  }

  const categoryName = product.category?.name?.toLowerCase() || "";
  const categorySlug = product.category?.slug?.toLowerCase() || "";
  const isSet =
    categoryName.includes("set") ||
    categorySlug.includes("set") ||
    categoryName.includes("duo") ||
    categoryName.includes("trio") ||
    categoryName.includes("bundle");

  const shopeeUrl =
    isSet && settings?.shopee_set_url
      ? settings.shopee_set_url
      : settings?.shopee_regular_url;
  const tiktokUrl = settings?.tiktok_url;

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: "#2F3A33",
        }}
      >
        {/* ── BREADCRUMB ── */}
        <div
          style={{
            padding: "1.25rem 6vw",
            borderBottom: "1px solid #EFEAE1",
            background: "#FFFFFF",
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
            fontSize: "12px",
            color: "#999",
            letterSpacing: "0.05em",
          }}
        >
          <Link href="/products" style={{ color: "#0F6E56", textDecoration: "none" }}>
            Collection
          </Link>
          <span>›</span>
          <span>{product.category?.name || "Product"}</span>
          <span>›</span>
          <span style={{ color: "#2F3A33" }}>{product.name}</span>
        </div>

        {/* ── MAIN GRID ── */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5vw",
            alignItems: "start",
            padding: "4rem 6vw 6rem",
          }}
        >
          {/* ── IMAGE PANEL ── */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: 24,
                overflow: "hidden",
                border: "1px solid #EFEAE1",
                aspectRatio: "1 / 1",
                position: "relative",
              }}
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ccc",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ fontSize: "3rem" }}>🌿</span>
                  <span style={{ fontSize: "0.85rem" }}>No image available</span>
                </div>
              )}
            </div>

            {/* perk pills below image */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "1.25rem",
                justifyContent: "center",
              }}
            >
              {PERKS.map((p) => (
                <span
                  key={p.label}
                  style={{
                    background: "#EAF3EC",
                    color: "#0F6E56",
                    fontSize: "10px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: 20,
                  }}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── INFO PANEL ── */}
          <div style={{ paddingTop: "0.5rem" }}>
            {/* category + back */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <span
                style={{
                  color: "#0F6E56",
                  textTransform: "uppercase",
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                }}
              >
                {product.category?.name || "Aroma Balm"}
              </span>
              <Link
                href="/products"
                style={{
                  color: "#999",
                  fontSize: "12px",
                  textDecoration: "none",
                  letterSpacing: "0.05em",
                }}
              >
                ← All products
              </Link>
            </div>

            {/* name */}
            <h1
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                color: "#2F3A33",
              }}
            >
              {product.name}
            </h1>

            {/* scent tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#FBF5DD",
                border: "1px solid #EFEAE1",
                borderRadius: 20,
                padding: "5px 14px",
                marginBottom: "2rem",
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "#888" }}>Scent</span>
              <span
                style={{
                  fontSize: "0.8rem",
                  color: "#2F3A33",
                  fontStyle: "italic",
                }}
              >
                {product.scent}
              </span>
            </div>

            {/* divider */}
            <div style={{ height: 1, background: "#EFEAE1", marginBottom: "2rem" }} />

            {/* description */}
            <p
              style={{
                lineHeight: 2,
                color: "#555",
                fontSize: "0.97rem",
                marginBottom: "2.5rem",
              }}
            >
              {product.description}
            </p>

            {/* price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <span style={{ fontSize: "2.4rem", fontWeight: 300, color: "#0F6E56" }}>
                ฿{product.price}
              </span>
              <span style={{ fontSize: "0.85rem", color: "#aaa" }}>THB</span>
            </div>

            {/* divider */}
            <div style={{ height: 1, background: "#EFEAE1", marginBottom: "2rem" }} />

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {shopeeUrl && (
                <Link href={shopeeUrl} target="_blank" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "1rem 1.5rem",
                      border: "none",
                      borderRadius: 12,
                      background: "#EE4D2D",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Buy on Shopee
                  </button>
                </Link>
              )}

              {tiktokUrl && (
                <Link href={tiktokUrl} target="_blank" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "1rem 1.5rem",
                      border: "none",
                      borderRadius: 12,
                      background: "#111",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/>
                    </svg>
                    Buy on TikTok Shop
                  </button>
                </Link>
              )}
            </div>

            {/* reassurance */}
            <p
              style={{
                marginTop: "1.5rem",
                fontSize: "0.8rem",
                color: "#aaa",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              Secure checkout via Shopee &amp; TikTok Shop · Ships within Thailand
            </p>
          </div>
        </div>

        {/* ── FOOTER STRIP ── */}
        <footer
          style={{
            background: "#2F3A33",
            color: "#FBF5DD",
            padding: "2.5rem 6vw",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p style={{ fontWeight: 300, fontSize: "1.1rem" }}>Thara Bliss</p>
          <p style={{ color: "rgba(251,245,221,0.4)", fontSize: "12px" }}>
            Calm. Balance. Bliss. · © 2026 Thara Bliss
          </p>
        </footer>
      </main>
    </>
  );
}