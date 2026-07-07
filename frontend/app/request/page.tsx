"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { FaInstagram, FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";
import SocialIcons from "../../components/SocialLinks";
import DecoratedBackground from "@/components/DecoratedBackground";

const ITEM_OPTIONS = [
  { id: "aroma-balm", label: "Aroma Balm", desc: "Solid balm for pulse points" },
  { id: "room-spray", label: "Room Spray", desc: "Linen & air mist" },
  { id: "candle", label: "Scented Candle", desc: "Soy wax, 40hr burn" },
  { id: "bath-salts", label: "Bath Salts", desc: "Mineral soak, 250g" },
];

const OCCASIONS = [
  "Birthday",
  "Anniversary",
  "Wedding",
  "Thank You",
  "Get Well Soon",
  "Just Because",
  "Other",
];

const BUDGETS = [
  { id: "under-500", label: "Under ฿500" },
  { id: "500-1000", label: "฿500 – ฿1,000" },
  { id: "1000-2000", label: "฿1,000 – ฿2,000" },
  { id: "2000-plus", label: "฿2,000+" },
];

const WRAP_STYLES = [
  { id: "classic", label: "Classic", desc: "Kraft box, twine bow", accent: "#C7B08A" },
  { id: "premium", label: "Premium", desc: "Linen box, wax seal", accent: "#0F6E56" },
  { id: "eco", label: "Eco", desc: "Recycled box, dried florals", accent: "#7C8B6F" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  occasion: string;
  deliveryDate: string;
  items: string[];
  budget: string;
  wrapStyle: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  phone: "",
  recipientName: "",
  occasion: "",
  deliveryDate: "",
  items: [],
  budget: "",
  wrapStyle: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const MESSAGE_LIMIT = 300;

export default function SpecialGiftRequestPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleItem = (id: string) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.includes(id)
        ? prev.items.filter((i) => i !== id)
        : [...prev.items, id],
    }));
    if (errors.items) setErrors((prev) => ({ ...prev, items: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "That email doesn't look right.";
    }
    if (!form.recipientName.trim()) next.recipientName = "Who is this gift for?";
    if (!form.occasion) next.occasion = "Please choose an occasion.";
    if (form.items.length === 0) next.items = "Pick at least one item.";
    if (!form.budget) next.budget = "Please choose a budget range.";
    if (!form.wrapStyle) next.wrapStyle = "Please choose a wrap style.";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (err) {
      console.error("Gift request submission error:", err);
      setStatus("error");
    }
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <>
        <Navbar />
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
            <DecoratedBackground />
          </div>
          <div className="tg-page" style={{ position: "relative", zIndex: 1 }}>
            <div className="tg-success">
              <div className="tg-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h1>Request received</h1>
              <p>
                Thank you, {form.name.split(" ")[0] || "friend"} — we've got your special gift
                request for {form.recipientName || "your recipient"}. Our team will reach out at{" "}
                <strong>{form.email}</strong> within 1–2 business days to confirm details and pricing.
              </p>
              <div className="tg-success-actions">
                <button className="tg-btn tg-btn-primary" onClick={handleReset}>
                  Create another request
                </button>
                <Link href="/products" className="tg-btn tg-btn-ghost">
                  Back to Products
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer
          style={{
            background: "#2F3A33",
            color: "#FBF5DD",
            padding: "4rem 8vw 2.5rem",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              gap: "3rem",
              paddingBottom: "3rem",
              borderBottom: "1px solid rgba(251,245,221,0.1)",
            }}
          >
            <div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: "0.75rem" }}>
                Thara Bliss
              </h3>
              <p style={{ color: "rgba(251,245,221,0.5)", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 280 }}>
                ไม่ใช่แค่ความหอม แต่คือการดูแลอารมณ์และจิตใจในทุกวัน — เลือกกลิ่นที่สะท้อนตัวตนและอยู่กับคุณในทุกช่วงเวลา
              </p>
            </div>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
                Explore
              </p>
              {["Products", "About", "Journal", "Help-Center"].map((link) => (
                <a key={link} href={`/${link.toLowerCase()}`} style={{ display: "block", color: "rgba(251,245,221,0.7)", textDecoration: "none", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
                Follow Us
              </p>
              <SocialIcons />
            </div>
          </div>
          <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>© 2026 Thara Bliss. All rights reserved.</p>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>Calm. Balance. Bliss.</p>
          </div>
        </footer>

        <StyleBlock />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          <DecoratedBackground />
        </div>
        <div className="tg-page" style={{ position: "relative", zIndex: 1 }}>
          <div className="tg-header">
            <div className="tg-header-row">
              <div>
                <p className="tg-eyebrow">Special Gift</p>
                <h1>Create a Special Gift</h1>
              </div>
              <div className="tg-header-actions">
                <a href="https://shorturl.at/AfAPc" target="_blank" rel="noopener noreferrer" className="tg-icon-btn" aria-label="Instagram">
                  <FaInstagram size={15} />
                </a>
                <a href="https://shorturl.at/BJPYF" target="_blank" rel="noopener noreferrer" className="tg-icon-btn" aria-label="Facebook">
                  <FaFacebook size={15} />
                </a>
                <a href="https://www.tiktok.com/@tharabliss?_r=1&_t=ZS-975GjfaqjAe" target="_blank" rel="noopener noreferrer" className="tg-icon-btn" aria-label="TikTok">
                  <FaTiktok size={15} />
                </a>
              </div>
            </div>
            <p className="tg-subtext">
              Build a one-of-a-kind gift from Thara Bliss — pick the items, the wrap, and add a
              personal note. We'll take care of the rest.
            </p>
          </div>

          <form className="tg-form" onSubmit={handleSubmit} noValidate>
        {/* SECTION: Your details */}
        <section className="tg-section">
          <h2>Your details</h2>
          <div className="tg-grid-2">
            <Field label="Your name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Jane Doe"
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="jane@email.com"
              />
            </Field>
          </div>
          <Field label="Phone (optional)">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="08x-xxx-xxxx"
            />
          </Field>
        </section>

        {/* SECTION: Recipient & occasion */}
        <section className="tg-section">
          <h2>Who's it for?</h2>
          <div className="tg-grid-2">
            <Field label="Recipient's name" error={errors.recipientName}>
              <input
                type="text"
                value={form.recipientName}
                onChange={(e) => update("recipientName", e.target.value)}
                placeholder="Who's receiving this?"
              />
            </Field>
            <Field label="Occasion" error={errors.occasion}>
              <select value={form.occasion} onChange={(e) => update("occasion", e.target.value)}>
                <option value="">Select an occasion</option>
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Preferred delivery date (optional)">
            <input
              type="date"
              value={form.deliveryDate}
              onChange={(e) => update("deliveryDate", e.target.value)}
            />
          </Field>
        </section>

        {/* SECTION: Build the gift */}
        <section className="tg-section">
          <h2>Choose your items</h2>
          {errors.items && <p className="tg-error-text">{errors.items}</p>}
          <div className="tg-item-grid">
            {ITEM_OPTIONS.map((item) => {
              const checked = form.items.includes(item.id);
              return (
                <button
                  type="button"
                  key={item.id}
                  className={`tg-item-card ${checked ? "is-checked" : ""}`}
                  onClick={() => toggleItem(item.id)}
                  aria-pressed={checked}
                >
                  <span className="tg-item-check">
                    {checked && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span>
                    <span className="tg-item-label">{item.label}</span>
                    <span className="tg-item-desc">{item.desc}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* SECTION: Budget */}
        <section className="tg-section">
          <h2>Budget range</h2>
          {errors.budget && <p className="tg-error-text">{errors.budget}</p>}
          <div className="tg-pill-row">
            {BUDGETS.map((b) => (
              <button
                type="button"
                key={b.id}
                className={`tg-pill ${form.budget === b.id ? "is-active" : ""}`}
                onClick={() => update("budget", b.id)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </section>

        {/* SECTION: Wrap style */}
        <section className="tg-section">
          <h2>Wrap style</h2>
          {errors.wrapStyle && <p className="tg-error-text">{errors.wrapStyle}</p>}
          <div className="tg-wrap-grid">
            {WRAP_STYLES.map((w) => (
              <button
                type="button"
                key={w.id}
                className={`tg-wrap-card ${form.wrapStyle === w.id ? "is-active" : ""}`}
                onClick={() => update("wrapStyle", w.id)}
                style={{ "--accent": w.accent } as React.CSSProperties}
              >
                <span className="tg-wrap-dot" />
                <span className="tg-wrap-label">{w.label}</span>
                <span className="tg-wrap-desc">{w.desc}</span>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION: Personal message */}
        <section className="tg-section">
          <h2>Personal message (optional)</h2>
          <Field label="">
            <textarea
              value={form.message}
              maxLength={MESSAGE_LIMIT}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Write a short note to include with the gift..."
              rows={4}
            />
          </Field>
          <p className="tg-char-count">{form.message.length}/{MESSAGE_LIMIT}</p>
        </section>

        {status === "error" && (
          <p className="tg-error-text tg-error-banner">
            Something went wrong sending your request. Please try again, or reach us directly.
          </p>
        )}

        <button type="submit" className="tg-btn tg-btn-primary tg-submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending..." : "Submit Request"}
        </button>
          </form>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#2F3A33",
          color: "#FBF5DD",
          padding: "4rem 8vw 2.5rem",
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: "3rem",
            paddingBottom: "3rem",
            borderBottom: "1px solid rgba(251,245,221,0.1)",
          }}
        >
          <div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: "0.75rem" }}>
              Thara Bliss
            </h3>
            <p style={{ color: "rgba(251,245,221,0.5)", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: 280 }}>
              ไม่ใช่แค่ความหอม แต่คือการดูแลอารมณ์และจิตใจในทุกวัน — เลือกกลิ่นที่สะท้อนตัวตนและอยู่กับคุณในทุกช่วงเวลา
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
              Explore
            </p>
            {["Products", "About", "Journal", "Help-Center"].map((link) => (
              <a key={link} href={`/${link.toLowerCase()}`} style={{ display: "block", color: "rgba(251,245,221,0.7)", textDecoration: "none", fontSize: "0.9rem", marginBottom: "0.6rem" }}>
                {link}
              </a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.4, marginBottom: "1.2rem" }}>
              Follow Us
            </p>
            <SocialIcons />
          </div>
        </div>
        <div style={{ paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>© 2026 Thara Bliss. All rights reserved.</p>
          <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>Calm. Balance. Bliss.</p>
        </div>
      </footer>

      <StyleBlock />
    </>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="tg-field">
      {label && <span className="tg-field-label">{label}</span>}
      {children}
      {error && <span className="tg-error-text">{error}</span>}
    </label>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .tg-page {
        max-width: 760px;
        margin: 0 auto;
        padding: 3rem 6vw 5rem;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #2F3A33;
      }
      .tg-eyebrow {
        font-size: 0.72rem;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #0F6E56;
        font-weight: 600;
        margin: 0 0 0.5rem;
      }
      .tg-header h1 {
        font-size: clamp(1.8rem, 4vw, 2.4rem);
        font-weight: 400;
        margin: 0 0 0.75rem;
        color: #2F3A33;
      }
      .tg-subtext {
        font-size: 0.95rem;
        line-height: 1.65;
        color: #6B7268;
        max-width: 520px;
        margin: 0 0 2.5rem;
      }

      .tg-form { display: flex; flex-direction: column; gap: 2rem; }
      .tg-section {
        background: #FFFFFF;
        border: 1px solid #EFEAE1;
        border-radius: 18px;
        padding: 1.75rem;
      }
      .tg-section h2 {
        font-size: 1.05rem;
        font-weight: 500;
        margin: 0 0 1.1rem;
        color: #2F3A33;
      }

      .tg-grid-2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        margin-bottom: 1rem;
      }

      .tg-field { display: flex; flex-direction: column; gap: 0.4rem; }
      .tg-field-label { font-size: 0.82rem; color: #555; font-weight: 500; }

      .tg-field input,
      .tg-field select,
      .tg-field textarea {
        font-family: inherit;
        font-size: 0.9rem;
        color: #2F3A33;
        background: #F5F2EB;
        border: 1px solid #EFEAE1;
        border-radius: 12px;
        padding: 0.7rem 0.9rem;
        outline: none;
        transition: border-color 0.15s, background 0.15s;
        resize: vertical;
      }
      .tg-field input:focus,
      .tg-field select:focus,
      .tg-field textarea:focus {
        border-color: #0F6E56;
        background: #fff;
      }

      .tg-char-count {
        text-align: right;
        font-size: 0.72rem;
        color: #999;
        margin: 0.35rem 0 0;
      }

      .tg-error-text {
        font-size: 0.78rem;
        color: #C0453A;
        margin: 0;
      }
      .tg-error-banner {
        background: #FBEAE8;
        border: 1px solid #F0C6C1;
        border-radius: 12px;
        padding: 0.75rem 1rem;
      }

      /* Item selection cards */
      .tg-item-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.75rem;
      }
      .tg-item-card {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-align: left;
        background: #F5F2EB;
        border: 1px solid #EFEAE1;
        border-radius: 14px;
        padding: 0.85rem 1rem;
        cursor: pointer;
        font-family: inherit;
        transition: border-color 0.15s, background 0.15s;
      }
      .tg-item-card:hover { border-color: #B9D8CC; }
      .tg-item-card.is-checked {
        background: #EAF3EC;
        border-color: #0F6E56;
      }
      .tg-item-check {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        border-radius: 6px;
        border: 1.5px solid #C9C2B2;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
      }
      .tg-item-card.is-checked .tg-item-check {
        background: #0F6E56;
        border-color: #0F6E56;
      }
      .tg-item-label {
        display: block;
        font-size: 0.88rem;
        font-weight: 500;
        color: #2F3A33;
      }
      .tg-item-desc {
        display: block;
        font-size: 0.76rem;
        color: #8A8F86;
        margin-top: 2px;
      }

      /* Budget pills */
      .tg-pill-row { display: flex; flex-wrap: wrap; gap: 0.6rem; }
      .tg-pill {
        font-family: inherit;
        font-size: 0.85rem;
        padding: 0.55rem 1.1rem;
        border-radius: 40px;
        border: 1px solid #EFEAE1;
        background: #F5F2EB;
        color: #555;
        cursor: pointer;
        transition: background 0.15s, border-color 0.15s, color 0.15s;
      }
      .tg-pill:hover { border-color: #B9D8CC; }
      .tg-pill.is-active {
        background: #0F6E56;
        border-color: #0F6E56;
        color: #FBF5DD;
      }

      /* Wrap style cards */
      .tg-wrap-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.75rem;
      }
      .tg-wrap-card {
        --accent: #0F6E56;
        font-family: inherit;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.3rem;
        background: #F5F2EB;
        border: 1px solid #EFEAE1;
        border-radius: 14px;
        padding: 1rem;
        cursor: pointer;
        text-align: left;
        transition: border-color 0.15s, background 0.15s;
      }
      .tg-wrap-card:hover { border-color: #B9D8CC; }
      .tg-wrap-card.is-active {
        border-color: var(--accent);
        background: #fff;
        box-shadow: 0 0 0 1px var(--accent);
      }
      .tg-wrap-dot {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: var(--accent);
      }
      .tg-wrap-label { font-size: 0.88rem; font-weight: 500; color: #2F3A33; }
      .tg-wrap-desc { font-size: 0.76rem; color: #8A8F86; }

      /* Buttons */
      .tg-btn {
        font-family: inherit;
        font-size: 0.85rem;
        letter-spacing: 0.04em;
        text-decoration: none;
        border-radius: 40px;
        padding: 0.85rem 1.75rem;
        border: none;
        cursor: pointer;
        text-align: center;
        transition: background 0.18s, transform 0.15s, opacity 0.15s;
      }
      .tg-btn-primary {
        background: #0F6E56;
        color: #FBF5DD;
      }
      .tg-btn-primary:hover:not(:disabled) {
        background: #0a5240;
        transform: translateY(-1px);
      }
      .tg-btn-primary:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .tg-btn-ghost {
        background: transparent;
        color: #0F6E56;
        border: 1px solid #0F6E56;
        display: inline-block;
      }
      .tg-btn-ghost:hover {
        background: #EAF3EC;
      }
      .tg-submit {
        align-self: flex-start;
      }

      /* Success state */
      .tg-success {
        max-width: 480px;
        margin: 5rem auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
      }
      .tg-success-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #0F6E56;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.5rem;
      }
      .tg-success h1 {
        font-size: 1.6rem;
        font-weight: 400;
        margin: 0 0 0.5rem;
      }
      .tg-success p {
        font-size: 0.92rem;
        line-height: 1.65;
        color: #6B7268;
        margin: 0 0 1.5rem;
      }
      .tg-success-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        justify-content: center;
      }

      .tg-header-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
      }
      .tg-header-actions {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-shrink: 0;
      }
      .tg-icon-btn,
      .tg-cart-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: background 0.15s, transform 0.15s, color 0.15s;
      }
      .tg-icon-btn {
        background: #F5F2EB;
        border: 1px solid #EFEAE1;
        color: #0F6E56;
      }
      .tg-icon-btn:hover {
        background: #EAF3EC;
        transform: translateY(-1px);
      }
      .tg-cart-btn {
        background: #0F6E56;
        color: #FBF5DD;
      }
      .tg-cart-btn:hover {
        background: #0a5240;
        transform: translateY(-1px);
      }

      @media (max-width: 640px) {
        .tg-grid-2 { grid-template-columns: 1fr; }
        .tg-item-grid { grid-template-columns: 1fr; }
        .tg-wrap-grid { grid-template-columns: 1fr; }
        .tg-submit { align-self: stretch; }
      }
    `}</style>
  );
}