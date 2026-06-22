"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/api";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const TABS = ["Aroma Balm", "Room Spray", "Special Gift"] as const;
type Tab = typeof TABS[number];

export default function ProductCarousel({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("Aroma Balm");
  const [giftOpen, setGiftOpen] = useState(false);
  const [sprayOpen, setSprayOpen] = useState(false);
  const searchParams = useSearchParams();
   const router = useRouter();

   // Sync tab when navbar dropdown is clicked
   useEffect(() => {
     const tabMap: Record<string, Tab> = {
       "aroma-balm":   "Aroma Balm",
       "room-spray":   "Room Spray",
       "special-gift": "Special Gift",
     };
     const tab = searchParams.get("tab");
     if (tab && tabMap[tab]) setActiveTab(tabMap[tab]);
   }, [searchParams]);

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
              onClick={() => {setActiveTab(tab);
              const urlMap: Record<Tab, string> = {
                "Aroma Balm":   "aroma-balm",
                "Room Spray":   "room-spray",
                "Special Gift": "special-gift",
              };
              router.replace(`/products?tab=${urlMap[tab]}`, { scroll: false });
              }}

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

      {/* ── ROOM SPRAY — collapsed tab, click to expand ── */}
      {activeTab === "Room Spray" && (
        <div style={{ width: "100%", maxWidth: "100%" }}>
          <button
            onClick={() => setSprayOpen(!sprayOpen)}
            style={{
              width: "100%",
              background: "#2F3A33",
              border: "none",
              borderRadius: sprayOpen ? "12px 12px 0 0" : "12px",
              padding: "1.1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", textAlign: "left" }}>
              <span style={{ fontSize: "1.3rem" }}>🌿</span>
              <div>
                <p
                  style={{
                    color: "rgba(251,245,221,0.55)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    margin: "0 0 0.2rem",
                  }}
                >
                  Coming Soon
                </p>
                <p style={{ color: "#FBF5DD", fontSize: "1rem", fontWeight: 400, margin: 0, letterSpacing: "0.03em" }}>
                  Room Spray Collection
                </p>
              </div>
            </div>

            <span
              style={{
                width: 26,
                height: 26,
                flexShrink: 0,
                borderRadius: "50%",
                background: "rgba(251,245,221,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                style={{ transform: sprayOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
              >
                <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="#FBF5DD" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="#FBF5DD" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </button>

          {sprayOpen && (
            <div
              className="room-spray-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                alignItems: "stretch",
                background: "#FFFFFF",
                border: "1px solid #EFEAE1",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "1.5rem",
              }}
            >
              {/* image */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "100%",
                  height: "100%",
                  minHeight: 280,
                }}
              >
                <img
                  src="/images/products/room_spray.jpg"
                  alt="Thara Bliss Room Spray Collection — Coming Soon"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                    objectPosition: "center 20%",
                    display: "block",
                  }}
                />
              </div>

              {/* info card — beside the image */}
              <div
                style={{
                  background: "#FAFAF7",
                  border: "1px solid #EFEAE1",
                  borderRadius: 12,
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#0F6E56",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Coming Soon
                  </p>
                  <p
                    style={{
                      color: "#2F3A33",
                      fontSize: "1.4rem",
                      fontWeight: 300,
                      margin: 0,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Room Spray Collection
                  </p>
                  <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.7, marginTop: "0.75rem" }}>
                    Fragrance for your space — details to be announced.
                  </p>
                </div>

                <button
                  disabled
                  style={{
                    alignSelf: "flex-start",
                    border: "1px solid #C8C2B6",
                    background: "transparent",
                    color: "#aaa",
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
      )}

      {/* ── SPECIAL GIFT — collapsed tab, click to expand ── */}
      {activeTab === "Special Gift" && (
        <div style={{ width: "100%", maxWidth: "100%" }}>
          <button
            onClick={() => setGiftOpen(!giftOpen)}
            style={{
              width: "100%",
              background: "#2F3A33",
              border: "none",
              borderRadius: giftOpen ? "12px 12px 0 0" : "12px",
              padding: "1.1rem 1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", textAlign: "left" }}>
              <span style={{ fontSize: "1.3rem" }}>🎁</span>
              <div>
                <p
                  style={{
                    color: "rgba(251,245,221,0.55)",
                    fontSize: "10px",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    margin: "0 0 0.2rem",
                  }}
                >
                  Coming Soon
                </p>
                <p style={{ color: "#FBF5DD", fontSize: "1rem", fontWeight: 400, margin: 0, letterSpacing: "0.03em" }}>
                  Special Gift Collection
                </p>
              </div>
            </div>

            <span
              style={{
                width: 26,
                height: 26,
                flexShrink: 0,
                borderRadius: "50%",
                background: "rgba(251,245,221,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                style={{ transform: giftOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
              >
                <line x1="6.5" y1="1" x2="6.5" y2="12" stroke="#FBF5DD" strokeWidth="1.4" strokeLinecap="round" />
                <line x1="1" y1="6.5" x2="12" y2="6.5" stroke="#FBF5DD" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
          </button>

          {giftOpen && (
            <div
              className="special-gift-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.5rem",
                alignItems: "stretch",
                background: "#FFFFFF",
                border: "1px solid #EFEAE1",
                borderTop: "none",
                borderRadius: "0 0 12px 12px",
                padding: "1.5rem",
              }}
            >
              {/* image */}
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "100%",
                  height: "100%",
                  minHeight: 280,
                }}
              >
                <img
                  src="/images/products/special_gift.jpg"
                  alt="Thara Bliss Special Gift Collection — Coming Soon"
                  style={{
                    width: "100%",
                    height: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                    objectPosition: "center 35%",
                    display: "block",
                  }}
                />
              </div>

              {/* info card — beside the image */}
              <div
                style={{
                  background: "#FAFAF7",
                  border: "1px solid #EFEAE1",
                  borderRadius: 12,
                  padding: "1.75rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1.25rem",
                }}
              >
                <div>
                  <p
                    style={{
                      color: "#0F6E56",
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Coming Soon
                  </p>
                  <p
                    style={{
                      color: "#2F3A33",
                      fontSize: "1.4rem",
                      fontWeight: 300,
                      margin: 0,
                      letterSpacing: "0.04em",
                    }}
                  >
                    Special Gift Collection
                  </p>
                  <p style={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.7, marginTop: "0.75rem" }}>
                    Curated gift sets for special occasions — details to be announced.
                  </p>
                </div>

                <button
                  disabled
                  style={{
                    alignSelf: "flex-start",
                    border: "1px solid #C8C2B6",
                    background: "transparent",
                    color: "#aaa",
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
      )}

      <style>{`
        @media (max-width: 768px) {
          .special-gift-row,
          .room-spray-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}