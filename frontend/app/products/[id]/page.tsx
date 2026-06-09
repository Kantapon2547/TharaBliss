import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

async function getProduct(id: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/api/products/${id}/`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch product`);
  }

  return res.json();
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <>
      <Navbar />

      <main
        style={{
          background: "#FAFAF7",
          minHeight: "100vh",
          padding: "4rem 2rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Product Image */}
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid #eee",
            }}
          >
            {product.image && (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "600px",
                }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p
              style={{
                color: "#0F6E56",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              {product.category?.name}
            </p>

            <h1
              style={{
                fontSize: "3rem",
                fontWeight: 300,
                color: "#2F3A33",
                marginTop: "0.5rem",
              }}
            >
              {product.name}
            </h1>

            <p
              style={{
                marginTop: "1rem",
                color: "#666",
              }}
            >
              Scent: {product.scent}
            </p>

            <div
              style={{
                marginTop: "1.5rem",
                fontSize: "2rem",
                fontWeight: 600,
                color: "#0F6E56",
              }}
            >
              ฿{product.price}
            </div>

            <p
              style={{
                marginTop: "2rem",
                lineHeight: 1.9,
                color: "#555",
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "1rem",
              }}
            >
              <button
                style={{
                  padding: "14px 24px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#0F6E56",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Add to Cart
              </button>

              <Link href="/contact">
                <button
                  style={{
                    padding: "14px 24px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div
          style={{
            maxWidth: "1200px",
            margin: "3rem auto 0",
          }}
        >
          <Link
            href="/products"
            style={{
              color: "#0F6E56",
              textDecoration: "none",
            }}
          >
            ← Back to Products
          </Link>
        </div>
      </main>
    </>
  );
}