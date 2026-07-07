import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = process.env.GIFT_REQUEST_TO_EMAIL || "tharabliss2025@gmail.com";
const FROM_EMAIL = process.env.GIFT_REQUEST_FROM_EMAIL || "onboarding@resend.dev";

// Aliases set in scripts/setup-resend-templates.ts
const INTERNAL_TEMPLATE_ALIAS = "gift-request-internal";
const CUSTOMER_TEMPLATE_ALIAS = "gift-request-customer-confirmation";

interface GiftRequestBody {
  name: string;
  email: string;
  phone: string;
  recipientName: string;
  occasion: string;
  deliveryDate: string;
  items: string[];
  budget: string;
  wrapStyle: string;
  message: string;
}

const BUDGET_LABELS: Record<string, string> = {
  "under-500": "Under ฿500",
  "500-1000": "฿500 – ฿1,000",
  "1000-2000": "฿1,000 – ฿2,000",
  "2000-plus": "฿2,000+",
};

const WRAP_LABELS: Record<string, string> = {
  classic: "Classic (kraft box, twine bow)",
  premium: "Premium (linen box, wax seal)",
  eco: "Eco (recycled box, dried florals)",
};

const ITEM_LABELS: Record<string, string> = {
  "aroma-balm": "Aroma Balm",
  "room-spray": "Room Spray",
  candle: "Scented Candle",
  "bath-salts": "Bath Salts",
};

// Resend template variables are inserted with TRIPLE braces ({{{VAR}}}),
// which do not HTML-escape — so we sanitize any user-supplied text before
// it's sent as a variable value.
function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function validate(body: Partial<GiftRequestBody>): string | null {
  if (!body.name?.trim()) return "Name is required.";
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return "A valid email is required.";
  }
  if (!body.recipientName?.trim()) return "Recipient name is required.";
  if (!body.occasion) return "Occasion is required.";
  if (!body.items || body.items.length === 0) return "At least one item is required.";
  if (!body.budget) return "Budget is required.";
  if (!body.wrapStyle) return "Wrap style is required.";
  return null;
}

export async function POST(req: NextRequest) {
  let body: GiftRequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email service is not configured on the server." },
      { status: 500 }
    );
  }

  const itemsList = body.items.map((id) => ITEM_LABELS[id] || id).join(", ");

  try {
    // Notify the shop
    const internalSend = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: body.email,
      subject: `New Gift Request — ${body.recipientName} (${body.occasion})`,
      template: {
        id: INTERNAL_TEMPLATE_ALIAS,
        variables: {
          CUSTOMER_NAME: escapeHtml(body.name),
          CUSTOMER_EMAIL: escapeHtml(body.email),
          CUSTOMER_PHONE: body.phone ? escapeHtml(body.phone) : "Not provided",
          RECIPIENT_NAME: escapeHtml(body.recipientName),
          OCCASION: escapeHtml(body.occasion),
          DELIVERY_DATE: body.deliveryDate ? escapeHtml(body.deliveryDate) : "Not specified",
          ITEMS_LIST: escapeHtml(itemsList),
          BUDGET_LABEL: escapeHtml(BUDGET_LABELS[body.budget] || body.budget),
          WRAP_LABEL: escapeHtml(WRAP_LABELS[body.wrapStyle] || body.wrapStyle),
          REQUEST_MESSAGE: body.message ? escapeHtml(body.message) : "No message provided.",
        },
      },
    });

    if (internalSend.error) {
      throw new Error(internalSend.error.message);
    }

    // Confirmation to the customer — non-blocking; log but don't fail the request if this errors
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: body.email,
        subject: "We got your special gift request — Thara Bliss",
        template: {
          id: CUSTOMER_TEMPLATE_ALIAS,
          variables: {
            CUSTOMER_FIRST_NAME: escapeHtml(body.name.split(" ")[0] || "there"),
            RECIPIENT_NAME: escapeHtml(body.recipientName),
          },
        },
      });
    } catch (confirmErr) {
      console.error("Customer confirmation email failed:", confirmErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Gift request email error:", err);
    return NextResponse.json(
      { error: "Failed to send the request email. Please try again shortly." },
      { status: 502 }
    );
  }
}