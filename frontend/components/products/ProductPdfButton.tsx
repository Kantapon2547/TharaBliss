"use client";

import { Product } from "@/lib/api";

interface ProductPdfButtonProps {
  product: Product;
}

export default function ProductPdfButton({ product }: ProductPdfButtonProps) {
  const handleDownload = () => {
    // Build the print window content
    const fragranceRows =
      product.fragrance_notes && product.fragrance_notes.length > 0
        ? product.fragrance_notes
            .map(
              (note) =>
                `<tr>
                  <td class="label">${note.label}</td>
                  <td class="value">${note.notes}</td>
                </tr>`
            )
            .join("")
        : "";

    const sizesRows =
      product.sizes && product.sizes.length > 0
        ? product.sizes
            .map(
              (s) =>
                `<tr>
                  <td class="label">${s.label}</td>
                  <td class="value">฿${s.price}</td>
                </tr>`
            )
            .join("")
        : `<tr><td class="label">ราคา</td><td class="value">฿${product.price}</td></tr>`;

    const imageHtml = product.image
      ? `<img src="${product.image}" alt="${product.name}" class="product-image" />`
      : "";

    const html = `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8" />
  <title>${product.name} — Thara Bliss</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #2F3A33;
      background: #FFFFFF;
      padding: 40px 48px;
      max-width: 760px;
      margin: 0 auto;
    }

    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 20px;
      border-bottom: 1.5px solid #0F6E56;
      margin-bottom: 28px;
    }
    .brand { font-size: 22px; font-weight: 300; color: #0F6E56; letter-spacing: 0.04em; }
    .brand span { display: block; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: #aaa; margin-top: 2px; }
    .date { font-size: 10px; color: #aaa; text-align: right; }

    /* Image + meta row */
    .top-row {
      display: flex;
      gap: 28px;
      align-items: flex-start;
      margin-bottom: 28px;
    }
    .product-image {
      width: 200px;
      height: 200px;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid #EFEAE1;
      flex-shrink: 0;
    }
    .meta { flex: 1; }
    .category-tag {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: #0F6E56;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 26px;
      font-weight: 300;
      line-height: 1.2;
      color: #2F3A33;
      margin-bottom: 10px;
    }
    .scent-pill {
      display: inline-block;
      background: #FBF5DD;
      border: 0.5px solid #e8e0c8;
      border-radius: 4px;
      padding: 3px 10px;
      font-size: 11px;
      color: #2F3A33;
      font-style: italic;
      margin-bottom: 12px;
    }
    .description {
      font-size: 12px;
      line-height: 1.8;
      color: #666;
    }

    /* Tables */
    .section { margin-bottom: 22px; }
    .section-title {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #0F6E56;
      margin-bottom: 10px;
      padding-bottom: 6px;
      border-bottom: 1px solid #EFEAE1;
    }
    table { width: 100%; border-collapse: collapse; }
    td {
      font-size: 12px;
      padding: 6px 0;
      vertical-align: top;
      border-bottom: 0.5px solid #F2EDE5;
      line-height: 1.6;
    }
    td:last-child { border-bottom: none; }
    td.label {
      color: #aaa;
      width: 140px;
      flex-shrink: 0;
      padding-right: 12px;
    }
    td.value { color: #2F3A33; }

    /* Text sections */
    .text-block {
      font-size: 12px;
      line-height: 1.85;
      color: #555;
      white-space: pre-line;
    }

    /* Footer */
    .footer {
      margin-top: 36px;
      padding-top: 16px;
      border-top: 0.5px solid #EFEAE1;
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #ccc;
      letter-spacing: 0.08em;
    }

    @media print {
      body { padding: 24px 32px; }
    }
  </style>
</head>
<body>
  <!-- Header -->
  <div class="header">
    <div>
      <div class="brand">Thara Bliss 🌿<span>Product Information Sheet</span></div>
    </div>
    <div class="date">สร้างเมื่อ: ${new Date().toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}</div>
  </div>

  <!-- Top row: image + meta -->
  <div class="top-row">
    ${imageHtml}
    <div class="meta">
      <p class="category-tag">${product.category?.name || "Aroma Balm"}</p>
      <h1>${product.name}</h1>
      <span class="scent-pill">Scent · ${product.scent}</span>
      <p class="description">${product.description || ""}</p>
    </div>
  </div>

  <!-- Pricing & Sizes -->
  <div class="section">
    <p class="section-title">ราคา</p>
    <table><tbody>${sizesRows}</tbody></table>
  </div>

  ${
    fragranceRows
      ? `<!-- Fragrance Notes -->
  <div class="section">
    <p class="section-title">Fragrance Notes</p>
    <table><tbody>${fragranceRows}</tbody></table>
  </div>`
      : ""
  }

  ${
    product.how_to_use
      ? `<!-- How to Use -->
  <div class="section">
    <p class="section-title">วิธีใช้</p>
    <p class="text-block">${product.how_to_use}</p>
  </div>`
      : ""
  }

  ${
    product.ingredients
      ? `<!-- Ingredients -->
  <div class="section">
    <p class="section-title">ส่วนผสม</p>
    <p class="text-block">${product.ingredients}</p>
  </div>`
      : ""
  }

  <!-- Footer -->
  <div class="footer">
    <span>Thara Bliss · Refresh Your Senses. Relax Your Mind.</span>
    <span>tharabliss2025@gmail.com</span>
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank", "width=820,height=900");
    if (!printWindow) {
      alert("กรุณาอนุญาต popup เพื่อดาวน์โหลด PDF");
      return;
    }
    printWindow.document.write(html);
    printWindow.document.close();

    // Wait for images to load before printing
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 350);
    };
  };

  return (
    <>
      <style>{`
        .pdf-btn {
          width: 100%;
          padding: 13px 1.5rem;
          border: 1px solid #EFEAE1;
          border-radius: 10px;
          background: #FFFFFF;
          color: #2F3A33;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 400;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          font-family: inherit;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .pdf-btn:hover {
          background: #F5F2EB;
          border-color: #C8C2B6;
          color: #0F6E56;
        }
        .pdf-btn:active { transform: scale(0.985); }
      `}</style>

      <button
        id="download-pdf-btn"
        className="pdf-btn"
        onClick={handleDownload}
        type="button"
        aria-label="Download product information as PDF"
      >
        {/* PDF / download icon */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download PDF
      </button>
    </>
  );
}
