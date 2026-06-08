import Navbar from "@/components/Navbar";

export default function JournalPage() {
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
        {/* HERO */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "6rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 300,
              marginBottom: "1rem",
            }}
          >
            Journal
          </h1>

          <p style={{ color: "#666", maxWidth: 700, margin: "0 auto" }}>
            STORIES, SCENTS & MOMENTS:
            <br />
            เรื่องราว แรงบันดาลใจ และศาสตร์แห่งกลิ่นหอมสำหรับการใช้ชีวิตอย่างมีความสุข
          </p>
        </section>

        {/* CONTENT */}
        <section
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "5rem 2rem",
          }}
        >
          <Article
            title="Why Scent Matters More Than You Think"
            subtitle="ทำไมกลิ่นหอมจึงส่งผลต่อความรู้สึกของเรา"
            text="กลิ่นเป็นประสาทสัมผัสเพียงอย่างเดียวที่เชื่อมโยงกับส่วนของสมองที่เกี่ยวข้องกับอารมณ์และความทรงจำโดยตรง นั่นคือเหตุผลที่บางกลิ่นสามารถทำให้เรารู้สึกผ่อนคลาย อบอุ่น หรือคิดถึงช่วงเวลาบางช่วงได้ทันที"
          />

          <Article
            title="The Art of Slowing Down"
            subtitle="ศิลปะแห่งการใช้ชีวิตให้ช้าลง"
            text="บางครั้งความสุขอาจเริ่มต้นจากเรื่องง่าย ๆ การจิบชาอุ่น ๆ การอ่านหนังสือเล่มโปรด หรือการสูดลมหายใจลึก ๆ พร้อมกลิ่นหอมที่คุณชื่นชอบ การใช้ชีวิตอย่างช้าลงไม่ได้หมายถึงการทำอะไรน้อยลง แต่คือการรับรู้ช่วงเวลาตรงหน้าได้มากขึ้น"
          />

          <Article
            title="How to Create a Relaxing Atmosphere at Home"
            subtitle="เปลี่ยนบ้านให้เป็นพื้นที่แห่งความผ่อนคลาย"
            text="เริ่มต้นจากแสงธรรมชาติที่นุ่มนวล เสียงเพลงเบา ๆ มุมพักผ่อนที่เป็นระเบียบ และกลิ่นหอมที่ช่วยสร้างบรรยากาศให้บ้านรู้สึกอบอุ่นและน่าอยู่มากยิ่งขึ้น"
          />

          <Article
            title="Morning Rituals for a Better Day"
            subtitle="เริ่มต้นวันใหม่ด้วยความสงบ"
            text="ก่อนหยิบโทรศัพท์ขึ้นมา ลองให้เวลากับตัวเองสัก 5 นาที หายใจลึก ๆ ยืดร่างกายเบา ๆ และเลือกกลิ่นหอมที่ช่วยปลุกความสดชื่นให้กับเช้าวันใหม่ บางครั้งวันดี ๆ อาจเริ่มต้นจากรายละเอียดเล็ก ๆ เหล่านี้"
          />

          <Article
            title="Behind The Brand"
            subtitle="จุดเริ่มต้นของ Thara Bliss"
            text="Thara Bliss เกิดขึ้นจากความหลงใหลในศาสตร์แห่งกลิ่นหอมและความเชื่อว่าการดูแลตัวเองไม่จำเป็นต้องซับซ้อน เราอยากสร้างผลิตภัณฑ์ที่สามารถอยู่ร่วมกับชีวิตประจำวันได้อย่างเป็นธรรมชาติ พร้อมมอบช่วงเวลาแห่งความสงบและความสุขในทุกวัน"
          />
        </section>
      </main>
    </>
  );
}

function Article({ title, subtitle, text }) {
  return (
    <div
      style={{
        marginBottom: "3rem",
        paddingBottom: "2rem",
        borderBottom: "1px solid #E9E3D8",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", fontWeight: 400 }}>{title}</h2>

      <p
        style={{
          color: "#0F6E56",
          marginTop: "0.5rem",
          marginBottom: "1rem",
          fontSize: "0.95rem",
        }}
      >
        {subtitle}
      </p>

      <p
        style={{
          lineHeight: 2,
          color: "#555",
        }}
      >
        {text}
      </p>
    </div>
  );
}