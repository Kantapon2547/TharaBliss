"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "Our Story",   href: "/about" },
  { label: "Journal",     href: "/journal" },
  { label: "Products",    href: "/products" },
  { label: "Help Center", href: "/help-center" },
];

const PRODUCT_DROPDOWN = [
  { label: "Aroma Balm",   href: "/products?tab=aroma-balm" },
  { label: "Room Spray",   href: "/products?tab=room-spray" },
  { label: "Special Gift", href: "/products?tab=special-gift" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const isActive = (href: string) => {
    if (!pathname) return false;
    const clean = pathname.replace(/\/$/, "");
    return clean === href.replace(/\/$/, "").split("?")[0];
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
          transition: "0.3s",
          boxShadow: scrolled ? "0 2px 24px rgba(47,58,51,0.06)" : "none",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        <div
          className="navbar-inner"
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
          {/* LOGO */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span style={{ color: "#2F3A33", fontSize: 20, fontWeight: 400, letterSpacing: "0.05em", lineHeight: 1.5 }}>
                Thara<em style={{ fontStyle: "italic", color: "#0F6E56" }}>Bliss</em>
              </span>
              <span style={{ fontSize: 9, color: "#aaa", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Refresh Your Senses. Relax Your Mind.
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <div className="desktop-nav" style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);

              if (item.label === "Products") {
                return (
                  <div
                    key={item.href}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      style={{
                        textDecoration: "none",
                        color: active ? "#0F6E56" : "#555",
                        fontSize: "0.875rem",
                        padding: "0.4rem 0.85rem",
                        borderRadius: 40,
                        background: active ? "#EAF3EC" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      {item.label}
                      <svg
                        width="10" height="10" viewBox="0 0 10 10" fill="none"
                        style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </Link>

                    {dropdownOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 8px)",
                          left: "50%",
                          transform: "translateX(-50%)",
                          background: "#fff",
                          border: "1px solid #EFEAE1",
                          borderRadius: 16,
                          boxShadow: "0 8px 32px rgba(47,58,51,0.10)",
                          padding: "8px",
                          minWidth: 180,
                          zIndex: 100,
                        }}
                      >
                        {/* arrow pointer */}
                        <div
                          style={{
                            position: "absolute",
                            top: -5, left: "50%",
                            transform: "translateX(-50%) rotate(45deg)",
                            width: 10, height: 10,
                            background: "#fff",
                            border: "1px solid #EFEAE1",
                            borderBottom: "none",
                            borderRight: "none",
                          }}
                        />
                        {PRODUCT_DROPDOWN.map((drop) => (
                          <Link
                            key={drop.href}
                            href={drop.href}
                            onClick={() => setDropdownOpen(false)}
                            style={{
                              display: "block",
                              padding: "0.65rem 1rem",
                              borderRadius: 10,
                              textDecoration: "none",
                              color: "#2F3A33",
                              fontSize: "0.875rem",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#EAF3EC")}
                            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                          >
                            {drop.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                    color: active ? "#0F6E56" : "#555",
                    fontSize: "0.875rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: 40,
                    background: active ? "#EAF3EC" : "transparent",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="navbar-right" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Link
              href="https://www.facebook.com/share/1Bm1TTxF7p/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-btn"
              style={{
                background: "#0F6E56",
                color: "#FBF5DD",
                textDecoration: "none",
                padding: "0.55rem 1.4rem",
                borderRadius: 40,
                fontSize: "0.82rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              Contact
            </Link>

            {/* HAMBURGER */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="hamburger"
              style={{ display: "none", background: "none", border: "none", cursor: "pointer" }}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <line x1="3" y1="7" x2="21" y2="7" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="3" y1="17" x2="21" y2="17" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div
            style={{
              borderTop: "1px solid #EFEAE1",
              background: "#fff",
              padding: "1rem 6vw 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
            }}
          >
            {NAV_LINKS.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      color: active ? "#0F6E56" : "#2F3A33",
                      fontSize: "1rem",
                      padding: "0.9rem 1rem",
                      borderRadius: 12,
                      background: active ? "#EAF3EC" : "transparent",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </Link>

                  {/* Product sub-items on mobile */}
                  {item.label === "Products" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px", paddingLeft: "0.5rem" }}>
                      {PRODUCT_DROPDOWN.map((drop) => (
                        <Link
                          key={drop.href}
                          href={drop.href}
                          onClick={() => setMenuOpen(false)}
                          style={{
                            textDecoration: "none",
                            color: "#0F6E56",
                            fontSize: "0.875rem",
                            padding: "0.55rem 1rem 0.55rem 1.5rem",
                            borderRadius: 10,
                            display: "block",
                          }}
                        >
                          — {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}


          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
          .navbar-right { gap: 0.5rem !important; }
          .contact-btn {
            padding: 0.5rem 0.9rem !important;
            font-size: 0.72rem !important;
            letter-spacing: 0.05em !important;
          }
        }

        @media (max-width: 420px) {
          .contact-btn {
            padding: 0.45rem 0.7rem !important;
            font-size: 0.65rem !important;
          }
          .navbar-inner {
            padding: 0 4vw !important;
          }
        }
      `}</style>
    </>
  );
}