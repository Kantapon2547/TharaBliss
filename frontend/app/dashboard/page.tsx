"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";

const HERO = {
  img: "/images/banner/tharabliss_banner.png",
  title: "Create Your Own",
  subtitle:
    "พกพาความสงบไปได้ทุกที่ เพียงแต้มเบา ๆ แล้วสูดหายใจลึก ๆ ให้กลิ่นหอมช่วยเติมความสดชื่น ผ่อนคลายความตึงเครียด และคืนสมดุลให้กับวันของคุณ",
};

const STATS = [
  {
    label: "Products",
    value: "128",
    delta: "↑ 6 this month",
  },
  {
    label: "Categories",
    value: "12",
    delta: "Stable",
  },
  {
    label: "Inquiries",
    value: "42",
    delta: "↑ 8 new today",
  },
  {
    label: "Testimonials",
    value: "18",
    delta: "↑ 2 this week",
  },
];

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

export default function DashboardPage() {
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
        <section
          style={{
            position: "relative",
            height: "700px",
            overflow: "hidden",
          }}
        >
          <Image
            src={HERO.img}
            alt={HERO.title}
            fill
            priority
            style={{
              objectFit: "cover",
            }}
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
              padding: "8rem 2rem",
            }}
          >
            <p
              style={{
                color: "#6E7C72",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              Welcome to TharaBliss
            </p>

            <h1
              style={{
                fontSize: "4.5rem",
                fontWeight: 300,
                lineHeight: 1.1,
                maxWidth: "700px",
                marginTop: "1rem",
              }}
            >
              {HERO.title}
            </h1>

            <p
              style={{
                maxWidth: "650px",
                fontSize: "1.1rem",
                color: "#555",
                lineHeight: 1.8,
                marginTop: "1.5rem",
              }}
            >
              {HERO.subtitle}
            </p>

            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <button
                style={{
                  background: "#0F6E56",
                  color: "#fff",
                  border: "none",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Explore Products
              </button>

              <button
                style={{
                  background: "#fff",
                  color: "#0F6E56",
                  border: "1px solid #9FCBAD",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Request Consultation
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "4rem 2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: "1.5rem",
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <p
                style={{
                  color: "#888",
                  fontSize: "13px",
                }}
              >
                {stat.label}
              </p>

              <h2
                style={{
                  fontSize: "42px",
                  margin: "12px 0",
                }}
              >
                {stat.value}
              </h2>

              <p
                style={{
                  color: "#0F6E56",
                  fontSize: "13px",
                }}
              >
                {stat.delta}
              </p>
            </div>
          ))}
        </section>

        {/* SERVICES */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 2rem 6rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <p
              style={{
                color: "#6E7C72",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "12px",
              }}
            >
              Our Services
            </p>

            <h2
              style={{
                fontSize: "3rem",
                fontWeight: 300,
                marginTop: "1rem",
              }}
            >
              End-to-End Manufacturing Solutions
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: "2rem",
            }}
          >
            {SERVICES.map((service) => (
              <div
                key={service.title}
                style={{
                  background: "#fff",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    height: "260px",
                  }}
                >
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div
                  style={{
                    padding: "1.75rem",
                  }}
                >
                  <h3
                    style={{
                      marginBottom: "1rem",
                    }}
                  >
                    {service.title}
                  </h3>

                  <p
                    style={{
                      color: "#666",
                      lineHeight: 1.8,
                    }}
                  >
                    {service.desc}
                  </p>
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
            borderTop: "1px solid #ECE8DF",
          }}
        >
          <h3
            style={{
              marginBottom: "0.5rem",
            }}
          >
            TharaBliss
          </h3>

          <p
            style={{
              color: "#666",
            }}
          >
            Luxury OEM & ODM Manufacturing
          </p>

          <p
            style={{
              color: "#999",
              fontSize: "12px",
              marginTop: "1rem",
            }}
          >
            © 2026 TharaBliss. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}