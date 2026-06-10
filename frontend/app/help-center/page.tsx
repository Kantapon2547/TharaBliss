"use client";

import Navbar from "../../components/Navbar";

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "จัดส่งสินค้านานแค่ไหน?",
      answer:
        "คำสั่งซื้อจะได้รับการดำเนินการภายใน 1–3 วันทำการ และจัดส่งภายใน 3–7 วันทำการ ขึ้นอยู่กับพื้นที่จัดส่ง",
    },
    {
      question: "มีบริการจัดส่งต่างประเทศหรือไม่?",
      answer:
        "ปัจจุบันเราจัดส่งภายในประเทศไทยเป็นหลัก สำหรับการจัดส่งต่างประเทศ กรุณาติดต่อทีมงานเพื่อสอบถามเพิ่มเติม",
    },
    {
      question: "สามารถติดตามสถานะคำสั่งซื้อได้อย่างไร?",
      answer:
        "หลังจากจัดส่งสินค้าแล้ว เราจะแจ้งเลขพัสดุผ่านช่องทางที่ท่านใช้สั่งซื้อ เพื่อใช้ติดตามสถานะการจัดส่ง",
    },
    {
      question: "สามารถเปลี่ยนหรือคืนสินค้าได้หรือไม่?",
      answer:
        "หากพบปัญหาเกี่ยวกับสินค้า กรุณาติดต่อทีมงานภายใน 7 วันหลังได้รับสินค้า เพื่อให้เราช่วยดูแลอย่างเหมาะสม",
    },
    {
      question: "ผลิตภัณฑ์เหมาะสำหรับผิวแพ้ง่ายหรือไม่?",
      answer:
        "เราแนะนำให้ศึกษาส่วนผสมก่อนใช้งาน และทดสอบการแพ้ในบริเวณเล็ก ๆ ก่อนใช้งานจริง",
    },
  ];

  const quickLinks = [
    {
      title: "คำสั่งซื้อและการชำระเงิน",
      description:
        "ข้อมูลเกี่ยวกับการสั่งซื้อ การชำระเงิน และสถานะคำสั่งซื้อ",
    },
    {
      title: "การจัดส่งสินค้า",
      description:
        "ระยะเวลาจัดส่ง ค่าจัดส่ง และการติดตามพัสดุ",
    },
    {
      title: "ข้อมูลผลิตภัณฑ์",
      description:
        "รายละเอียดสินค้า ส่วนผสม และวิธีการใช้งาน",
    },
    {
      title: "บริการ OEM",
      description:
        "รับผลิตแบรนด์ของคุณเอง พร้อมบริการออกแบบครบวงจร",
    },
  ];

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          fontFamily:
            "'Helvetica Neue', Helvetica, Arial, sans-serif",
        }}
      >
        {/* Hero */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "6rem 2rem",
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
            CUSTOMER CARE
          </p>

          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 300,
              color: "#2F3A33",
              marginTop: "1rem",
            }}
          >
            ศูนย์ช่วยเหลือ
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "1.5rem auto",
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            ค้นหาคำตอบเกี่ยวกับการสั่งซื้อ การจัดส่งสินค้า
            ผลิตภัณฑ์ บริการ OEM และการติดต่อทีมงานของเรา
          </p>

          <input
            type="text"
            placeholder="ค้นหาคำถามที่ต้องการ..."
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "16px 20px",
              borderRadius: "16px",
              border: "1px solid #ddd",
              fontSize: "16px",
              outline: "none",
              background: "#fff",
            }}
          />
        </section>

        {/* Quick Links */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 2rem",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {quickLinks.map((item) => (
            <div
              key={item.title}
              style={{
                background: "#fff",
                padding: "2rem",
                borderRadius: "20px",
                border: "1px solid #ECE8DF",
                boxShadow:
                  "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <h3
                style={{
                  color: "#2F3A33",
                  marginBottom: "0.75rem",
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  color: "#666",
                  lineHeight: 1.7,
                }}
              >
                {item.description}
              </p>
            </div>
          ))}
        </section>

        {/* FAQ */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "0 2rem 5rem",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              color: "#2F3A33",
              fontSize: "2rem",
              fontWeight: 400,
            }}
          >
            คำถามที่พบบ่อย
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {faqs.map((faq) => (
              <details
                key={faq.question}
                style={{
                  background: "#fff",
                  borderRadius: "16px",
                  padding: "1.5rem",
                  border: "1px solid #ECE8DF",
                }}
              >
                <summary
                  style={{
                    cursor: "pointer",
                    fontWeight: 600,
                    color: "#2F3A33",
                  }}
                >
                  {faq.question}
                </summary>

                <p
                  style={{
                    marginTop: "1rem",
                    color: "#666",
                    lineHeight: 1.8,
                  }}
                >
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Aroma Guide */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 2rem 5rem",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#2F3A33",
              marginBottom: "3rem",
              fontSize: "2rem",
              fontWeight: 400,
            }}
          >
            คู่มือเลือกกลิ่น
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <div style={guideCard}>
              <h3>Thara Mist</h3>
              <p>
                กลิ่นหอมอ่อนโยน ช่วยสร้างบรรยากาศแห่งการผ่อนคลาย
                เหมาะสำหรับช่วงเวลาพักผ่อน
              </p>
            </div>

            <div style={guideCard}>
              <h3>Poised Pear & Freesia</h3>
              <p>
                กลิ่นดอกไม้และผลไม้ที่หรูหรา
                เหมาะสำหรับการใช้งานในชีวิตประจำวัน
              </p>
            </div>

            <div style={guideCard}>
              <h3>Aqua No.1</h3>
              <p>
                กลิ่นสะอาด สดชื่น และมีชีวิตชีวา
                ให้ความรู้สึกโปร่งสบายตลอดวัน
              </p>
            </div>
          </div>
        </section>

        {/* Support */}
        <section
          style={{
            background: "#FBF5DD",
            textAlign: "center",
            padding: "5rem 2rem",
          }}
        >
          <h2
            style={{
              color: "#2F3A33",
              marginBottom: "1rem",
              fontSize: "2.5rem",
              fontWeight: 300,
            }}
          >
            ต้องการความช่วยเหลือเพิ่มเติม?
          </h2>

          <p
            style={{
              color: "#666",
              maxWidth: "650px",
              margin: "0 auto 2rem",
              lineHeight: 1.8,
            }}
          >
            ทีมงานของเราพร้อมให้คำแนะนำเกี่ยวกับผลิตภัณฑ์
            การสั่งซื้อ บริการ OEM และความร่วมมือทางธุรกิจ
          </p>

          <a
            href="mailto:hello@tharabliss.com"
            style={{
              background: "#0F6E56",
              color: "#fff",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "12px",
              fontWeight: 600,
              display: "inline-block",
            }}
          >
            ติดต่อทีมงาน
          </a>
        </section>
      </main>
    </>
  );
}

const guideCard = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "20px",
  border: "1px solid #ECE8DF",
  boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
} as const;
