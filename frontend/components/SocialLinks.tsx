"use client";

import { FaInstagram, FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";

const SOCIALS = [
  { icon: <FaInstagram size={18} />, name: "Instagram", href: "https://shorturl.at/AfAPc" },
  { icon: <FaFacebook  size={18} />, name: "Facebook",  href: "https://shorturl.at/BJPYF" },
  { icon: <FaTiktok    size={17} />, name: "TikTok",    href: "https://www.tiktok.com/@tharabliss?_r=1&_t=ZS-975GjfaqjAe" },
  { icon: <FaShoppingCart size={18} />, name: "Shopee", href: "https://shorturl.at/2Eg4w" },
];

export default function SocialIcons() {
  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {SOCIALS.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.name}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 38, height: 38, borderRadius: "50%",
            border: "1px solid rgba(251,245,221,0.2)",
            color: "rgba(251,245,221,0.7)",
            textDecoration: "none",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(251,245,221,0.12)";
            e.currentTarget.style.borderColor = "rgba(251,245,221,0.5)";
            e.currentTarget.style.color = "#FBF5DD";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(251,245,221,0.2)";
            e.currentTarget.style.color = "rgba(251,245,221,0.7)";
          }}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}