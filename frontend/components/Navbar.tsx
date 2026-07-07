
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

const NAV_LINKS = [
  { label: "Home",        href: "/" },
  { label: "Our Story",   href: "/about" },
  { label: "Journal",     href: "/journal" },
  { label: "Products",    href: "/products" },
  { label: "Help Center", href: "/help-center" },
  { label: "Request",     href: "/request" }
];

const PRODUCT_DROPDOWN = [
  { label: "Aroma Balm",   href: "/products?tab=aroma-balm" },
  { label: "Room Spray",   href: "/products?tab=room-spray" },
  { label: "Special Gift", href: "/products?tab=special-gift" },
];

// Gift box icon used for the "Request" nav item.
function GiftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="9" width="18" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 13H21" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 9V20" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 7.5C2 6.67 2.67 6 3.5 6H20.5C21.33 6 22 6.67 22 7.5V9H2V7.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 9C12 9 8.5 9 7 7.5C6 6.5 6.5 4.5 8 4C9.7 3.4 12 5.5 12 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 9C12 9 15.5 9 17 7.5C18 6.5 17.5 4.5 16 4C14.3 3.4 12 5.5 12 9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]         = useState(false);
  const [hidden, setHidden]             = useState(false);
  const [scrollPct, setScrollPct]       = useState(0);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Scroll handling: track progress, toggle "scrolled" chrome, and
  // hide the bar on scroll-down / reveal it on scroll-up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, (y / max) * 100) : 0);
      setScrolled(y > 24);

      if (!menuOpen) {
        if (y < 80) {
          setHidden(false);
        } else if (y > lastScrollY.current + 4) {
          setHidden(true);
          setDropdownOpen(false);
        } else if (y < lastScrollY.current - 4) {
          setHidden(false);
        }
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  // Close dropdown on outside click / Escape for keyboard + mouse users.
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const isActive = useCallback((href: string) => {
    if (!pathname) return false;
    const clean = pathname.replace(/\/$/, "");
    return clean === href.replace(/\/$/, "").split("?")[0];
  }, [pathname]);

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
          boxShadow: scrolled ? "0 2px 24px rgba(47,58,51,0.06)" : "none",
          transform: hidden ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s, border-color 0.3s, box-shadow 0.3s",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* SCROLL PROGRESS INDICATOR */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: -1,
            left: 0,
            height: 2,
            width: `${scrollPct}%`,
            background: "linear-gradient(90deg, #0F6E56, #4CAE8F)",
            transition: "width 0.15s linear",
          }}
        />

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
          <Link href="/" className="thara-logo" style={{ textDecoration: "none", flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <span style={{ color: "#2F3A33", fontSize: 20, fontWeight: 400, letterSpacing: "0.05em", lineHeight: 1.5, transition: "color 0.2s" }}>
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
                    ref={dropdownRef}
                    style={{ position: "relative" }}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                      onClick={(e) => {
                        // Let touch/keyboard users toggle without following the link twice.
                        if (!dropdownOpen) {
                          e.preventDefault();
                          setDropdownOpen(true);
                        }
                      }}
                      className="thara-nav-link"
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
                        transition: "background 0.18s, color 0.18s",
                      }}
                    >
                      {item.label}
                      <svg
                        width="10" height="10" viewBox="0 0 10 10" fill="none"
                        style={{ transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </Link>

                    <div
                      role="menu"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: "50%",
                        transform: dropdownOpen
                          ? "translateX(-50%) translateY(0) scale(1)"
                          : "translateX(-50%) translateY(-6px) scale(0.97)",
                        opacity: dropdownOpen ? 1 : 0,
                        visibility: dropdownOpen ? "visible" : "hidden",
                        transition: "opacity 0.16s ease, transform 0.16s ease, visibility 0.16s",
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
                          role="menuitem"
                          onClick={() => setDropdownOpen(false)}
                          className="thara-dropdown-item"
                          style={{
                            display: "block",
                            padding: "0.65rem 1rem",
                            borderRadius: 10,
                            textDecoration: "none",
                            color: "#2F3A33",
                            fontSize: "0.875rem",
                            transition: "background 0.15s, color 0.15s",
                          }}
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              if (item.label === "Request") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-label="Request a Gift"
                    title="Request a Gift"
                    className="thara-nav-link thara-gift-link"
                    style={{
                      textDecoration: "none",
                      color: active ? "#0F6E56" : "#555",
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: active ? "#EAF3EC" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.18s, color 0.18s",
                    }}
                  >
                    <GiftIcon />
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="thara-nav-link"
                  style={{
                    textDecoration: "none",
                    color: active ? "#0F6E56" : "#555",
                    fontSize: "0.875rem",
                    padding: "0.4rem 0.85rem",
                    borderRadius: 40,
                    background: active ? "#EAF3EC" : "transparent",
                    transition: "background 0.18s, color 0.18s",
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
                transition: "background 0.18s, transform 0.15s",
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
              style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6 }}
            >
              <span className={`thara-burger-icon ${menuOpen ? "is-open" : ""}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU BACKDROP */}
        <div
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
          className="thara-mobile-backdrop"
          style={{
            opacity: menuOpen ? 1 : 0,
            visibility: menuOpen ? "visible" : "hidden",
          }}
        />

        {/* MOBILE MENU */}
        <div
          className="thara-mobile-menu"
          style={{
            maxHeight: menuOpen ? 480 : 0,
            opacity: menuOpen ? 1 : 0,
          }}
        >
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

              if (item.label === "Request") {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-label="Request a Gift"
                    style={{
                      textDecoration: "none",
                      color: active ? "#0F6E56" : "#2F3A33",
                      fontSize: "1rem",
                      padding: "0.9rem 1rem",
                      borderRadius: 12,
                      background: active ? "#EAF3EC" : "transparent",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.6rem",
                    }}
                  >
                    <GiftIcon />
                    Request
                  </Link>
                );
              }

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
        </div>
      </nav>

      <style>{`
        .thara-nav-link:hover {
          background: #F2F7F3 !important;
          color: #0F6E56 !important;
        }
        .thara-dropdown-item:hover {
          background: #EAF3EC !important;
          color: #0F6E56 !important;
        }
        .thara-logo:hover span:first-child {
          color: #0F6E56 !important;
        }
        .contact-btn:hover {
          background: #0a5240 !important;
          transform: translateY(-1px);
        }
        .contact-btn:active {
          transform: translateY(0);
        }

        /* animated hamburger */
        .thara-burger-icon {
          position: relative;
          display: block;
          width: 22px;
          height: 16px;
        }
        .thara-burger-icon span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: #2F3A33;
          border-radius: 2px;
          transition: transform 0.28s ease, opacity 0.2s ease, top 0.28s ease;
        }
        .thara-burger-icon span:nth-child(1) { top: 0; }
        .thara-burger-icon span:nth-child(2) { top: 7px; }
        .thara-burger-icon span:nth-child(3) { top: 14px; }
        .thara-burger-icon.is-open span:nth-child(1) {
          top: 7px;
          transform: rotate(45deg);
        }
        .thara-burger-icon.is-open span:nth-child(2) {
          opacity: 0;
        }
        .thara-burger-icon.is-open span:nth-child(3) {
          top: 7px;
          transform: rotate(-45deg);
        }

        .thara-mobile-menu {
          overflow: hidden;
          transition: max-height 0.32s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.24s ease;
        }

        .thara-mobile-backdrop {
          position: fixed;
          inset: 0;
          top: 68px;
          background: rgba(47,58,51,0.25);
          transition: opacity 0.25s ease, visibility 0.25s ease;
          z-index: -1;
        }

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

        @media (prefers-reduced-motion: reduce) {
          nav, .thara-mobile-menu, .thara-burger-icon span, .thara-nav-link, .contact-btn {
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}