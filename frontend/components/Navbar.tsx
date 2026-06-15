"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Products", href: "/products" },
  { label: "Help Center", href: "/help-center" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname.replace(/\/$/, "") === href.replace(/\/$/, "");
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #ECE8DF" : "1px solid transparent",
          boxShadow: scrolled ? "0 2px 24px rgba(47,58,51,0.06)" : "none",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 6vw",
            height: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LOGO */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 20, color: "#2F3A33" }}>
                Thara<em style={{ color: "#0F6E56" }}>Bliss</em>
              </span>
              <span style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.2em" }}>
                Refresh Your Senses
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="desktop-nav" style={{ display: "flex", gap: 6 }}>
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 30,
                    textDecoration: "none",
                    color: active ? "#0F6E56" : "#555",
                    background: active ? "#EAF3EC" : "transparent",
                    fontSize: 14,
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link
              href="https://www.facebook.com/share/1Bm1TTxF7p/"
              target="_blank"
              style={{
                background: "#0F6E56",
                color: "#FBF5DD",
                padding: "8px 16px",
                borderRadius: 30,
                fontSize: 12,
                textTransform: "uppercase",
              }}
            >
              Contact
            </Link>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="hamburger"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(255,255,255,0.98)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          padding: "90px 24px",
          gap: 12,
        }}
      >
        {NAV_LINKS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: 18,
                padding: "14px 12px",
                borderRadius: 12,
                background: active ? "#EAF3EC" : "transparent",
                color: active ? "#0F6E56" : "#2F3A33",
                textDecoration: "none",
              }}
            >
              {item.label}
            </Link>
          );
        })}

        <Link
          href="https://www.facebook.com/share/1Bm1TTxF7p/"
          target="_blank"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: 20,
            background: "#0F6E56",
            color: "#FBF5DD",
            padding: "14px",
            borderRadius: 12,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Contact Us
        </Link>
      </div>

      {/* RESPONSIVE RULES */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; font-size: 22px; }
        }
      `}</style>
    </>
  );
}