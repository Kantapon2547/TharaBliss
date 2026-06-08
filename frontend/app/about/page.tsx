"use client";

import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          color: "#2F3A33",
        }}
      >
        {/* Hero */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "7rem 2rem",
            textAlign: "center",
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
            About Thara Bliss
          </p>

          <h1
            style={{
              fontSize: "4rem",
              fontWeight: 300,
              marginTop: "1rem",
            }}
          >
            Inspired By Scent.
            <br />
            Crafted For Bliss.
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "1.5rem auto 0",
              color: "#666",
              lineHeight: 1.9,
            }}
          >
            Creating small moments of calm, balance, and happiness through the
            power of fragrance.
          </p>
        </section>

        {/* OUR STORY */}
        <section
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "6rem 2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 300,
              marginBottom: "2rem",
            }}
          >
            Our Story
          </h2>

          <p
            style={{
              lineHeight: 2,
              color: "#555",
              fontSize: "1.05rem",
            }}
          >
            Thara Bliss เกิดขึ้นจากความเชื่อที่เรียบง่ายว่า
            "กลิ่นหอมสามารถเปลี่ยนช่วงเวลาธรรมดาให้กลายเป็นช่วงเวลาที่พิเศษได้"
            ในโลกที่เต็มไปด้วยความเร่งรีบ เราอยากสร้างสิ่งเล็ก ๆ
            ที่ช่วยให้ผู้คนได้หยุดพัก หายใจลึกขึ้น
            และกลับมาอยู่กับตัวเองอีกครั้ง
            ผ่านพลังของกลิ่นหอมที่ถูกคัดสรรอย่างพิถีพิถัน
          </p>
        </section>

        {/* POWER OF SCENT */}
        <section
          style={{
            background: "#FFFFFF",
            padding: "6rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              The Power of Scent
            </h2>

            <p
              style={{
                lineHeight: 2,
                color: "#555",
              }}
            >
              กลิ่นเป็นภาษาที่มองไม่เห็น แต่สัมผัสได้ด้วยความรู้สึก
              กลิ่นหนึ่งอาจพาเราย้อนกลับไปยังความทรงจำที่งดงาม
              อีกกลิ่นหนึ่งอาจช่วยปลอบประโลมหัวใจในวันที่เหนื่อยล้า
            </p>

            <p
              style={{
                lineHeight: 2,
                color: "#555",
                marginTop: "1.5rem",
              }}
            >
              ที่ Thara Bliss เราเชื่อว่ากลิ่นไม่ได้เป็นเพียงความหอม
              แต่เป็นส่วนหนึ่งของอารมณ์ ความทรงจำ
              และคุณภาพชีวิตในแต่ละวัน
            </p>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "6rem 2rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "3rem",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 300,
              }}
            >
              Our Philosophy
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(280px,1fr))",
              gap: "2rem",
            }}
          >
            {[
              {
                title: "Calm",
                text: "สร้างพื้นที่แห่งความสงบให้เกิดขึ้นได้ทุกที่ ไม่ว่าจะอยู่ที่บ้าน ที่ทำงาน หรือระหว่างการเดินทาง",
              },
              {
                title: "Balance",
                text: "ช่วยคืนความสมดุลให้กับร่างกายและจิตใจ ผ่านช่วงเวลาสั้น ๆ ของการหยุดพักและการหายใจอย่างมีสติ",
              },
              {
                title: "Bliss",
                text: "เติมเต็มความสุขเล็ก ๆ ที่เกิดขึ้นได้ในทุกวัน เพราะเราเชื่อว่าความสุขไม่ได้มาจากสิ่งยิ่งใหญ่เสมอไป",
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "24px",
                  padding: "2rem",
                  border: "1px solid #EFEAE1",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    color: "#0F6E56",
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
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* OUR CRAFT */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "6rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 300,
                marginBottom: "2rem",
              }}
            >
              Our Craft
            </h2>

            <p
              style={{
                lineHeight: 2,
                color: "#555",
              }}
            >
              ทุกผลิตภัณฑ์ของ Thara Bliss
              ได้รับการพัฒนาโดยให้ความสำคัญกับประสบการณ์การใช้งานเป็นหัวใจสำคัญ
              เราเลือกใช้ส่วนผสมและกลิ่นหอมที่ให้ความรู้สึกนุ่มนวล สง่างาม
              และผ่อนคลาย
              เพื่อให้ทุกครั้งที่ใช้งานเป็นช่วงเวลาแห่งการดูแลตัวเองอย่างแท้จริง
            </p>
          </div>
        </section>

        {/* LOOKING AHEAD */}
        <section
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            padding: "6rem 2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 300,
              marginBottom: "2rem",
            }}
          >
            Looking Ahead
          </h2>

          <p
            style={{
              lineHeight: 2,
              color: "#555",
            }}
          >
            Thara Bliss เริ่มต้นจาก Aroma Balm
            ที่ออกแบบมาเพื่อการพกพาและใช้งานได้ทุกวัน
            ในอนาคตเราจะขยายประสบการณ์แห่งความผ่อนคลายนี้ไปสู่ผลิตภัณฑ์สำหรับบ้านและพื้นที่อยู่อาศัย
            เพื่อให้ทุกพื้นที่สามารถกลายเป็นพื้นที่แห่งความสุขได้เช่นกัน
          </p>
        </section>

        {/* Footer Banner */}
        <section
          style={{
            background: "#0F6E56",
            color: "#FFFFFF",
            textAlign: "center",
            padding: "5rem 2rem",
          }}
        >
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 300,
            }}
          >
            Calm. Balance. Bliss.
          </h2>

          <p
            style={{
              marginTop: "1rem",
              opacity: 0.9,
            }}
          >
            More than fragrance — a daily ritual of well-being.
          </p>
        </section>
      </main>
    </>
  );
}