"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/api";

const TABS = ["Aroma Balm", "Room Spray"] as const;
type Tab = typeof TABS[number];

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("Aroma Balm");

  const aromaItems = [
    ...products.map((p) => ({ type: "product" as const, data: p })),
  ];

  return (
    <div>
      {/* ── TABS ── */}
      <div
        style={{
          display: "flex",
          gap: 0,
          marginBottom: "3rem",
          borderBottom: "1px solid #EFEAE1",
        }}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: "none",
                border: "none",
                borderBottom: isActive ? "2px solid #0F6E56" : "2px solid transparent",
                color: isActive ? "#0F6E56" : "#999",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "0.75rem 1.75rem",
                cursor: "pointer",
                fontWeight: isActive ? 500 : 400,
                transition: "all 0.2s",
                marginBottom: "-1px",
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* ── AROMA BALM GRID ── */}
      {activeTab === "Aroma Balm" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          {aromaItems.map((item) =>
            item.type === "product" ? (
              <ProductCard key={item.data.id} product={item.data} />
            ) : (
              <div
                key={item.data.id}
                style={{
                  background: "#FFFFFF",
                  border: "1px dashed #C8C2B6",
                  borderRadius: 16,
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.25rem",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: 200,
                    background: "linear-gradient(135deg, #EFEAE1 0%, #E2DDD4 100%)",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ fontSize: "2.5rem", opacity: 0.35 }}>🌿</span>
                </div>
                <span
                  style={{
                    position: "absolute",
                    top: "1.25rem",
                    right: "1.25rem",
                    background: "#0F6E56",
                    color: "#FBF5DD",
                    fontSize: "10px",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 40,
                  }}
                >
                  Coming Soon
                </span>
                <div>
                  <p style={{ fontSize: "1.1rem", fontWeight: 400, color: "#2F3A33", margin: "0 0 0.4rem" }}>
                    {item.data.name}
                  </p>
                  <p style={{ fontSize: "0.85rem", color: "#999", letterSpacing: "0.06em" }}>
                    Details to be announced
                  </p>
                </div>
                <button
                  disabled
                  style={{
                    marginTop: "auto",
                    border: "1px solid #C8C2B6",
                    background: "transparent",
                    color: "#aaa",
                    padding: "0.7rem 1.5rem",
                    borderRadius: 40,
                    fontSize: "0.8rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "not-allowed",
                  }}
                >
                  Notify Me
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* ── ROOM SPRAY BANNER ── */}
      {activeTab === "Room Spray" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* image — fixed height, no overlay on top of it */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            <img
              src="/images/products/room_spray.jpg"
              alt="Thara Bliss Room Spray Collection — Coming Soon"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 20%",
                display: "block",
              }}
            />
          </div>

          {/* info strip — separate row below the image */}
          <div
            style={{
              background: "#2F3A33",
              borderRadius: 12,
              padding: "1.25rem 1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <p
                style={{
                  color: "rgba(251,245,221,0.55)",
                  fontSize: "10px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                Coming Soon
              </p>
              <p
                style={{
                  color: "#FBF5DD",
                  fontSize: "1.1rem",
                  fontWeight: 300,
                  margin: 0,
                  letterSpacing: "0.04em",
                }}
              >
                Room Spray Collection
              </p>
            </div>

            <button
              disabled
              style={{
                border: "1px solid rgba(251,245,221,0.35)",
                background: "transparent",
                color: "rgba(251,245,221,0.7)",
                padding: "0.65rem 1.75rem",
                borderRadius: 40,
                fontSize: "0.78rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "not-allowed",
              }}
            >
              Notify Me
            </button>
          </div>
        </div>
      )}
    </div>
  );
}