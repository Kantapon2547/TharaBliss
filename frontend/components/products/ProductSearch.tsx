"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/api";
import ProductCard from "./ProductCard";

interface ProductSearchProps {
  products: Product[];
}

const SCENT_OPTIONS = [
  "ทุกกลิ่น",
  "Thara Mist",
  "Poised Pear & Freesia",
  "Aqua No.1",
  "Box Set",
  "Trio Set",
];

const SORT_OPTIONS = [
  { label: "ตามหมวดหมู่", value: "default" },
  { label: "ชื่อ A–Z", value: "name-asc" },
  { label: "ชื่อ Z–A", value: "name-desc" },
  { label: "ราคาต่ำ–สูง", value: "price-asc" },
  { label: "ราคาสูง–ต่ำ", value: "price-desc" },
];

export default function ProductSearch({ products }: ProductSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedScent, setSelectedScent] = useState("ทุกกลิ่น");
  const [sort, setSort] = useState("default");

  const filtered = useMemo(() => {
    let result = [...products];

    // Text filter
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.scent.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Scent filter
    if (selectedScent !== "ทุกกลิ่น") {
      result = result.filter((p) => p.scent === selectedScent);
    }

    // Sort
    if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "name-desc") result.sort((a, b) => b.name.localeCompare(a.name));
    else if (sort === "price-asc")
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    else if (sort === "price-desc")
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

    return result;
  }, [products, query, selectedScent, sort]);

  const hasActive = query.trim() || selectedScent !== "ทุกกลิ่น" || sort !== "default";

  const clearAll = () => {
    setQuery("");
    setSelectedScent("ทุกกลิ่น");
    setSort("default");
  };

  return (
    <div>
      <style>{`
        .ps-bar {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        /* Search input wrapper */
        .ps-input-wrap {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .ps-input-wrap svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          color: #B0A898;
        }
        .ps-input {
          width: 100%;
          height: 42px;
          border: 1px solid #EFEAE1;
          border-radius: 10px;
          padding: 0 14px 0 40px;
          font-size: 0.88rem;
          color: #2F3A33;
          background: #FFFFFF;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          box-sizing: border-box;
        }
        .ps-input::placeholder { color: #B0A898; }
        .ps-input:focus {
          border-color: #0F6E56;
          box-shadow: 0 0 0 3px rgba(15,110,86,0.08);
        }

        /* Dropdowns */
        .ps-select {
          height: 42px;
          border: 1px solid #EFEAE1;
          border-radius: 10px;
          padding: 0 36px 0 14px;
          font-size: 0.88rem;
          color: #2F3A33;
          background: #FFFFFF url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B0A898' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat calc(100% - 12px) center;
          appearance: none;
          -webkit-appearance: none;
          outline: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: inherit;
          white-space: nowrap;
        }
        .ps-select:focus {
          border-color: #0F6E56;
          box-shadow: 0 0 0 3px rgba(15,110,86,0.08);
        }
        .ps-select.active {
          border-color: #0F6E56;
          color: #0F6E56;
          background-color: #F0F8F5;
        }

        /* Clear button */
        .ps-clear {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          height: 42px;
          padding: 0 14px;
          border: 1px solid #EFEAE1;
          border-radius: 10px;
          background: transparent;
          color: #999;
          font-size: 0.82rem;
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          font-family: inherit;
          white-space: nowrap;
        }
        .ps-clear:hover { border-color: #0F6E56; color: #0F6E56; }

        /* Result count */
        .ps-count {
          font-size: 0.82rem;
          color: #aaa;
          margin-bottom: 2.5rem;
          margin-top: -1rem;
        }
        .ps-count strong { color: #2F3A33; font-weight: 500; }

        /* Empty state */
        .ps-empty {
          text-align: center;
          padding: 4rem 2rem;
          color: #aaa;
        }
        .ps-empty p { font-size: 0.9rem; margin-top: 0.75rem; }

        /* Grid */
        .ps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        @media (max-width: 480px) {
          .ps-grid { grid-template-columns: 1fr !important; }
          .ps-bar { flex-direction: column; align-items: stretch; }
          .ps-input-wrap { min-width: unset; }
        }
      `}</style>

      {/* ── Search Bar ── */}
      <div className="ps-bar">
        {/* Text search */}
        <div className="ps-input-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id="product-search-input"
            className="ps-input"
            type="text"
            placeholder="ค้นหากลิ่นหอม..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        {/* Scent filter */}
        <select
          id="product-scent-filter"
          className={`ps-select${selectedScent !== "ทุกกลิ่น" ? " active" : ""}`}
          value={selectedScent}
          onChange={(e) => setSelectedScent(e.target.value)}
          aria-label="Filter by scent"
        >
          {SCENT_OPTIONS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          id="product-sort-select"
          className={`ps-select${sort !== "default" ? " active" : ""}`}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        {/* Clear all — only visible when a filter is active */}
        {hasActive && (
          <button className="ps-clear" onClick={clearAll} type="button" id="product-search-clear">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            ล้างตัวกรอง
          </button>
        )}
      </div>

      {/* ── Result count ── */}
      <p className="ps-count">
        แสดง <strong>{filtered.length}</strong> / {products.length} สินค้า
        {hasActive && <> · <button style={{ background: "none", border: "none", color: "#0F6E56", cursor: "pointer", fontSize: "inherit", padding: 0, fontFamily: "inherit" }} onClick={clearAll}>รีเซ็ต</button></>}
      </p>

      {/* ── Product Grid ── */}
      {filtered.length === 0 ? (
        <div className="ps-empty">
          <span style={{ fontSize: "2.5rem" }}>🔍</span>
          <p>ไม่พบสินค้าที่ตรงกับการค้นหา</p>
          <button
            onClick={clearAll}
            style={{
              marginTop: "1rem",
              border: "1px solid #0F6E56",
              color: "#0F6E56",
              background: "transparent",
              padding: "0.6rem 1.5rem",
              borderRadius: 40,
              fontSize: "0.82rem",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "0.08em",
            }}
          >
            ดูสินค้าทั้งหมด
          </button>
        </div>
      ) : (
        <div className="ps-grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
