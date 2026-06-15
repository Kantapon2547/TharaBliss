"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
  };
}

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      style={{
        background: "#fff",
        borderRadius: "24px",
        overflow: "hidden",
        border: "1px solid #ECECEC",
        boxShadow: "0 10px 30px rgba(0,0,0,.06)",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          position: "relative",
          height: "280px",
          overflow: "hidden",
        }}
      >
        {product.image ? (
          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: 0.4,
            }}
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{
                objectFit: "cover",
              }}
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
              background: "#f5f5f5",
              color: "#999",
            }}
          >
            No Image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "1.5rem",
        }}
      >
        {/* Green Accent Line */}
        <div
          style={{
            width: "42px",
            height: "2px",
            background: "#72C39B",
            marginBottom: "12px",
          }}
        />

        {/* Category */}
        <p
          style={{
            color: "#72C39B",
            fontSize: "11px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginBottom: "10px",
          }}
        >
          {product.category?.name || "Recommended"}
        </p>

        {/* Product Name */}
        <h3
          style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            color: "#222",
            marginBottom: "10px",
          }}
        >
          {product.name}
        </h3>

        {/* Description */}
        <p
          style={{
            color: "#888",
            lineHeight: 1.7,
            fontSize: "14px",
            minHeight: "48px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </p>

        {/* Price */}
        <div
          style={{
            marginTop: "1rem",
            fontWeight: 600,
            color: "#2F3A33",
            fontSize: "1rem",
          }}
        >
          ฿{product.price}
        </div>

        {/* Details Button */}
        <div
          style={{
            marginTop: "1.5rem",
          }}
        >
          <Link
            href={`/products/${product.id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <motion.button
              whileHover={{
                backgroundColor: "#0F6E56",
                color: "#ffffff",
                borderColor: "#0F6E56",
              }}
              transition={{
                duration: 0.25,
              }}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "999px",
                border: "1px solid #D8D8D8",
                background: "#ffffff",
                color: "#333",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}