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

  // close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    const cleanPath = pathname.replace(/\/$/, "");
    const cleanHref = href.replace(/\/$/, "");
    return cleanPath === cleanHref;
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #ECE8DF" : "1px solid transparent",
          transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
          boxShadow: scrolled ? "0 2px 24px rgba(47,58,51,0.06)" : "none",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 6vw",
            height: 68,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* ── LOGO ── */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span
                style={{
                  color: "#2F3A33",
                  fontSize: 20,
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                Thara<em style={{ fontStyle: "italic", color: "#0F6E56" }}>Bliss</em>
              </span>
              <span
                style={{
                  fontSize: 9,
                  color: "#aaa",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  lineHeight: 2,
                }}
              >
                Refresh Your Senses. Relax Your Mind.
              </span>
            </div>
          </Link>

          {/* ── NAV LINKS (desktop) ── */}
          <div
            style={{
              display: "flex",
              gap: "0.25rem",
              alignItems: "center",
            }}
            className="desktop-nav"
          >
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: active ? "#0F6E56" : "#555",
                    fontSize: "0.875rem",
                    fontWeight: 400,
                    letterSpacing: "0.02em",
                    padding: "0.4rem 0.85rem",
                    borderRadius: 40,
                    background: active ? "#EAF3EC" : "transparent",
                    transition: "color 0.2s, background 0.2s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#2F3A33";
                      (e.currentTarget as HTMLAnchorElement).style.background = "#F5F2EB";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLAnchorElement).style.color = "#555";
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ── RIGHT SIDE ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexShrink: 0 }}>
            <Link
              href="https://www.facebook.com/share/1Bm1TTxF7p/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0F6E56",
                color: "#FBF5DD",
                textDecoration: "none",
                padding: "0.55rem 1.4rem",
                borderRadius: 40,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              Contact Us
            </Link>

            {/* mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "#2F3A33",
              }}
              className="hamburger"
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid #EFEAE1",
              background: "#FFFFFF",
              padding: "1rem 6vw 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: active ? "#0F6E56" : "#2F3A33",
                    fontSize: "1rem",
                    fontWeight: active ? 500 : 400,
                    padding: "0.75rem 1rem",
                    borderRadius: 12,
                    background: active ? "#EAF3EC" : "transparent",
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <div style={{ height: 1, background: "#EFEAE1", margin: "0.75rem 0" }} />
            <Link
              href="https://www.facebook.com/share/1Bm1TTxF7p/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#0F6E56",
                color: "#FBF5DD",
                textDecoration: "none",
                padding: "0.85rem 1rem",
                borderRadius: 12,
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Contact Us
            </Link>
          </div>
        )}
      </nav>

      {/* responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}