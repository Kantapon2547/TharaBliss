"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";

const PRODUCTS = [
  {
    id: 1,
    name: "THARA BLISS AROMA BALM",
    category: "Perfume Balm",
    image: "/images/products/aroma-balm.jpg",
    description:
      "พกพาความสงบไปได้ทุกที่ พร้อมกลิ่นหอมที่ช่วยเติมความสดชื่นและผ่อนคลาย",
  },
  {
    id: 2,
    name: "Lavender Room Spray",
    category: "Room Spray",
    image: "/images/products/room-spray.jpg",
    description:
      "สร้างบรรยากาศแห่งความสงบภายในบ้านด้วยกลิ่นหอมอ่อนโยน",
  },
  {
    id: 3,
    name: "Rose Room Spray",
    category: "Room Spray",
    image: "/images/products/rose-room-spray.jpg",
    description:
      "เติมความสดชื่นและความหรูหราให้ทุกมุมของบ้าน",
  },
  {
    id: 4,
    name: "Wedding Favor Balm",
    category: "Favors & Custom",
    image: "/images/products/favor-balm.jpg",
    description:
      "ของชำร่วยสั่งทำพิเศษสำหรับงานแต่งและโอกาสสำคัญ",
  },
  {
    id: 5,
    name: "Corporate Gift Set",
    category: "Favors & Custom",
    image: "/images/products/corporate-gift.jpg",
    description:
      "ชุดของขวัญพรีเมียมสำหรับองค์กรและกิจกรรมพิเศษ",
  },
];

const CATEGORIES = [
  "All",
  "Perfume Balm",
  "Room Spray",
  "Favors & Custom",
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* Hero */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "5rem 2rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#6E7C72",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            Product Collection
          </p>

          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 300,
              color: "#2F3A33",
              marginTop: "1rem",
            }}
          >
            Explore Our Products
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "1.5rem auto 0",
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            Discover premium fragrances, room sprays, custom gifts, and
            wellness products crafted with care and elegance.
          </p>
        </section>

        {/* Search + Filter */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "3rem 2rem 1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: 1,
                minWidth: "280px",
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid #E5E5E5",
                background: "#fff",
                outline: "none",
              }}
            />

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value)
              }
              style={{
                padding: "14px 16px",
                borderRadius: "12px",
                border: "1px solid #E5E5E5",
                background: "#fff",
                minWidth: "220px",
                color: "#2F3A33",
              }}
            >
              {CATEGORIES.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Products */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "2rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "2rem",
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  overflow: "hidden",
                  border: "1px solid #F1EFE9",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "320px",
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
                </div>

                <div
                  style={{
                    padding: "1.5rem",
                  }}
                >
                  <p
                    style={{
                      color: "#0F6E56",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {product.category}
                  </p>

                  <h3
                    style={{
                      color: "#2F3A33",
                      marginTop: "0.5rem",
                      marginBottom: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: "#666",
                      lineHeight: 1.7,
                      fontSize: "14px",
                    }}
                  >
                    {product.description}
                  </p>

                  <button
                    style={{
                      marginTop: "1.25rem",
                      width: "100%",
                      padding: "12px",
                      background: "#0F6E56",
                      color: "#fff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    View Product
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "4rem",
                color: "#777",
              }}
            >
              No products found.
            </div>
          )}
        </section>
      </main>
    </>
  );
}