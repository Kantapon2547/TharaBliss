import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

const INTERNAL_TEMPLATE_HTML = `
  <div style="font-family: Helvetica, Arial, sans-serif; color: #2F3A33; max-width: 560px;">
    <h2 style="color: #0F6E56; font-weight: 500;">New Special Gift Request</h2>
    <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
      <tr><td style="padding: 6px 0; color: #888;">From</td><td style="padding: 6px 0;"><strong>{{{CUSTOMER_NAME}}}</strong> ({{{CUSTOMER_EMAIL}}}, {{{CUSTOMER_PHONE}}})</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Recipient</td><td style="padding: 6px 0;">{{{RECIPIENT_NAME}}}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Occasion</td><td style="padding: 6px 0;">{{{OCCASION}}}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Delivery date</td><td style="padding: 6px 0;">{{{DELIVERY_DATE}}}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Items</td><td style="padding: 6px 0;">{{{ITEMS_LIST}}}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Budget</td><td style="padding: 6px 0;">{{{BUDGET_LABEL}}}</td></tr>
      <tr><td style="padding: 6px 0; color: #888;">Wrap style</td><td style="padding: 6px 0;">{{{WRAP_LABEL}}}</td></tr>
    </table>
    <p style="color: #888; margin-bottom: 4px; font-size: 14px;">Message</p>
    <p style="background: #F5F2EB; border: 1px solid #EFEAE1; border-radius: 10px; padding: 12px 16px; font-size: 14px; line-height: 1.6;">
      {{{REQUEST_MESSAGE}}}
    </p>
  </div>
`;

const CUSTOMER_TEMPLATE_HTML = `
  <div style="font-family: Helvetica, Arial, sans-serif; color: #2F3A33; max-width: 480px;">
    <h2 style="color: #0F6E56; font-weight: 500;">Thara Bliss 🌿</h2>
    <p style="font-size: 14px; line-height: 1.7;">
      Hi {{{CUSTOMER_FIRST_NAME}}}, thanks for creating a special gift request for
      {{{RECIPIENT_NAME}}}! We've received your details and our team will reach out
      within 1–2 business days to confirm pricing and delivery.
    </p>
    <p style="font-size: 13px; color: #8A8F86;">— The Thara Bliss Team</p>
  </div>
`;

async function main() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set in the environment.");
  }

  console.log("Creating & publishing internal notification template...");
  const internal = await resend.templates
    .create({
      name: "Gift Request — Internal Notification",
      alias: "gift-request-internal",
      html: INTERNAL_TEMPLATE_HTML,
      variables: [
        { key: "CUSTOMER_NAME", type: "string", fallbackValue: "A customer" },
        { key: "CUSTOMER_EMAIL", type: "string", fallbackValue: "unknown" },
        { key: "CUSTOMER_PHONE", type: "string", fallbackValue: "Not provided" },
        { key: "RECIPIENT_NAME", type: "string", fallbackValue: "someone" },
        { key: "OCCASION", type: "string", fallbackValue: "Not specified" },
        { key: "DELIVERY_DATE", type: "string", fallbackValue: "Not specified" },
        { key: "ITEMS_LIST", type: "string", fallbackValue: "Not specified" },
        { key: "BUDGET_LABEL", type: "string", fallbackValue: "Not specified" },
        { key: "WRAP_LABEL", type: "string", fallbackValue: "Not specified" },
        { key: "REQUEST_MESSAGE", type: "string", fallbackValue: "No message provided." },
      ],
    })
    .publish();

  console.log("Internal template ready:", internal);

  console.log("Creating & publishing customer confirmation template...");
  const customer = await resend.templates
    .create({
      name: "Gift Request — Customer Confirmation",
      alias: "gift-request-customer-confirmation",
      html: CUSTOMER_TEMPLATE_HTML,
      variables: [
        { key: "CUSTOMER_FIRST_NAME", type: "string", fallbackValue: "there" },
        { key: "RECIPIENT_NAME", type: "string", fallbackValue: "your recipient" },
      ],
    })
    .publish();

  console.log("Customer confirmation template ready:", customer);

  console.log("\nDone. You can now reference these templates by alias:");
  console.log("  gift-request-internal");
  console.log("  gift-request-customer-confirmation");
}

main().catch((err) => {
  console.error("Template setup failed:", err);
  process.exit(1);
});