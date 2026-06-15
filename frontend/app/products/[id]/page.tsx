import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import {
  getProduct,
  getSettings,
} from "@/lib/api";

import {
  ProductImagePanel,
  ProductSizeAndPrice,
  ProductAccordions,
} from "../../../components/ProductInteractive";

interface FragranceNote {
  label: string;
  notes: string;
}

export const dynamic = "force-dynamic";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const [product, settings] = await Promise.all([
    getProduct(id),
    getSettings(),
  ]);

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

  const categoryName = product.category?.name?.toLowerCase() ?? "";
  const categorySlug = product.category?.slug?.toLowerCase() ?? "";

  const isSet =
    categoryName.includes("set") ||
    categorySlug.includes("set") ||
    categoryName.includes("duo") ||
    categoryName.includes("trio") ||
    categoryName.includes("bundle");

  const shopeeUrl = isSet
    ? settings?.shopee_set_url
    : settings?.shopee_regular_url;

  const tiktokUrl = settings?.tiktok_url;

  const allImages = [
    ...(product.image ? [product.image] : []),
    ...(product.images ?? []),
  ];

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
            padding: "1rem 6vw",
            borderBottom: "0.5px solid #EFEAE1",
            background: "#FFFFFF",
            display: "flex",
            gap: "0.4rem",
            alignItems: "center",
            fontSize: "11px",
            color: "#aaa",
            letterSpacing: "0.05em",
            flexWrap: "wrap",
          }}
        >
          <Link href="/products" style={{ color: "#0F6E56" }}>
            Collection
          </Link>
          <span>›</span>
          <span>{product.category?.name || "Product"}</span>
          <span>›</span>
          <span style={{ color: "#555" }}>{product.name}</span>
        </div>

        {/* ── MAIN GRID (RESPONSIVE FIXED) ── */}
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "4vw",
            alignItems: "start",
            padding: "3.5rem 6vw 6rem",
          }}
        >
          {/* ── IMAGE PANEL ── */}
          <ProductImagePanel
            productName={product.name}
            images={allImages}
            fragranceNotes={product.fragrance_notes}
          />

          {/* ── INFO PANEL ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {/* Category */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#0F6E56",
                  textTransform: "uppercase",
                  fontSize: "10px",
                  letterSpacing: "0.18em",
                }}
              >
                {product.category?.name || "Aroma Balm"}
              </span>

              <Link href="/products" style={{ color: "#aaa", fontSize: "12px" }}>
                ← All products
              </Link>
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                fontWeight: 300,
                margin: 0,
              }}
            >
              {product.name}
            </h1>

            {/* Scent */}
            <div
              style={{
                display: "inline-flex",
                gap: "0.4rem",
                background: "#FBF5DD",
                borderRadius: 6,
                padding: "4px 12px",
                alignSelf: "flex-start",
              }}
            >
              <span style={{ fontSize: "10px", color: "#999" }}>Scent</span>
              <span style={{ fontSize: "12px", fontStyle: "italic" }}>
                {product.scent}
              </span>
            </div>

            <div style={{ height: 1, background: "#EFEAE1" }} />

            {/* Description */}
            <p style={{ lineHeight: 1.9, color: "#666" }}>
              {product.description}
            </p>

            {/* SIZE + PRICE */}
            <ProductSizeAndPrice
              sizes={product.sizes}
              basePrice={product.price}
            />

            <div style={{ height: 1, background: "#EFEAE1" }} />

            {/* CTA */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {shopeeUrl && (
                <a
                  href={shopeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "13px",
                      background: "#EE4D2D",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    Buy on Shopee
                  </button>
                </a>
              )}

              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  <button
                    style={{
                      width: "100%",
                      padding: "13px",
                      background: "#111",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      cursor: "pointer",
                    }}
                  >
                    Buy on TikTok Shop
                  </button>
                </a>
              )}
            </div>

            <div style={{ height: 1, background: "#EFEAE1" }} />

            {/* ACCORDIONS */}
            <ProductAccordions
              howToUse={product.how_to_use}
              ingredients={product.ingredients}
            />
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#2F3A33",
            color: "#FBF5DD",
            padding: "2.5rem 6vw",
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: 300 }}>Thara Bliss</p>
          <p style={{ fontSize: "12px", opacity: 0.5 }}>
            Calm. Balance. Bliss. © 2026
          </p>
        </footer>
      </main>
    </>
  );
}