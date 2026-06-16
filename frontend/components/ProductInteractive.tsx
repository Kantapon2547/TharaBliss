"use client";

import Image from "next/image";
import { useState } from "react";

interface FragranceNote {
  label: string;
  notes: string;
}

interface Size {
  label: string;
  price: string;
}

interface Props {
  productName: string;
  images: string[];
  fragranceNotes?: FragranceNote[];
  sizes?: Size[];
  basePrice: string;
  howToUse?: string;
  ingredients?: string;
  /** rendered inside the info column, after the size/price block — buttons, perks etc. */
  children?: (displayPrice: string) => React.ReactNode;
}

const PERKS = [
  { label: "Alcohol Free" },
  { label: "Paraben Free" },
  { label: "SLES Free" },
  { label: "Certified อย." },
];

/* ── Reusable accordion section ── */
function InfoAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "0.5px solid #EFEAE1" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "1.1rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "left",
          fontFamily: "inherit",
          gap: "1rem",
        }}
      >
        <span style={{ fontSize: "0.95rem", fontWeight: 400, color: "#2F3A33", letterSpacing: "0.02em" }}>
          {title}
        </span>
        <span
          style={{
            width: 22,
            height: 22,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
          >
            <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="#0F6E56" strokeWidth="1.4" strokeLinecap="round" />
            <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="#0F6E56" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: "1.4rem", color: "#666", lineHeight: 1.9, fontSize: "0.9rem" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/* ── Image panel: main image + thumbnails + perks + fragrance notes ── */
export function ProductImagePanel({
  productName,
  images,
  fragranceNotes,
}: {
  productName: string;
  images: string[];
  fragranceNotes?: FragranceNote[];
}) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <>
      <style>{`
        .product-image-panel {
          position: sticky;
          top: 5rem;
        }
        .fragrance-notes-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .product-image-panel {
            position: static !important;
          }
          .fragrance-notes-box {
            margin-top: 1.25rem !important;
          }
        }
        @media (max-width: 480px) {
          .product-image-panel-perks {
            gap: 0.4rem !important;
          }
          .thumbnail-strip {
            gap: 6px !important;
          }
          .thumbnail-btn {
            width: 50px !important;
            height: 50px !important;
          }
        }
      `}</style>

      <div className="product-image-panel">
        {/* Main image */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 16,
            overflow: "hidden",
            border: "0.5px solid #EFEAE1",
            aspectRatio: "1 / 1",
            position: "relative",
          }}
        >
          {images.length > 0 ? (
            <Image src={images[activeImage]} alt={productName} fill style={{ objectFit: "cover" }} />
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

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div
            className="thumbnail-strip"
            style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto", paddingBottom: 2 }}
          >
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="thumbnail-btn"
                style={{
                  flexShrink: 0,
                  width: 58,
                  height: 58,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: i === activeImage ? "1.5px solid #0F6E56" : "0.5px solid #EFEAE1",
                  position: "relative",
                  padding: 0,
                  cursor: "pointer",
                  background: "none",
                }}
              >
                <Image src={src} alt={`${productName} ${i + 1}`} fill style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}

        {/* Perk badges */}
        <div
          className="product-image-panel-perks"
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}
        >
          {PERKS.map((p) => (
            <span
              key={p.label}
              style={{
                background: "#E1F5EE",
                color: "#085041",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "4px 10px",
                borderRadius: 4,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>

        {/* Fragrance notes pyramid */}
        {fragranceNotes && fragranceNotes.length > 0 && (
          <div
            className="fragrance-notes-box"
            style={{
              marginTop: "2rem",
              background: "#FFFFFF",
              border: "0.5px solid #EFEAE1",
              borderRadius: 16,
              padding: "1.5rem",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#0F6E56",
                marginBottom: "1.25rem",
              }}
            >
              Fragrance Notes
            </p>
            <div className="fragrance-notes-grid">
              {fragranceNotes.map((n, i) => (
                <div key={n.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      flexShrink: 0,
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      marginTop: 5,
                      background: i === 0 ? "#A8D5BE" : i === 1 ? "#0F6E56" : "#06402B",
                    }}
                  />
                  <div>
                    <p
                      style={{
                        fontSize: "0.78rem",
                        color: "#aaa",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        marginBottom: 2,
                      }}
                    >
                      {n.label}
                    </p>
                    <p style={{ fontSize: "0.92rem", color: "#2F3A33" }}>{n.notes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ── Size selector + price + stock — fully self-contained ── */
export function ProductSizeAndPrice({
  sizes,
  basePrice,
}: {
  sizes?: Size[];
  basePrice: string;
}) {
  const [selectedSize, setSelectedSize] = useState(0);
  const list = sizes ?? [];
  const displayPrice = list.length > 0 ? list[selectedSize].price : basePrice;

  return (
    <>
      <style>{`
        @media (max-width: 480px) {
          .size-btn-group {
            gap: 0.5rem !important;
          }
          .size-btn {
            padding: 0.55rem 0.9rem !important;
            font-size: 0.8rem !important;
          }
          .price-display {
            font-size: 1.9rem !important;
          }
        }
      `}</style>

      {list.length > 0 && (
        <div>
          <p style={{ fontSize: "11px", color: "#aaa", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.6rem" }}>
            Size
          </p>
          <div className="size-btn-group" style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            {list.map((s, i) => (
              <button
                key={s.label}
                onClick={() => setSelectedSize(i)}
                className="size-btn"
                style={{
                  padding: "0.6rem 1.1rem",
                  borderRadius: 8,
                  border: i === selectedSize ? "1.5px solid #0F6E56" : "1px solid #EFEAE1",
                  background: i === selectedSize ? "#EAF3EC" : "#FFFFFF",
                  color: i === selectedSize ? "#0F6E56" : "#555",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: 6 }}>
          <span className="price-display" style={{ fontSize: "2.2rem", fontWeight: 300, color: "#0F6E56" }}>
            ฿{displayPrice}
          </span>
          <span style={{ fontSize: "0.85rem", color: "#aaa" }}>THB</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0F6E56" }} />
          <span style={{ fontSize: 12, color: "#085041" }}>In stock · ships within 1–2 days</span>
        </div>
      </div>
    </>
  );
}

/* ── Accordion group: How to Use / Ingredients / Shipping ── */
export function ProductAccordions({
  howToUse,
  ingredients,
}: {
  howToUse?: string;
  ingredients?: string;
}) {
  return (
    <div>
      <InfoAccordion title="วิธีการใช้ผลิตภัณฑ์ — How to Use" defaultOpen>
        <p>
          {howToUse ??
            "แต้มเบา ๆ บริเวณจุดพับ เช่น ข้อมือ ต้นคอ หรือขมับ เพื่อสัมผัสกลิ่นหอมอย่างเต็มที่ ใช้ได้ทุกเมื่อที่ต้องการความผ่อนคลาย"}
        </p>
      </InfoAccordion>

      <InfoAccordion title="ส่วนผสม — Ingredients">
        <p style={{ wordBreak: "break-word" }}>
          {ingredients ??
            "Caprylic/Capric Triglyceride, Cera Alba (Beeswax), Butyrospermum Parkii (Shea Butter), Parfum, Tocopherol (Vitamin E)."}
        </p>
        <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "#aaa" }}>
          ผลิตภัณฑ์ปราศจาก Alcohol, Paraben และ SLES — ผ่านการรับรองจาก อย.
        </p>
      </InfoAccordion>

      <InfoAccordion title="การจัดส่งและการคืนสินค้า — Shipping & Returns">
        <p>
          จัดส่งภายใน 1–2 วันทำการสำหรับคำสั่งซื้อในประเทศไทย หากพบปัญหากับสินค้า
          สามารถติดต่อทีมงานเพื่อเปลี่ยน/คืนสินค้าได้ภายใน 7 วันหลังได้รับสินค้า
        </p>
      </InfoAccordion>
    </div>
  );
}