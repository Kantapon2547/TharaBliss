"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { FaInstagram, FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";
import SocialIcons from "../../components/layout/SocialLinks";
import DecoratedBackground from "@/components/layout/DecoratedBackground";

const ITEM_OPTIONS = [
  { id: "aroma-balm", label: "Aroma Balm", desc: "Solid balm for pulse points" },
  { id: "room-spray", label: "Room Spray", desc: "Linen & air mist" },
  { id: "candle", label: "Scented Candle", desc: "Soy wax, 40hr burn" },
  { id: "bath-salts", label: "Bath Salts", desc: "Mineral soak, 250g" },
];

const CUSTOM_ITEM_ID = "custom-item";
const CUSTOM_BUDGET_ID = "custom-budget";
const CUSTOM_ITEM_LIMIT = 100;

const OCCASIONS = [
  "วันเกิด",
  "วันครบรอบ",
  "งานแต่งงาน",
  "คำขอบคุณ",
  "โอกาสพิเศษ",
  "อื่นๆ",
];

const BUDGETS = [
  { id: "under-500", label: "ต่ำกว่า ฿500" },
  { id: "500-1000", label: "฿500 – ฿1,000" },
  { id: "1000-2000", label: "฿1,000 – ฿2,000" },
  { id: "2000-plus", label: "฿2,000 ขึ้นไป" },
];

const WRAP_STYLES = [
  { id: "classic", label: "สไตล์คลาสสิก", desc: "กล่องคราฟท์ ผูกโบว์เชือกปอ", accent: "#C7B08A" },
  { id: "premium", label: "สไตล์พรีเมี่ยม", desc: "กล่องผ้าลินิน ปิดผนึกด้วยขี้ผึ้ง", accent: "#0F6E56" },
  { id: "eco", label: "สไตล์อีโค่", desc: "กล่องรีไซเคิล ตกแต่งด้วยดอกไม้แห้ง", accent: "#7C8B6F" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  occasion: string;
  deliveryDate: string;
  items: string[];
  customItemText: string;
  budget: string;
  customBudgetText: string;
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
  customItemText: "",
  budget: "",
  customBudgetText: "",
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

  const isCustomItemSelected = form.items.includes(CUSTOM_ITEM_ID);
  const isCustomBudgetSelected = form.budget === CUSTOM_BUDGET_ID;

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.name.trim()) next.name = "กรุณากรอกชื่อของคุณ";
    if (!form.email.trim()) {
      next.email = "กรุณากรอกอีเมลของคุณ";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "อีเมลไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
    }
    if (!form.recipientName.trim()) next.recipientName = "กรุณากรอกชื่อผู้รับของขวัญ";
    if (!form.occasion) next.occasion = "กรุณาเลือกโอกาสพิเศษ";
    if (form.items.length === 0) next.items = "กรุณาเลือกอย่างน้อย 1 รายการ";
    if (form.items.includes(CUSTOM_ITEM_ID) && !form.customItemText.trim()) {
      next.customItemText = "กรุณาระบุของขวัญที่ต้องการ";
    }
    if (!form.budget) next.budget = "กรุณาเลือกช่วงงบประมาณ";
    if (form.budget === CUSTOM_BUDGET_ID && !form.customBudgetText.trim()) {
      next.customBudgetText = "กรุณาระบุงบประมาณที่ต้องการ";
    }
    if (!form.wrapStyle) next.wrapStyle = "กรุณาเลือกรูปแบบการห่อของขวัญ";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const payload = {
        ...form,
        // Resolve the human-readable values so the backend/email doesn't
        // need to know about the "custom" sentinel ids.
        items: form.items.map((id) =>
          id === CUSTOM_ITEM_ID ? `อื่นๆ: ${form.customItemText.trim()}` : id
        ),
        budget:
          form.budget === CUSTOM_BUDGET_ID
            ? `อื่นๆ: ${form.customBudgetText.trim()}`
            : form.budget,
      };

      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
                ขอบคุณค่ะ {form.name.split(" ")[0] || "คุณลูกค้า"} — เราได้รับคำขอสร้างของขวัญพิเศษ
                สำหรับ {form.recipientName || "ผู้รับของคุณ"} เรียบร้อยแล้ว ทีมงานของเราจะติดต่อกลับไปที่{" "}
                <strong>{form.email}</strong> ภายใน 1–2 วันทำการ เพื่อยืนยันรายละเอียดและราคาค่ะ
              </p>
              <div className="tg-success-actions">
                <button className="tg-btn tg-btn-primary" onClick={handleReset}>
                  สร้างคำขอใหม่อีกครั้ง
                </button>
                <Link href="/products" className="tg-btn tg-btn-ghost">
                  กลับไปหน้าสินค้า
                </Link>
              </div>
            </div>
          </div>
        </div>
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
            <div className="tg-header-ornament" aria-hidden="true">
              <span className="tg-header-dot" />
              <span className="tg-header-dot" />
              <span className="tg-header-dot" />
            </div>
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
              ออกแบบของขวัญสุดพิเศษสำหรับคนพิเศษหรือโอกาสพิเศษที่มีเพียงชิ้นเดียวจาก Thara Bliss — เลือกของขวัญที่ต้องการ เลือกรูปแบบการห่อของขวัญ
              และเขียนข้อความสำหรับผู้รับ
            </p>
          </div>

          <form className="tg-form" onSubmit={handleSubmit} noValidate>
            {/* SECTION: Your details */}
            <section className="tg-section">
              <h2>ข้อมูลของคุณ</h2>
              <div className="tg-grid-2">
                <Field label="ชื่อของคุณ" error={errors.name}>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Your name"
                  />
                </Field>
                <Field label="อีเมล" error={errors.email}>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@email.com"
                  />
                </Field>
              </div>
              <Field label="เบอร์โทรศัพท์ (ไม่บังคับ)">
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
              <h2>ของขวัญนี้สำหรับใคร?</h2>
              <div className="tg-grid-2">
                <Field label="ชื่อผู้รับของขวัญ" error={errors.recipientName}>
                  <input
                    type="text"
                    value={form.recipientName}
                    onChange={(e) => update("recipientName", e.target.value)}
                    placeholder="Who's receiving this?"
                  />
                </Field>
                <Field label="โอกาสพิเศษ" error={errors.occasion}>
                  <select value={form.occasion} onChange={(e) => update("occasion", e.target.value)}>
                    <option value="">Select an occasion</option>
                    {OCCASIONS.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="วันที่ต้องการจัดส่ง (ไม่บังคับ)">
                <input
                  type="date"
                  value={form.deliveryDate}
                  onChange={(e) => update("deliveryDate", e.target.value)}
                />
              </Field>
            </section>

            {/* SECTION: Build the gift */}
            <section className="tg-section">
              <h2>เลือกประเภทของขวัญ</h2>
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

                {/* Custom / "type your own" item option */}
                <button
                  type="button"
                  className={`tg-item-card ${isCustomItemSelected ? "is-checked" : ""}`}
                  onClick={() => toggleItem(CUSTOM_ITEM_ID)}
                  aria-pressed={isCustomItemSelected}
                >
                  <span className="tg-item-check">
                    {isCustomItemSelected && (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FBF5DD" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </span>
                  <span>
                    <span className="tg-item-label">อื่นๆ (ระบุเอง)</span>
                    <span className="tg-item-desc">พิมพ์ของขวัญที่คุณต้องการ</span>
                  </span>
                </button>
              </div>

              {isCustomItemSelected && (
                <div className="tg-custom-reveal">
                  <Field label="ระบุของขวัญที่ต้องการ" error={errors.customItemText}>
                    <input
                      type="text"
                      value={form.customItemText}
                      maxLength={CUSTOM_ITEM_LIMIT}
                      onChange={(e) => update("customItemText", e.target.value)}
                      placeholder="เช่น เทียนหอมกลิ่นลาเวนเดอร์, ชุดของขวัญรวม..."
                    />
                  </Field>
                  <p className="tg-char-count">{form.customItemText.length}/{CUSTOM_ITEM_LIMIT}</p>
                </div>
              )}
            </section>

            {/* SECTION: Budget */}
            <section className="tg-section">
              <h2>Budget</h2>
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
                <button
                  type="button"
                  className={`tg-pill ${isCustomBudgetSelected ? "is-active" : ""}`}
                  onClick={() => update("budget", CUSTOM_BUDGET_ID)}
                >
                  อื่นๆ (ระบุเอง)
                </button>
              </div>

              {isCustomBudgetSelected && (
                <div className="tg-custom-reveal">
                  <Field label="ระบุงบประมาณที่ต้องการ" error={errors.customBudgetText}>
                    <input
                      type="text"
                      value={form.customBudgetText}
                      onChange={(e) => update("customBudgetText", e.target.value)}
                      placeholder="เช่น ประมาณ ฿1,500 หรือ ไม่เกิน ฿3,000"
                    />
                  </Field>
                </div>
              )}
            </section>

            {/* SECTION: Wrap style */}
            <section className="tg-section">
              <h2>รูปแบบการห่อของขวัญ</h2>
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
              <h2>ข้อความส่วนตัว (ไม่บังคับ)</h2>
              <Field label="">
                <textarea
                  value={form.message}
                  maxLength={MESSAGE_LIMIT}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="เขียนข้อความสั้นๆ แนบไปกับของขวัญ..."
                  rows={4}
                />
              </Field>
              <p className="tg-char-count">{form.message.length}/{MESSAGE_LIMIT}</p>
            </section>

            {status === "error" && (
              <p className="tg-error-text tg-error-banner">
                เกิดข้อผิดพลาดในการส่งคำขอ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราโดยตรง
              </p>
            )}

            <button type="submit" className="tg-btn tg-btn-primary tg-submit" disabled={status === "submitting"}>
              {status === "submitting" ? "กำลังส่ง..." : "ส่งคำขอ"}
            </button>
          </form>
        </div>
      </div>
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

      .tg-header-ornament {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 0.9rem;
      }
      .tg-header-dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background: #0F6E56;
        opacity: 0.35;
      }
      .tg-header-dot:nth-child(1) { opacity: 0.9; width: 22px; border-radius: 3px; }
      .tg-header-dot:nth-child(2) { background: #C7B08A; opacity: 0.7; }
      .tg-header-dot:nth-child(3) { background: #7C8B6F; opacity: 0.5; }

      .tg-form { display: flex; flex-direction: column; gap: 2rem; }
      .tg-section {
        background: #FFFFFF;
        border: 1px solid #EFEAE1;
        border-radius: 18px;
        padding: 1.75rem;
        position: relative;
        overflow: hidden;
      }
      .tg-section h2 {
        font-size: 1.05rem;
        font-weight: 500;
        margin: 0 0 1.1rem;
        color: #2F3A33;
        display: flex;
        align-items: center;
        gap: 0.55rem;
        position: relative;
        z-index: 1;
      }
      .tg-section h2::before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #0F6E56;
        box-shadow: 0 0 0 4px #DDEFD9;
        flex-shrink: 0;
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
        position: relative;
        z-index: 1;
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
      .tg-pill-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        position: relative;
        z-index: 1;
      }
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
        position: relative;
        z-index: 1;
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
        transition: border-color 0.15s, background 0.15s, transform 0.15s;
        position: relative;
        overflow: hidden;
      }
      .tg-wrap-card::after {
        content: "";
        position: absolute;
        top: -14px;
        right: -14px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 1.5px dashed var(--accent);
        opacity: 0.35;
      }
      .tg-wrap-card:hover {
        border-color: #B9D8CC;
        transform: translateY(-2px);
      }
      .tg-wrap-card.is-active {
        border-color: var(--accent);
        background: #fff;
        box-shadow: 0 0 0 1px var(--accent), 0 10px 24px rgba(0,0,0,.06);
      }
      .tg-wrap-card.is-active::after { opacity: 0.6; }
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
      .tg-success-icon-wrap {
        position: relative;
        margin-bottom: 0.5rem;
      }
      .tg-success-icon {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: #0F6E56;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 20px rgba(15,110,86,.25);
      }
      .tg-spark {
        position: absolute;
        border-radius: 50%;
        background: #C7B08A;
      }
      .tg-spark-1 { width: 8px; height: 8px; top: -6px; left: -10px; background: #C7B08A; }
      .tg-spark-2 { width: 5px; height: 5px; bottom: -4px; right: -12px; background: #7C8B6F; }
      .tg-spark-3 { width: 6px; height: 6px; top: 4px; right: -18px; background: #DDEFD9; }
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