"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      style={{
        background: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #EFEAE1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── IMAGE ── */}
      <div style={{ position: "relative", height: 260, overflow: "hidden", background: "#F4F0E8" }}>
        {product.image ? (
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ width: "100%", height: "100%", position: "relative" }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C8C2B6",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            No Image
          </div>
        )}

        {/* scent pill — top left */}
        {product.scent && (
          <span
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(6px)",
              color: "#0F6E56",
              fontSize: "10px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "0.3rem 0.7rem",
              borderRadius: 40,
              fontWeight: 500,
            }}
          >
            {product.scent}
          </span>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div
        style={{
          padding: "1.25rem 1.5rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "0.5rem",
        }}
      >
        {/* category */}
        <p
          style={{
            color: "#B0A898",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {product.category?.name || "Thara Bliss"}
        </p>

        {/* name */}
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "#2F3A33",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </h3>

        {/* description */}
        <p
          style={{
            color: "#999",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            margin: 0,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            flex: 1,
          }}
        >
          {product.description}
        </p>

        {/* price + button row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "0.75rem",
            gap: "0.75rem",
          }}
        >
          <span
            style={{
              fontSize: "1.05rem",
              fontWeight: 600,
              color: "#2F3A33",
              letterSpacing: "0.01em",
            }}
          >
            ฿{product.price}
          </span>

          <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
            <motion.button
              whileHover={{ background: "#0F6E56", color: "#FBF5DD", borderColor: "#0F6E56" }}
              transition={{ duration: 0.2 }}
              style={{
                height: 38,
                padding: "0 1.25rem",
                borderRadius: 40,
                border: "1px solid #D8D8D8",
                background: "#FFFFFF",
                color: "#2F3A33",
                cursor: "pointer",
                fontSize: "0.78rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}