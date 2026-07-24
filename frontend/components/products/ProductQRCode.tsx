"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";

// Single shared destination for the whole catalog —
// change this if you'd rather point elsewhere.
const CATALOG_PATH = "/products";

export default function CatalogQRCode() {
    const [open, setOpen] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const catalogUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}${CATALOG_PATH}`
            : "";

    const handleDownload = async () => {
        if (!cardRef.current) return;

        const image = await toPng(cardRef.current, {
            cacheBust: true,
            pixelRatio: 3, // sharper export for print/social use
        });

        const link = document.createElement("a");
        link.download = "thara-bliss-qr-card.png";

        link.href = image;
        link.click();
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    width: "100%",
                    padding: "12px 1.5rem",
                    border: "1px solid rgba(251,245,221,0.6)", // light cream border, matches footer links
                    borderRadius: 10,
                    background: "transparent",
                    color: "#FBF5DD", // light cream text, visible on dark footer
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <path d="M14 14h3v3h-3zM19 14h2v2h-2zM14 19h2v2h-2zM19 19h2v2h-2z" />
                </svg>
                Generate QR Code
            </button>

            {open && (
                <div
                    onClick={() => setOpen(false)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(47, 58, 51, 0.55)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 1000,
                        padding: "1.5rem",
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "#FBF5DD",
                            borderRadius: 20,
                            padding: "2rem",
                            maxWidth: 340,
                            width: "100%",
                            textAlign: "center",
                            position: "relative",
                            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                        }}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            style={{
                                position: "absolute",
                                top: 12,
                                right: 12,
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                border: "none",
                                background: "#F5F2EB",
                                color: "#666",
                                cursor: "pointer",
                                fontSize: "16px",
                                lineHeight: 1,
                            }}
                        >
                            ×
                        </button>

                        {/*
                          Everything inside cardRef is exactly what gets
                          captured by toPng() for the download — so this
                          is both the on-screen preview AND the exported
                          card design.
                        */}
                        <div
                            ref={cardRef}
                            style={{
                                background: "#FFFFFF",
                                borderRadius: 20,
                                padding: "1.75rem 1.5rem 1.5rem",
                                border: "1px solid #EFEAE1",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* decorative corner accents */}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: 48,
                                    height: 48,
                                    borderTop: "3px solid #0F6E56",
                                    borderLeft: "3px solid #0F6E56",
                                    borderTopLeftRadius: 20,
                                }}
                            />
                            <div
                                style={{
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    width: 48,
                                    height: 48,
                                    borderBottom: "3px solid #0F6E56",
                                    borderRight: "3px solid #0F6E56",
                                    borderBottomRightRadius: 20,
                                }}
                            />

                            {/* brand header */}
                            <p
                                style={{
                                    margin: "0 0 0.15rem",
                                    fontSize: "1.05rem",
                                    fontWeight: 600,
                                    color: "#0F6E56",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                Thara<span style={{ fontStyle: "italic", fontWeight: 400 }}>Bliss</span>
                            </p>
                            <p
                                style={{
                                    margin: "0 0 1.1rem",
                                    fontSize: "10px",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    color: "#0F6E56",
                                    opacity: 0.75,
                                    fontWeight: 600,
                                }}
                            >
                                Scan to explore
                            </p>

                            <h3
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: 400,
                                    color: "#2F3A33",
                                    margin: "0 0 1.25rem",
                                }}
                            >
                                All Our Scents
                            </h3>

                            <div
                                style={{
                                    display: "inline-block",
                                    padding: "1rem",
                                    background: "#F5F2EB",
                                    border: "1px solid #EFEAE1",
                                    borderRadius: 16,
                                    marginBottom: "1rem",
                                }}
                            >
                                {catalogUrl && (
                                    <QRCodeCanvas
                                        value={catalogUrl}
                                        size={180}
                                        fgColor="#2F3A33"
                                        bgColor="#ffffffff"
                                        level="H"
                                        imageSettings={{
                                            src: "/images/services/logo_brand.jpg",
                                            x: undefined,
                                            y: undefined,
                                            height: 60,
                                            width: 60,
                                            excavate: true,
                                        }}
                                    />
                                )}
                            </div>

                            <p
                                style={{
                                    fontSize: "0.72rem",
                                    color: "#999",
                                    margin: "0 0 0.9rem",
                                    wordBreak: "break-all",
                                }}
                            >
                                
                            </p>

                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "0.68rem",
                                    color: "#0F6E56",
                                    opacity: 0.6,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                }}
                            >
                                Refresh Your Senses · Relax Your Mind
                            </p>
                        </div>

                        <button
                            onClick={handleDownload}
                            style={{
                                width: "100%",
                                padding: "0.75rem 1.5rem",
                                border: "none",
                                borderRadius: 30,
                                background: "#0F6E56",
                                color: "#ffffffff",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
                                marginTop: "1.25rem",
                            }}
                        >
                            Download QR Code
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}