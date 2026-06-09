"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";

const HERO = {
  img: "/images/banner/tharabliss_banner.png",
  title: "Create Your Own",
  subtitle:
    "พกพาความสงบไปได้ทุกที่ เพียงแต้มเบา ๆ แล้วสูดหายใจลึก ๆ ให้กลิ่นหอมช่วยเติมความสดชื่น ผ่อนคลายความตึงเครียด และคืนสมดุลให้กับวันของคุณ",
};

const SERVICES = [
  {
    img: "/images/services/rd-customize.jpg",
    title: "R&D Customize",
    desc: "Custom fragrance and cosmetics formulation tailored specifically for your brand.",
  },
  {
    img: "/images/services/design.jpg",
    title: "Packaging Design",
    desc: "Premium label, bottle and packaging design with luxury branding support.",
  },
  {
    img: "/images/services/shop.jpg",
    title: "Retail Ready",
    desc: "Launch-ready products prepared for retail stores, online channels and marketplaces.",
  },
];

const CONTENT = {
  scents: {
    title: "THE SCENT COLLECTIONS",
    subtitle:
      "กลิ่นของ Thara Bliss ถูกพัฒนาขึ้นอย่างตั้งใจใน 3 แนวกลิ่นหลัก ซึ่งสะท้อนอารมณ์และการใช้งานที่แตกต่างกัน เพื่อให้สามารถเลือกใช้ได้อย่างเหมาะสมกับแต่ละช่วงเวลาและพื้นที่",

    collections: [
      {
        image: "/images/services/design1.jpg",
        title: "CALM RITUALS",
        icon: "🌿",
        description:
          "กลิ่นหอมแนวผ่อนคลาย ช่วยสร้างความสงบ ผ่อนคลายความตึงเครียด และช่วยเตรียมร่างกายให้พร้อมสำหรับการพักผ่อน",
      },

      {
        image: "/images/services/design2.jpg",
        title: "MODERN ELEGANCE",
        icon: "🏛️",
        description:
          "กลิ่นหอมที่สะท้อนความเรียบหรู ความสง่างาม และความมั่นใจ เหมาะสำหรับพื้นที่ที่ต้องการภาพลักษณ์ที่ดูมีระดับ",
      },

      {
        image: "/images/services/design3.jpg",
        title: "WARM IMPRESSIONS",
        icon: "☀️",
        description:
          "กลิ่นหอมอบอุ่น นุ่มนวล และเป็นกันเอง ช่วยสร้างความรู้สึกสบายใจและความประทับใจที่ยาวนาน",
      },
    ],
  },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("scents");
  const current = CONTENT[activeTab];

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          color: "#2F3A33",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* HERO */}
        <section style={{ position: "relative", minHeight: "650px", overflow: "hidden" }}>
          <Image
            src={HERO.img}
            alt={HERO.title}
            fill
            priority
            style={{ objectFit: "cover" }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(250,250,247,0.95), rgba(250,250,247,0.35))",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "7rem 2rem",
            }}
          >
            <p style={{ color: "#6E7C72", fontSize: "12px", letterSpacing: "0.15em" }}>
              Welcome to TharaBliss
            </p>

            <h1 style={{ fontSize: "4.5rem", fontWeight: 300 }}>
              {HERO.title}
            </h1>

            <p style={{ maxWidth: "650px", fontSize: "1.1rem", color: "#555" }}>
              {HERO.subtitle}
            </p>
          </div>
        </section>

        {/* BRAND */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "8rem 2rem 6rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "3rem", fontWeight: 300 }}>THARA BLISS</h2>

          <p style={{ fontSize: "1.2rem", lineHeight: 2, color: "#555" }}>
            สัมผัสประสบการณ์กลิ่นหอมที่ได้รับแรงบันดาลใจจากความสงบ ความหรูหรา
            และช่วงเวลาที่น่าจดจำ...
          </p>
        </section>

        {/* SCENT COLLECTIONS */}
<section
  style={{
    background: "#F5F2EB",
    paddingTop: "5rem",
    paddingBottom: "5rem",
  }}
>
  <div
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
    }}
  >
    <div
      style={{
        textAlign: "center",
        maxWidth: "900px",
        margin: "0 auto 4rem",
        padding: "0 2rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: 300,
          letterSpacing: "0.08em",
          marginBottom: "1rem",
        }}
      >
        {current.title}
      </h2>

      <p
        style={{
          color: "#666",
          lineHeight: 1.8,
        }}
      >
        {current.subtitle}
      </p>
    </div>

    {current.collections.map((item, index) => (
      <div
        key={item.title}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "320px",
        }}
      >
        {/* IMAGE LEFT */}
        {index % 2 === 0 && (
          <div
            style={{
              position: "relative",
              minHeight: "320px",
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* TEXT */}
        <div
          style={{
            background: "#F5F2EB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
          }}
        >
          <div
            style={{
              maxWidth: "450px",
            }}
          >
            <div
              style={{
                width: "70px",
                height: "70px",
                border: "1px solid #B9B2A3",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.5rem",
                fontSize: "1.5rem",
              }}
            >
              {item.icon}
            </div>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 300,
                letterSpacing: "0.05em",
                marginBottom: "1rem",
                color: "#45524B",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                color: "#666",
                lineHeight: 1.9,
              }}
            >
              {item.description}
            </p>
          </div>
        </div>

        {/* IMAGE RIGHT */}
        {index % 2 === 1 && (
          <div
            style={{
              position: "relative",
              minHeight: "320px",
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    ))}

    <div
      style={{
        textAlign: "center",
        padding: "4rem 2rem 0",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <p
        style={{
          color: "#666",
          lineHeight: 2,
        }}
      >
        กลิ่นหอมแต่ละคอลเลกชันได้รับการออกแบบอย่างพิถีพิถัน
        เพื่อสะท้อนอารมณ์และประสบการณ์ที่แตกต่างกัน
        พร้อมยกระดับบรรยากาศในทุกพื้นที่ให้เต็มไปด้วยความผ่อนคลาย
        ความสง่างาม และความทรงจำที่น่าประทับใจ
      </p>
    </div>
  </div>
</section>

        {/* SERVICES */}
        <section
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "3rem 2rem 6rem",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p style={{ color: "#6E7C72", fontSize: "12px" }}>Our Services</p>
            <h2 style={{ fontSize: "2.5rem", fontWeight: 300 }}>
              End-to-End Manufacturing Solutions
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {SERVICES.map((service) => (
              <div
                key={service.title}
                style={{
                  background: "#fff",
                  borderRadius: "18px",
                  overflow: "hidden",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.05)",
                }}
              >
                <div style={{ position: "relative", height: "180px" }}>
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <div style={{ padding: "1.25rem" }}>
                  <h3>{service.title}</h3>
                  <p style={{ color: "#666" }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            background: "#FBF5DD",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <h3>TharaBliss</h3>
          <p style={{ color: "#666" }}>Luxury OEM & ODM Manufacturing</p>
          <p style={{ color: "#999", fontSize: "12px" }}>
            © 2026 TharaBliss. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}