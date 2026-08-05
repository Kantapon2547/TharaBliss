import { NextRequest, NextResponse } from "next/server";
import { getProducts, getProduct, getSettings, Product } from "@/lib/api";

// ── Config ──
// Override via .env.local if Ollama runs elsewhere (e.g. a different machine/port)
const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const MODEL = process.env.OLLAMA_MODEL || "qwen3:8b";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const BASE_SYSTEM_PROMPT = `You are the AI customer support and shopping assistant for Thara Bliss, a Thai aromatherapy / wellness brand selling scented balms and related products. "Calm. Balance. Bliss." is the brand's positioning — keep that tone.

Your goals:
- Help customers find suitable products.
- Recommend products based on the product that we have, from website product page.
- Answer questions accurately using ONLY the store information provided below in this prompt.
- Explain product features, ingredients, benefits, and usage.
- Answer questions about shipping, payment, returns, and promotions only when that information is given to you below.
- Be polite, friendly, and professional.
- Guide customers to the Special Gift Request form when they ask about custom gifts, gift sets, ของชำร่วย, ของขวัญพิเศษ, or ordering in bulk. Always link to it as a Markdown link using this exact relative path: [Special Gift Request](/request) — never write out a full domain or guess a URL. How to fill in the request form:
  1. Your Name (ชื่อของคุณ) — the person placing the request.
  2. Email (อีเมล) — required, so the team can reply.
  3. Phone (เบอร์โทรศัพท์) — optional.
  4. Recipient Name (ชื่อผู้รับของขวัญ) — the name of the person receiving the gift.
  5. Occasion (โอกาสพิเศษ) — choose from: วันเกิด, วันครบรอบ, งานแต่งงาน, คำขอบคุณ, โอกาสพิเศษ, อื่นๆ.
  6. Desired Delivery Date (วันที่ต้องการรับ) — optional, enter the preferred date.
  7. Items (รายการสินค้า) — pick one or more: Aroma Balm, Room Spray, Scented Candle, Bath Salts, or enter a custom item.
  8. Budget (งบประมาณ) — choose a range: ต่ำกว่า ฿500 / ฿500–฿1,000 / ฿1,000–฿2,000 / ฿2,000 ขึ้นไป, or enter a custom budget.
  9. Wrap Style (รูปแบบห่อของขวัญ) — choose: สไตล์คลาสสิก (kraft box + jute ribbon), สไตล์พรีเมี่ยม (linen box + wax seal), or สไตล์อีโค่ (recycled box + dried flowers).
  10. Message (ข้อความ) — optional personal note (max 300 characters).
  After submitting, the Thara Bliss team will contact you within 1–2 business days to confirm pricing and delivery details.

Hard rules (never break these):
- Only answer using the store information provided in this prompt or the conversation. Never invent product specs, ingredients, prices, discounts, stock, shipping times, or promotions that weren't given to you.
- Never claim a product can diagnose, treat, cure, or prevent any disease or medical condition, even if asked directly.
- If information isn't available, say so honestly, in this style: "I couldn't find that information in the current product catalog. Please check the product page or contact our support team for the latest details." Do not guess instead.
- You do NOT have access to individual order status, payment records, delivery tracking, or account details. For those, tell the customer to check their Shopee / TikTok Shop / Thaimart order page directly, or that a team member will follow up.
- Purchases happen through the store's marketplace links (Shopee, TikTok Shop, Thaimart), not directly inside this chat.
- Always reply in the same language the customer used. If they write in Thai, reply in Thai. If English, reply in English. If mixed, default to Thai.
- Keep answers concise: 2–4 sentences for simple questions. Use short bullet points only when comparing multiple products.
- When recommending products, suggest at most 3, briefly explain why each fits the customer's stated need, and mention price/stock only if that data was given to you below.
- If a customer is unhappy or frustrated, respond with empathy first and focus on how to resolve it (usually: direct them to support or the right marketplace channel).
- If a request is outside the store's scope (e.g. unrelated topics, requests to write unrelated content), politely say that's outside what you can help with here.`;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  message: string;
  history?: IncomingMessage[];
  pathname?: string;
}

// ── Very lightweight keyword-based retrieval ──
// Matches the customer's message against product name/scent/category/description
// so the model only ever sees real, relevant catalog data (never invents products).
function findRelevantProducts(products: Product[], query: string, max = 5): Product[] {
  const q = query.toLowerCase();
  // For Thai: don't filter by word length — Thai words are often 2 chars.
  // Split by spaces but keep all tokens (even single chars for Thai).
  const words = q.split(/[\s,]+/).filter((w) => w.length > 0);

  if (words.length === 0) return [];

  // Generic keywords (Thai + English) that signal the customer wants a full catalog list
  const genericKeywords = [
    "สินค้า", "ผลิตภัณฑ์", "มีอะไรบ้าง", "มีอะไร", "all", "products", "catalog",
    "ทั้งหมด", "แนะนำ", "recommend", "what do you have",
  ];
  const isGenericQuery = genericKeywords.some((k) => q.includes(k));
  if (isGenericQuery) return products.slice(0, max);

  const scored = products.map((p) => {
    const haystack = [
      p.name,
      p.scent,
      p.category?.name,
      p.description,
      // Add Thai aliases so Thai queries can still hit product data
      "บาล์ม", "อโรม่า", "กลิ่น", "ราคา",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const score = words.reduce(
      (acc, w) => acc + (haystack.includes(w) ? 1 : 0),
      0
    );
    return { product: p, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((s) => s.product);
}

function formatProductForPrompt(p: Product): string {
  const lines = [
    `- ${p.name} (${p.category?.name ?? "Uncategorized"})`,
    `  Scent: ${p.scent}`,
    `  Price: ${p.price}`,
  ];
  if (p.sizes && p.sizes.length > 0) {
    lines.push(
      `  Sizes: ${p.sizes.map((s) => `${s.label} (${s.price})`).join(", ")}`
    );
  }
  if (p.description) lines.push(`  Description: ${p.description}`);
  if (p.ingredients) lines.push(`  Ingredients: ${p.ingredients}`);
  if (p.how_to_use) lines.push(`  How to use: ${p.how_to_use}`);
  if (p.fragrance_notes && p.fragrance_notes.length > 0) {
    lines.push(
      `  Fragrance notes: ${p.fragrance_notes
        .map((n) => `${n.label}: ${n.notes}`)
        .join("; ")}`
    );
  }
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { message, history = [], pathname } = body;
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Missing 'message'" }, { status: 400 });
  }

  // Bound context so requests stay fast on CPU/consumer GPU inference
  const trimmedHistory = history.slice(-10);

  // Parse pathname to get currently viewed product (e.g. /products/[id])
  let currentProductBlock = "";
  if (pathname) {
    const match = pathname.match(/\/products\/(\d+)/);
    if (match) {
      const productId = match[1];
      try {
        const product = await getProduct(productId);
        if (product) {
          currentProductBlock = `Currently Viewed Product:\nThe customer is currently looking at this product page:\n${formatProductForPrompt(product)}`;
        }
      } catch (err) {
        console.error("Error fetching currently viewed product in chat route:", err);
      }
    }
  }

  // Upcoming products
  const upcomingProductsBlock = `Upcoming / Coming Soon Products:
We have the following collections coming soon:
1. Room Spray Collection
   - Status: Coming soon / Upcoming soon
   - Description: Fragrance for your space (details to be announced)
   - Action: Customers can click "Notify Me" to get updates.
2. Special Gift Collection
   - Status: Coming soon / Upcoming soon
   - Description: Curated gift sets for special occasions (details to be announced)
   - Action: Customers can click "Notify Me" to get updates.`;

  // ── Ground the model in real store data ──
  const [products, settings] = await Promise.all([getProducts(), getSettings()]);

  const relevant = findRelevantProducts(products, message);
  // Always fall back to showing the full catalog when keyword matching returns
  // nothing — this ensures Thai-language queries like "มีสินค้าอะไรบ้าง" still
  // give the model real data to answer from instead of a "no match" response.
  const catalogProducts = relevant.length > 0 ? relevant : products;
  const catalogBlock =
    `Full product catalog (${catalogProducts.length} product${catalogProducts.length !== 1 ? "s" : ""}):\n` +
    catalogProducts.map(formatProductForPrompt).join("\n\n");

  const purchaseLinksBlock = settings
    ? `Marketplace links available: ${[
        settings.shopee_regular_url && "Shopee",
        settings.tiktok_url && "TikTok Shop",
        settings.thaimart_url && "Thaimart",
      ]
        .filter(Boolean)
        .join(", ") || "none currently configured"}`
    : `Marketplace link info is currently unavailable — if asked where to buy, say to check the site directly.`;

  const systemPrompt = `${BASE_SYSTEM_PROMPT}

── Store data for this request ──
${catalogBlock}

${currentProductBlock ? `${currentProductBlock}\n\n` : ""}${upcomingProductsBlock}

${purchaseLinksBlock}`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...trimmedHistory,
    { role: "user", content: message },
  ];

  try {
    let reply = "";

    if (GEMINI_API_KEY) {
      console.log("Using Gemini API for chatbot...");
      const contents = [
        ...trimmedHistory.map((h) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content }],
        })),
        {
          role: "user",
          parts: [{ text: message }],
        },
      ];

      // ── Exponential Backoff Retry for Gemini API ──
      // Retries on rate-limit (429) and temporary service errors (503).
      // Waits: 1s → 2s → 4s → 8s with ±10% jitter, up to MAX_RETRIES attempts.
      const MAX_RETRIES = 3;
      const BASE_DELAY_MS = 1_000;
      let geminiRes: Response | null = null;

      for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
        geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemPrompt }],
              },
              generationConfig: {
                temperature: 0.4,
              },
            }),
            signal: AbortSignal.timeout(30_000),
          }
        );

        // Success or non-retryable error → break immediately
        if (geminiRes.ok || (geminiRes.status !== 429 && geminiRes.status !== 503)) {
          break;
        }

        // Retryable (429 or 503): compute wait time and log warning
        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * Math.pow(2, attempt);
          const jitter = delay * 0.1 * (Math.random() * 2 - 1); // ±10%
          const waitMs = Math.round(delay + jitter);
          console.warn(
            `Gemini API returned ${geminiRes.status} (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying in ${waitMs}ms...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitMs));
        }
      }

      if (!geminiRes!.ok) {
        const text = await geminiRes!.text();
        const status = geminiRes!.status;
        if (status === 429) {
          console.warn("Gemini API rate limit exceeded after all retries:", text);
          return NextResponse.json(
            { error: "ขออภัยค่ะ ระบบ AI กำลังถูกใช้งานสูง กรุณารอสักครู่แล้วลองใหม่อีกครั้งนะคะ 🙏" },
            { status: 429 }
          );
        }
        console.error("Gemini API error:", status, text);
        return NextResponse.json(
          { error: "ขออภัยค่ะ ตอนนี้ระบบ Server Overload กรุณาลองใหม่อีกครั้งค่ะ" },
          { status: 503 }
        );
      }

      const data = await geminiRes!.json();
      reply = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
              "ขออภัยค่ะ ตอนนี้ระบบไม่สามารถตอบได้ กรุณาลองใหม่อีกครั้ง";
    } else {
      console.log("Using local Ollama fallback...");
      const upstream = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODEL,
          messages,
          stream: false,
          options: { temperature: 0.4 },
        }),
        // Local inference can be slow, especially on first load (model warm-up)
        signal: AbortSignal.timeout(180_000),
      });

      if (!upstream.ok) {
        const text = await upstream.text();
        console.error("Ollama error:", upstream.status, text);
        return NextResponse.json(
          { error: "Local model is unavailable right now." },
          { status: 502 }
        );
      }

      const data = await upstream.json();
      reply = data?.message?.content?.trim() ||
              "ขออภัยค่ะ ตอนนี้ระบบไม่สามารถตอบได้ กรุณาลองใหม่อีกครั้ง";
    }

    return NextResponse.json({ reply });
  } catch (err) {
    const isTimeout =
      err instanceof Error &&
      (err.name === "TimeoutError" ||
        err.message?.includes("aborted") ||
        err.message?.includes("timeout"));

    if (isTimeout) {
      console.warn("Request timed out (Ollama might be warming up or system resources are low).");
      return NextResponse.json(
        {
          error: "ขออภัยค่ะ ระบบใช้เวลาตอบกลับนานเกินไป กรุณาลองใหม่อีกครั้งนะคะ (Request timed out)",
        },
        { status: 504 }
      );
    }

    console.error("Chat route error:", err);
    return NextResponse.json(
      {
        error:
          "Could not reach the local model. Make sure 'ollama serve' is running and 'qwen3:8b' has been pulled.",
      },
      { status: 502 }
    );
  }
}
