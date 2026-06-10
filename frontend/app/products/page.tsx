import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  scent: string;
  image: string | null;
  category?: {
    id: number;
    name: string;
  };
}

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/products/",
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error(
        "Failed to fetch products:",
        res.status
      );
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const products = await getProducts();

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
        {/* HERO */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "6rem 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                color: "#6E7C72",
                fontSize: "12px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              Product Collection
            </p>

            <h1
              style={{
                fontSize: "3.5rem",
                fontWeight: 300,
                color: "#2F3A33",
                marginBottom: "1.5rem",
              }}
            >
              Explore Our Products
            </h1>

            <p
              style={{
                color: "#666",
                lineHeight: 1.9,
                fontSize: "1rem",
              }}
            >
              Aromatic Balm สูตรพรีเมียม ✔ Alcohol Free ✔
              Paraben Free ✔ SLES Free ✔ ผ่านการรับรองจาก อย.
              บาล์มอโรมาสัญชาติไทยที่ออกแบบกลิ่นให้หอมละมุน
              ใช้ได้ทุกวัน ช่วยผ่อนคลาย สดชื่น
              และดูแลอารมณ์อย่างอ่อนโยน
            </p>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "4rem 2rem 6rem",
          }}
        >
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#666",
                padding: "4rem 0",
              }}
            >
              No products found.
            </div>
          ) : (
            <>
              <div
                style={{
                  marginBottom: "2.5rem",
                }}
              >
                <h2
                  style={{
                    fontSize: "2rem",
                    fontWeight: 300,
                    color: "#2F3A33",
                    textAlign: "center",
                  }}
                >
                  Featured Collection
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                }}
              >
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        {/* CTA */}
        <section
          style={{
            background: "#F8F5EE",
            padding: "5rem 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "#2F3A33",
                marginBottom: "1rem",
              }}
            >
              Discover Your Signature Scent
            </h2>

            <p
              style={{
                color: "#666",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              เลือกสรรผลิตภัณฑ์กลิ่นหอมที่สะท้อนตัวตนของคุณ
              พร้อมเติมเต็มช่วงเวลาแห่งความผ่อนคลาย
            </p>
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
          <h3
            style={{
              color: "#2F3A33",
              marginBottom: ".5rem",
            }}
          >
            Thara Bliss
          </h3>

          <p style={{ color: "#666" }}>
            Luxury Aromatic Products & Wellness Collection
          </p>

          <p
            style={{
              color: "#999",
              fontSize: "12px",
              marginTop: "1rem",
            }}
          >
            © 2026 Thara Bliss. All rights reserved.
          </p>
        </footer>
      </main>
    </>
  );
}