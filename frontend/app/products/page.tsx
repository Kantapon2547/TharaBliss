import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";

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
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ProductsPage() {
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
        {/* Hero */}
        <section
          style={{
            background: "#FBF5DD",
            padding: "5rem 2rem",
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
            Product Collection
          </p>

          <h1
            style={{
              fontSize: "3.5rem",
              fontWeight: 300,
              color: "#2F3A33",
              marginTop: "1rem",
            }}
          >
            Explore Our Products
          </h1>

          <p
            style={{
              maxWidth: "650px",
              margin: "1.5rem auto 0",
              color: "#666",
              lineHeight: 1.8,
            }}
          >
            Aromatic Balm สูตรพรีเมียม
            ✔ Alcohol Free
            ✔ Paraben Free
            ✔ SLES Free
            ✔ ผ่านการรับรองจาก อย.
            บาล์มอโรมาสัญชาติไทย ที่ออกแบบกลิ่นให้ หอมละมุน ใช้ได้ทุกวัน
            ช่วยผ่อนคลาย สดชื่น และดูแลอารมณ์อย่างอ่อนโยน
            เนื้อบาล์มให้ความเย็นแบบสบายผิว ไม่แสบร้อน เหมือนยาหม่องทั่วไป
            สามารถใช้ได้ทั้งเป็น Aroma Balm และแทนน้ำหอม
          </p>
        </section>

        {/* Products */}
        <section
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "3rem 2rem",
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
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(280px,1fr))",
                gap: "2rem",
              }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: "#fff",
                    borderRadius: "20px",
                    overflow: "hidden",
                    border: "1px solid #F1EFE9",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      height: "320px",
                      background: "#f5f5f5",
                    }}
                  >
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{
                        objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#888",
                        }}
                      >
                        No Image
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "1.5rem",
                    }}
                  >
                    <p
                      style={{
                        color: "#0F6E56",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {product.category?.name || "Aroma Product"}
                    </p>

                    <h3
                      style={{
                        color: "#2F3A33",
                        marginTop: "0.5rem",
                        marginBottom: "0.75rem",
                        fontWeight: 500,
                      }}
                    >
                      {product.name}
                    </h3>

                    <p
                      style={{
                        color: "#666",
                        lineHeight: 1.7,
                        fontSize: "14px",
                        minHeight: "72px",
                      }}
                    >
                      {product.description}
                    </p>

                    <div
                      style={{
                        marginTop: "1rem",
                        color: "#2F3A33",
                        fontWeight: 600,
                      }}
                    >
                      ฿{product.price}
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      style={{
                        display: "block",
                        textDecoration: "none",
                      }}
                    >
                      <button
                        style={{
                          marginTop: "1.25rem",
                          width: "100%",
                          padding: "12px",
                          background: "#0F6E56",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        View Product
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}