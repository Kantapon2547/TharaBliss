"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Products", href: "/products" },
  { label: "Help Center", href: "/help-center" },
];

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (!pathname) return false;

    // normalize trailing slashes
    const cleanPath = pathname.replace(/\/$/, "");
    const cleanHref = href.replace(/\/$/, "");

    return cleanPath === cleanHref;
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #ECE8DF",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* LOGO */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div>
            <h2
              style={{
                margin: 0,
                color: "#2F3A33",
                fontSize: 24,
                fontWeight: 600,
              }}
            >
              TharaBliss
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "#888",
              }}
            >
              OEM Manufacturing
            </p>
          </div>
        </Link>

        {/* NAV LINKS */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV_LINKS.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: active ? "#0F6E56" : "#555",
                  fontWeight: active ? 600 : 400,
                  transition: "all 0.2s ease",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* CTA BUTTON */}
        <Link
          href="/help-center"
          style={{
            background: "#0F6E56",
            color: "#fff",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: 8,
          }}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}