import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

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
    slug?: string;
  };
}

interface SiteSettings {
  shopee_regular_url: string | null;
  shopee_set_url: string | null;
  tiktok_url: string | null;
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/products/${id}/`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
  }
}

async function getSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(
      "http://127.0.0.1:8000/api/site-settings/",
      { cache: "no-store" }
    );

    if (!res.ok) {
      console.error("getSettings failed:", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("getSettings error:", err);
    return null;
  }
}

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, settings] = await Promise.all([
    getProduct(id),
    getSettings(),
  ]);

  if (!product) {
    return (
      <>
        <Navbar />
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1>Product not found</h1>
        </main>
      </>
    );
  }

  const categoryName = product.category?.name?.toLowerCase() || "";
const categorySlug = product.category?.slug?.toLowerCase() || "";

const isSet =
  categoryName.includes("set") ||
  categorySlug.includes("set") ||
  categoryName.includes("duo") ||
  categoryName.includes("trio") ||
  categoryName.includes("bundle");

  const shopeeUrl =
  isSet && settings?.shopee_set_url
    ? settings.shopee_set_url
    : settings?.shopee_regular_url;

  const tiktokUrl = settings?.tiktok_url;

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
          {/* IMAGE */}
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid #eee",
            }}
          >
            {product.image ? (
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
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <div
                style={{
                  height: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                }}
              >
                No Image
              </div>
            )}
          </div>

          {/* INFO */}
          <div>
            <p
              style={{
                color: "#0F6E56",
                textTransform: "uppercase",
                fontSize: "12px",
              }}
            >
              {product.category?.name || "Uncategorized"}
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

            <p style={{ marginTop: "1rem", color: "#666" }}>
              Scent: {product.scent}
            </p>

            <div
              style={{
                marginTop: "1rem",
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

            {/* BUTTONS */}
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
              }}
            >
              {/* SHOPEE */}
              {shopeeUrl && (
                <Link href={shopeeUrl} target="_blank">
                  <button
                    style={{
                      padding: "14px 24px",
                      border: "none",
                      borderRadius: "12px",
                      background: "#EE4D2D",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Buy on Shopee
                  </button>
                </Link>
              )}

              {/* TIKTOK */}
              {tiktokUrl && (
                <Link href={tiktokUrl} target="_blank">
                  <button
                    style={{
                      padding: "14px 24px",
                      border: "none",
                      borderRadius: "12px",
                      background: "#000",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Buy on TikTok
                  </button>
                </Link>
              )}

              {/* BACK */}
              <Link href="/products">
                <button
                  style={{
                    padding: "14px 24px",
                    borderRadius: "12px",
                    border: "1px solid #ddd",
                    background: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}