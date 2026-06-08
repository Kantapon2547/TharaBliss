"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

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
        <Link
          href="/"
          style={{
            textDecoration: "none",
          }}
        >
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

        <div
          style={{
            display: "flex",
            gap: "2rem",
          }}
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: "none",
                color:
                  pathname === item.href
                    ? "#0F6E56"
                    : "#555",
                fontWeight:
                  pathname === item.href
                    ? 600
                    : 400,
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
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