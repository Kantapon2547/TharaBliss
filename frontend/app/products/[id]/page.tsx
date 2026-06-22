import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import SocialIcons from "../../../components/SocialLinks";
import {
  getProduct,
  getSettings,
  SiteSettings,
  Product,
} from "@/lib/api";

import {
  ProductImagePanel,
  ProductSizeAndPrice,
  ProductAccordions,
} from "../../../components/ProductInteractive";

import { FaInstagram, FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";

export const dynamic = "force-dynamic";

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

  const isSet = product.is_set_product === true;

  const shopeeUrl =
    isSet && settings?.shopee_set_url
      ? settings.shopee_set_url
      : settings?.shopee_regular_url;
  const tiktokUrl = settings?.tiktok_url;

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images ?? []),
  ];

  return (
    <>
      <Navbar />

      <style>{`
        @media (max-width: 768px) {
          .product-main-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem 5vw 4rem !important;
            gap: 2rem !important;
          }
          .product-footer-strip {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.5rem !important;
            padding: 2rem 6vw !important;
          }
        }

        @media (max-width: 480px) {
          .product-breadcrumb {
            padding: 0.85rem 5vw !important;
            flex-wrap: wrap !important;
            gap: 0.3rem !important;
          }
          .product-main-grid {
            padding: 1.5rem 5vw 3rem !important;
          }
        }
      `}</style>

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
          className="product-breadcrumb"
          style={{
            padding: "1rem 6vw",
            borderBottom: "0.5px solid #EFEAE1",
            background: "#FFFFFF",
            display: "flex",
            gap: "0.4rem",
            alignItems: "center",
            fontSize: "11px",
            color: "#aaa",
            letterSpacing: "0.05em",
          }}
        >
          <Link href="/products" style={{ color: "#0F6E56", textDecoration: "none" }}>
            Collection
          </Link>
          <span>›</span>
          <span>{product.category?.name || "Product"}</span>
          <span>›</span>
          <span style={{ color: "#555" }}>{product.name}</span>
        </div>

        {/* ── MAIN GRID ── */}
        <div
          className="product-main-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5vw",
            alignItems: "start",
            padding: "3.5rem 6vw 6rem",
          }}
        >
          {/* ── IMAGE PANEL (client: gallery + perks + notes) ── */}
          <ProductImagePanel
            productName={product.name}
            images={allImages}
            fragranceNotes={product.fragrance_notes}
          />

          {/* ── INFO PANEL ── */}
          <div style={{ paddingTop: "0.25rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Category + back */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#0F6E56", textTransform: "uppercase", fontSize: "10px", letterSpacing: "0.18em" }}>
                {product.category?.name || "Aroma Balm"}
              </span>
              <Link href="/products" style={{ color: "#aaa", fontSize: "12px", textDecoration: "none" }}>
                ← All products
              </Link>
            </div>

            {/* Name */}
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.1, color: "#2F3A33", margin: 0 }}>
              {product.name}
            </h1>

            {/* Scent tag */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "#FBF5DD",
                border: "0.5px solid #e8e0c8",
                borderRadius: 4,
                padding: "4px 12px",
                alignSelf: "flex-start",
              }}
            >
              <span style={{ fontSize: "10px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em" }}>Scent</span>
              <span style={{ fontSize: "12px", color: "#2F3A33", fontStyle: "italic" }}>{product.scent}</span>
            </div>

            {/* Divider */}
            <div style={{ height: "0.5px", background: "#EFEAE1" }} />

            {/* Description */}
            <p style={{ lineHeight: 1.9, color: "#666", fontSize: "0.95rem" }}>{product.description}</p>

            {/* ── SIZE SELECTOR + PRICE + STOCK (client) ── */}
            <ProductSizeAndPrice sizes={product.sizes} basePrice={product.price} />

            {/* Divider */}
            <div style={{ height: "0.5px", background: "#EFEAE1" }} />

            {/* CTA buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {shopeeUrl && (
                <Link href={shopeeUrl} target="_blank" style={{ textDecoration: "none" }}>
                  <button
                    style={{
                      width: "100%",
                      padding: "13px 1.5rem",
                      border: "none",
                      borderRadius: 10,
                      background: "#EE4D2D",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
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
                      padding: "13px 1.5rem",
                      border: "none",
                      borderRadius: 10,
                      background: "#111",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.6rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.05a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/>
                    </svg>
                    Buy on TikTok Shop
                  </button>
                </Link>
              )}
            </div>

            {/* Divider */}
            <div style={{ height: "0.5px", background: "#EFEAE1" }} />

            {/* ── ACCORDIONS: How to Use / Ingredients / Shipping (client) ── */}
            <ProductAccordions howToUse={product.how_to_use} ingredients={product.ingredients} />
          </div>
        </div>

        {/* ── FOOTER STRIP ── */}
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
              {["Products", "About", "Journal", "Help-Center"].map((link) => (
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
            <div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.45,
                  marginBottom: "1.2rem",
                }}>
                Follow Us
              </p>
              <SocialIcons />
            </div>
          </div>
          <div
            className="footer-bottom"
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