"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function ProductQRCode({
    productId,
    productName,
}: {
    productId: string;
    productName: string;
}) {
    const [open, setOpen] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const productUrl =
        typeof window !== "undefined"
            ? `${window.location.origin}/products/${productId}`
            : "";

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `${productName.replace(/\s+/g, "-").toLowerCase()}-qr.png`;
        link.click();
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                style={{
                    width: "100%",
                    padding: "12px 1.5rem",
                    border: "1px solid #0F6E56",
                    borderRadius: 10,
                    background: "transparent",
                    color: "#0F6E56",
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

                        <p
                            style={{
                                color: "#0F6E56",
                                fontSize: "11px",
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                                marginBottom: "1rem",
                            }}
                        >
                            Scan to view
                        </p>

                        <h3
                            style={{
                                fontSize: "1.15rem",
                                fontWeight: 400,
                                color: "#2F3A33",
                                margin: "0 0 1.5rem",
                            }}
                        >
                            {productName}
                        </h3>

                        <div
                            style={{
                                display: "inline-block",
                                padding: "1rem",
                                background: "#FFFFFF",
                                border: "1px solid #EFEAE1",
                                borderRadius: 16,
                                marginBottom: "1.25rem",
                            }}
                        >
                            {productUrl && (
                                <QRCodeCanvas
                                    ref={canvasRef}
                                    value={productUrl}
                                    size={200}
                                    fgColor="#2F3A33"
                                    level="M"
                                />
                            )}
                        </div>

                        <p
                            style={{
                                fontSize: "0.8rem",
                                color: "#888",
                                marginBottom: "1.5rem",
                                wordBreak: "break-all",
                            }}
                        >
                            {productUrl}
                        </p>

                        <button
                            onClick={handleDownload}
                            style={{
                                width: "100%",
                                padding: "0.75rem 1.5rem",
                                border: "none",
                                borderRadius: 30,
                                background: "#0F6E56",
                                color: "#FBF5DD",
                                cursor: "pointer",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                                letterSpacing: "0.05em",
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