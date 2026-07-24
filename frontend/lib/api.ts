const API_URL = process.env.NEXT_PUBLIC_API_URL;

console.log("API_URL =", API_URL);
console.log("REQUEST =", `${API_URL}/api/products/`);

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

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
  is_set_product?: boolean;
}

export interface SiteSettings {
  shopee_regular_url: string | null;
  shopee_set_url: string | null;
  tiktok_url: string | null;
}

export interface Announcement {
  id: number;
  message: string;
  product_name: string;
  product_id: number;
  product_image_url: string;
  created_at: string;
}

export async function getProducts(): Promise<Product[]> {
  try {
    // test loading state
    console.log("API_URL =", API_URL);

    const res = await fetch(`${API_URL}/api/products/`, {
      next: { revalidate: 60 }
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
    const url = `${API_URL}/api/products/${id}/`;

    console.log("GET PRODUCT:", url);

    const res = await fetch(url, {
      next: { revalidate: 60 }
    });

    console.log("PRODUCT STATUS:", res.status);

    if (!res.ok) {
      const body = await res.text();
      console.log("PRODUCT ERROR BODY:", body);

      throw new Error(`Failed: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return null;
  }
}

export async function getSettings(): Promise<SiteSettings | null> {
  try {
    const res = await fetch(`${API_URL}/api/site-settings/`, {
      next: { revalidate: 60 }
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

export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const res = await fetch(`${API_URL}/api/announcements/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return res.json();
  } catch (error) {
    console.error("ANNOUNCEMENTS FETCH ERROR:", error);
    return [];
  }
}