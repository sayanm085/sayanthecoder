export const CONTACT_EMAIL = "sayan@opslin.com";
export const WHATSAPP_NUMBER = "+919775845587";
export const WHATSAPP_DISPLAY = "+91 97758 45587";

export const projectChoices = [
  "Grocery & delivery app",
  "Online shop / e-commerce",
  "Laundry & pickup service",
  "Shop billing / POS system",
  "Business website",
  "Booking & appointments",
  "Restaurant & food ordering",
  "WhatsApp customer support / CRM",
  "Business automation & AI",
  "Mobile app",
  "Custom software / dashboard",
  "Hosting & app deployment",
  "Game design & development",
  "Help choosing / something else",
];

export function projectTypeForHint(hint = "") {
  if (/grocery/i.test(hint)) return "Grocery & delivery app";
  if (/game/i.test(hint)) return "Game design & development";
  if (/cloud|devops|hosting/i.test(hint)) return "Hosting & app deployment";
  if (/AI|automation/i.test(hint)) return "Business automation & AI";
  if (/mobile|flutter/i.test(hint)) return "Mobile app";
  return "Business website";
}

export function createEnquiryText({
  name,
  project,
  type,
  budget,
  email,
}: {
  name: string;
  project: string;
  type: string;
  budget?: string;
  email?: string;
}) {
  return `Hi Sayan,\n\nI’m ${name}. I’d like to discuss a project.\n\nWhat I need: ${type}\n\nProject details:\n${project}\n\nBudget: ${budget?.trim() || "Let’s discuss"}${email?.trim() ? `\nEmail: ${email.trim()}` : ""}\n\nSent from the SayanTheCoder website.`;
}

export function gmailComposeUrl({
  subject = "Project enquiry",
  body = "",
}: { subject?: string; body?: string } = {}) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params}`;
}

export function whatsappComposeUrl(number: string, text: string) {
  const normalized = number.replace(/[\s()-]/g, "");
  if (!/^\+?[1-9]\d{6,14}$/.test(normalized))
    throw new Error("A valid international WhatsApp number is required.");
  const digits = normalized.replace(/^\+/, "");
  return `https://wa.me/${digits}?${new URLSearchParams({ text })}`;
}
