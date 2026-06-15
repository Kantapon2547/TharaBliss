const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL =", API_URL);
console.log("REQUEST =", `${API_URL}/api/products/`);

export interface Product {
  id: number; name: string;
  description: string;
  price: string;
  scent: string;
  image: string | null;
  images?: string[];
  category?: {
    id: number; name: string;
    slug?: string;
  };
  ingredients?: string;
  how_to_use?: string;
  fragrance_notes?: {
    label: string;
    notes: string;
  }[];
  sizes?: {
    label: string;
    price: string;
  }[];
}

export interface SiteSettings {
  shopee_regular_url: string | null;
  shopee_set_url: string | null;
  tiktok_url: string | null;
}

export async function getProducts(): Promise<Product[]> {
  try {
    console.log("API_URL =", API_URL);

    const res = await fetch(`${API_URL}/api/products/`, {
      cache: "no-store",
    });

    console.log("STATUS =", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.log("STATUS:", res.status);
      console.log("BODY:", text);

      throw new Error(`Failed: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return [];
  }
}

export async function getProduct(
  id: number | string
): Promise<Product | null> {
  try {
    const res = await fetch(`${API_URL}/api/products/${id}/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${API_URL}/api/site-settings/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}