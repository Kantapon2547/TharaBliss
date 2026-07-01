"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import { motion } from "framer-motion";
import { getProducts } from "@/lib/api";
import { SplitLines, FadeUp, SlideIn, FadeIn } from "@/components/Animations";
import { FaInstagram, FaFacebook, FaTiktok, FaShoppingCart } from "react-icons/fa";
import SocialIcons from "../../components/SocialLinks";
import DecoratedBackground from "@/components/DecoratedBackground";

const HERO = {
  img: "/images/banner/product_banner.jpg",
  title: "Find Your Own Scents",
  subtitle:
    "พกพาความสงบไปได้ทุกที่ เพียงแต้มเบา ๆ แล้วสูดหายใจลึก ๆ ให้กลิ่นหอมช่วยเติมความสดชื่น ผ่อนคลายความตึงเครียด และคืนสมดุลให้กับวันของคุณ",
};

const SERVICES = [
  {
    img: "/images/services/promise.jpg"
    title: "Our Promise",
    desc: "เราเชื่อว่าความหอมควรเป็นส่วนหนึ่งของความสบายใจในทุกวัน เราจึงคัดสรรทุกส่วนผสมด้วยความอ่อนโยนและความใส่ใจปราศจากแอลกอฮอล์ ปราศจากพาราเบน และลดสิ่งที่ไม่จำเป็นออกไป เพื่อมอบประสบการณ์แห่งความหอมที่นุ่มนวลปลอดภัยยิ่งขึ้น",
    number: "01",
  },
  {
    img: "/images/services/package.jpg",
    title: "Designed to Be Picked Up",
    desc: "แพ็กเกจที่อยากหยิบ ใช้ง่าย และอยู่ใกล้ตัวเราเชื่อว่าแพ็กเกจที่ดีไม่ควรถูกเก็บไว้ในลิ้นชัก แต่ควรอยู่บนโต๊ะทำงาน ข้างเตียงหรือในกระเป๋าที่คุณพกไปทุกที่ Thara Bliss จึงออกแบบรูปทรง สี และสัมผัสให้ดูเรียบ สงบ และน่าใช้ในแบบที่เข้ากับทุกพื้นที่ของชีวิต",
    number: "02",
  },
  {
    img: "/images/services/logo_brand.jpg",
    title: "Created for Everyday Moments",
    desc: "ออกแบบมาเพื่อช่วงเวลาของทุกวันเราเชื่อว่าความหอมไม่ควรจำกัดอยู่แค่โอกาสพิเศษ แต่ควรเป็นส่วนหนึ่งของชีวิตประจำวันทุกกลิ่นถูกออกแบบให้ใช้ง่ายกลมกลืนกับช่วงเวลาต่าง ๆ ตั้งแต่เช้าที่เริ่มต้นวันระหว่างวันทำงานและความหอมที่ดีควรทำให้วันเหล่านั้นรู้สึกเบาขึ้น สบายขึ้นเสมอ",
    number: "03",
  },
];

const COLLECTIONS = [
  {
    image: "/images/services/design1.jpg",
    title: "Calm Rituals",
    tag: "Relaxation",
    icon: "🌿",
    description:
      "กลิ่นหอมแนวผ่อนคลาย ช่วยสร้างความสงบ ผ่อนคลายความตึงเครียด และช่วยเตรียมร่างกายให้พร้อมสำหรับการพักผ่อน",
  },
  {
    image: "/images/services/design2.jpg",
    title: "Modern Elegance",
    tag: "Sophistication",
    icon: "🏛️",
    description:
      "กลิ่นหอมที่สะท้อนความเรียบหรู ความสง่างาม และความมั่นใจ เหมาะสำหรับพื้นที่ที่ต้องการภาพลักษณ์ที่ดูมีระดับ",
  },
  {
    image: "/images/services/design3.jpg",
    title: "Warm Impressions",
    tag: "Comfort",
    icon: "☀️",
    description:
      "กลิ่นหอมอบอุ่น นุ่มนวล และเป็นกันเอง ช่วยสร้างความรู้สึกสบายใจและความประทับใจที่ยาวนาน",
  },
];

const STATS = [
  { value: "3", unit: "Scent Collections", label: "Calm · Elegant · Warm" },
  { value: "100%", unit: "Thai Crafted", label: "Made with care in Thailand" },
  { value: "FDA", unit: "Certified", label: "Alcohol & Paraben Free" },
];

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function HomePage() {
  return (
    <>
      <DecoratedBackground />
      <Navbar />

      <main
        style={{
          background: "transparent",
          minHeight: "100vh",
          color: "#2F3A33",
          fontFamily: "'Verdana', Helvetica, Arial, sans-serif",
          overflowX: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── HERO ── */}
        <section
          className="hero-section"
          style={{ position: "relative", height: "95vh", minHeight: 600, overflow: "hidden" }}
        >
          <Image
            src={HERO.img}
            alt="Thara Bliss — Find Your Signature Scent."
            fill
            priority
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          {/* left-to-right scrim so text pops on the left side */}
          <div
            className="hero-scrim"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,22,14,0.72) 0%, rgba(10,22,14,0.28) 55%, transparent 100%)",
            }}
          />
          <div
            className="hero-content"
            style={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 8vw",
              maxWidth: 720,
            }}
          >
            <p
              style={{
                color: "rgba(251,245,221,0.65)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Welcome to Thara Bliss
            </p>
            <h1
              style={{
                fontSize: "clamp(2.6rem, 7vw, 6rem)",
                fontWeight: 300,
                color: "#FBF5DD",
                lineHeight: 1.05,
                margin: "0 0 1.5rem",
              }}
            >
              Find Your
              <br />
              <em style={{ fontStyle: "italic" }}> Signature </em>
              <br />
              Scent.
            </h1>
            <p
              style={{
                maxWidth: 440,
                fontSize: "1rem",
                color: "rgba(251,245,221,0.8)",
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              {HERO.subtitle}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a
                href="#collections"
                style={{
                  display: "inline-block",
                  background: "#FBF5DD",
                  color: "#0F6E56",
                  padding: "0.85rem 2.2rem",
                  borderRadius: 40,
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Explore Scents
              </a>
              <a
                href="#services"
                style={{
                  display: "inline-block",
                  border: "1px solid rgba(251,245,221,0.5)",
                  color: "#FBF5DD",
                  padding: "0.85rem 2.2rem",
                  borderRadius: 40,
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Our Services
              </a>
            </div>
          </div>

          {/* scroll hint */}
          <div
            className="scroll-hint"
            style={{
              position: "absolute",
              bottom: "2.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 1,
                height: 48,
                background: "rgba(251,245,221,0.35)",
              }}
            />
            <p
              style={{
                color: "rgba(251,245,221,0.4)",
                fontSize: "10px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </p>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div style={{ background: "#0F6E56", padding: "2rem 6vw" }}>
          <div
            className="stats-grid"
            style={{
              maxWidth: 1000,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              textAlign: "center",
            }}
          >
            {STATS.map((s) => (
              <div key={s.unit}>
                <p
                  style={{
                    fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                    fontWeight: 300,
                    color: "#FBF5DD",
                    lineHeight: 1,
                  }}
                >
                  {s.value}{" "}
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                      opacity: 0.85,
                    }}
                  >
                    {s.unit}
                  </span>
                </p>
                <p
                  style={{
                    color: "rgba(251,245,221,0.55)",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    marginTop: "0.4rem",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── BRAND STATEMENT ── */}
        <motion.section
          {...fadeUp}
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "8rem 6vw",
            textAlign: "center",
          }}
          className="brand-statement"
        >
          <p
            style={{
              color: "#0F6E56",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Thara Bliss
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 300,
              lineHeight: 1.25,
              marginBottom: "2rem",
            }}
          >
            สัมผัสประสบการณ์กลิ่นหอม
            <br />
            <em style={{ fontStyle: "italic", color: "#0F6E56" }}>
              ที่ได้รับแรงบันดาลใจจากความสงบ
            </em>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 2,
              color: "#666",
              maxWidth: 600,
              margin: "0 auto",
            }}
          >
            ความหรูหรา และช่วงเวลาที่น่าจดจำ — ผลิตภัณฑ์ Thara Bliss
            ถูกออกแบบให้เป็นส่วนหนึ่งของชีวิตประจำวันที่ดีขึ้น
          </p>
        </motion.section>

        {/* ── SCENT COLLECTIONS ── */}
        <section id="collections" style={{ background: "#F5F2EB" }}>
          {/* header */}
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto",
              padding: "6rem 6vw 4rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                color: "#0F6E56",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              The Scent Collections
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                marginBottom: "1.5rem",
              }}
            >
              Three moods.
              <br />
              <em style={{ fontStyle: "italic" }}>One brand.</em>
            </h2>
            <p style={{ color: "#666", lineHeight: 1.9, maxWidth: 600, margin: "0 auto" }}>
              กลิ่นของ Thara Bliss ถูกพัฒนาขึ้นอย่างตั้งใจใน 3 แนวกลิ่นหลัก
              สะท้อนอารมณ์และการใช้งานที่แตกต่างกัน
            </p>
          </div>

          {/* alternating rows */}
          {COLLECTIONS.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              className="collection-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                minHeight: 420,
              }}
            >
              {index % 2 === 0 && (
                <div className="collection-image" style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <div
                className="collection-text"
                style={{
                  background: index % 2 === 0 ? "#F5F2EB" : "#FAFAF7",
                  display: "flex",
                  alignItems: "center",
                  padding: "4rem 6vw",
                }}
              >
                <div style={{ maxWidth: 420 }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#EAF3EC",
                      color: "#0F6E56",
                      fontSize: "10px",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      padding: "4px 12px",
                      borderRadius: 20,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {item.tag}
                  </span>
                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
                      fontWeight: 300,
                      letterSpacing: "0.03em",
                      marginBottom: "1.25rem",
                      color: "#2F3A33",
                      lineHeight: 1.2,
                    }}
                  >
                    {item.title}
                  </h3>
                  <div
                    style={{
                      width: 36,
                      height: 2,
                      background: "#0F6E56",
                      marginBottom: "1.25rem",
                      borderRadius: 1,
                    }}
                  />
                  <p style={{ color: "#666", lineHeight: 1.95 }}>
                    {item.description}
                  </p>
                </div>
              </div>
              {index % 2 === 1 && (
                <div className="collection-image" style={{ position: "relative", overflow: "hidden" }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </motion.div>
          ))}

          <div
            style={{
              textAlign: "center",
              padding: "5rem 6vw",
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <p style={{ color: "#666", lineHeight: 2, fontStyle: "italic" }}>
              กลิ่นหอมแต่ละคอลเลกชันได้รับการออกแบบอย่างพิถีพิถัน
              เพื่อสะท้อนอารมณ์และประสบการณ์ที่แตกต่างกัน
            </p>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section
          id="services"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "8rem 6vw",
          }}
          className="services-section"
        >
          <div style={{ marginBottom: "4rem" }}>
            <p
              style={{
                color: "#0F6E56",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              Our Services
            </p>
            <div
              className="services-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  margin: 0,
                }}
              >
                Thara Bliss
                <br />
                <em style={{ fontStyle: "italic" }}>From Scent to Sensation</em>
              </h2>
              <p style={{ color: "#888", maxWidth: 350, lineHeight: 1.7, fontSize: "1.2rem" }}>
                From the first note of scent to packaging you’ll love to pick up — every detail is designed with care.
              </p>
            </div>
          </div>

          {/* thin rule */}
          <div style={{ height: 1, background: "#EFEAE1", marginBottom: "3rem" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #EFEAE1",
                }}
              >
                {/* image */}
                <div
                  style={{
                    position: "relative",
                    height: 240,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                  {/* number badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      left: "1.25rem",
                      background: "rgba(251,245,221,0.92)",
                      color: "#0F6E56",
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      padding: "4px 10px",
                      borderRadius: 20,
                    }}
                  >
                    {service.number}
                  </div>
                </div>

                {/* content */}
                <div style={{ padding: "1.75rem" }}>
                  <div
                    style={{
                      width: 32,
                      height: 2,
                      background: "#0F6E56",
                      marginBottom: "1rem",
                      borderRadius: 1,
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 400,
                      color: "#2F3A33",
                      marginBottom: "0.75rem",
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      color: "#777",
                      lineHeight: 1.8,
                      marginBottom: "1.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    {service.desc}
                  </p>
                  <motion.button
                    whileHover={{ background: "#0F6E56", color: "#FBF5DD", borderColor: "#0F6E56" }}
                    transition={{ duration: 0.2 }}
                    style={{
                      width: "100%",
                      height: 44,
                      borderRadius: 40,
                      border: "1px solid #DADADA",
                      background: "#FFFFFF",
                      color: "#2F3A33",
                      cursor: "pointer",
                      fontWeight: 400,
                      fontSize: "13px",
                      letterSpacing: "0.08em",
                      fontFamily: "inherit",
                    }}
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section
          style={{
            background: "#0F6E56",
            color: "#FBF5DD",
            padding: "7rem 6vw",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "clamp(8rem, 22vw, 20rem)",
              fontWeight: 700,
              opacity: 0.04,
              whiteSpace: "nowrap",
              color: "#FBF5DD",
              pointerEvents: "none",
              userSelect: "none",
              letterSpacing: "0.05em",
            }}
          >
            BLISS
          </span>
          <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" }}>
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: "1.25rem",
              }}
            >
              Ready to Start?
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 5vw, 4rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                margin: "0 0 1.5rem",
              }}
            >
              Looking Ahead
              <br />
              <em style={{ fontStyle: "italic" }}>with Thara Bliss</em>
            </h2>
            <p style={{ opacity: 0.75, lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Thara Bliss เริ่มต้นจาก Aroma Balm ที่ออกแบบมาเพื่อการพกพาและใช้งานได้ทุกวันในอนาคต เราจะขยายประสบการณ์แห่งความผ่อนคลายนี้ไปสู่ผลิตภัณฑ์สำหรับบ้านและพื้นที่อยู่อาศัย เพื่อให้ทุกพื้นที่สามารถกลายเป็นพื้นที่แห่งความสุขได้เช่นกัน
            </p>
            <a
              href="mailto:tharabliss2025@gmail.com?subject=Inquiry%20from%20Thara%20Bliss%20Website"
              style={{
                display: "inline-block",
                border: "1px solid rgba(251,245,221,0.55)",
                color: "#FBF5DD",
                padding: "0.9rem 2.5rem",
                borderRadius: 40,
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Get in Touch
            </a>
          </div>
        </section>

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
              <p
                style={{
                  color: "rgba(251,245,221,0.5)",
                  lineHeight: 1.8,
                  fontSize: "0.9rem",
                  maxWidth: 280,
                }}
              >
                ไม่ใช่แค่ความหอม แต่คือการดูแลอารมณ์และจิตใจในทุกวัน — เลือกกลิ่นที่สะท้อนตัวตนและอยู่กับคุณในทุกช่วงเวลา
              </p>
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  marginBottom: "1.2rem",
                }}
              >
                Explore
              </p>
              {["Products", "About", "Journal", "Help-Center"].map((link) => (
                <a
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  style={{
                    display: "block",
                    color: "rgba(251,245,221,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
            <div>
              <p
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  opacity: 0.4,
                  marginBottom: "1.2rem",
                }}
              >
                Follow Us
              </p>
              {[
                {
                 icon: <FaInstagram size={18} />,
                 name: "Instagram",
                 href: "https://shorturl.at/AfAPc",
                },
                {
                icon: <FaFacebook  size={18} />,
                name: "Facebook",
                href: "https://shorturl.at/BJPYF",
                },
                {
                icon: <FaTiktok size={17} />,
                name: "TikTok",
                href: "https://www.tiktok.com/@tharabliss?_r=1&_t=ZS-975GjfaqjAe",
                },
                {
                icon: <FaShoppingCart size={18} />,
                name: "Shopee",
                href: "https://shorturl.at/2Eg4w",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    marginRight: "12px",
                    padding: "8px 0",
                    color: "rgba(251,245,221,0.7)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    marginBottom: "0.6rem",
                    transition: "0.2s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(251,245,221,0.12)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(251,245,221,0.5)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "#FBF5DD";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(251,245,221,0.2)";
                    (e.currentTarget as HTMLAnchorElement).style.color = "rgba(251,245,221,0.7)";
                  }}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>
              © 2026 Thara Bliss. All rights reserved.
            </p>
            <p style={{ color: "rgba(251,245,221,0.3)", fontSize: "12px" }}>
              Calm. Balance. Bliss.
            </p>
          </div>
        </footer>
      </main>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          /* Hero: shorter height, less side padding */
          .hero-section {
            height: 80vh !important;
            min-height: 480px !important;
          }
          .hero-content {
            padding: 0 6vw !important;
            max-width: 100% !important;
          }
          .hero-scrim {
            background: linear-gradient(to bottom, rgba(10,22,14,0.35) 0%, rgba(10,22,14,0.75) 75%) !important;
          }
          .scroll-hint {
            display: none !important;
          }

          /* Stats: stack to 1 column for readability */
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }

          /* Brand statement: tighter padding */
          .brand-statement {
            padding: 4rem 6vw !important;
          }

          /* Collections: stack image above text, smaller image height */
          .collection-row {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          .collection-image {
            height: 280px !important;
            order: -1 !important;
          }
          .collection-text {
            padding: 2.5rem 6vw !important;
          }

          /* Services: tighter section padding, stack header */
          .services-section {
            padding: 4rem 6vw !important;
          }
          .services-header {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .services-header p {
            max-width: 100% !important;
          }

          /* Footer: stack columns */
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            height: 75vh !important;
            min-height: 420px !important;
          }
          .collection-image {
            height: 220px !important;
          }
        }
      `}</style>
    </>
  );
}