"use client";

import { useState, type FormEvent } from "react";
import { Arrow, Spark } from "./icons";
import {
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  projectChoices,
  projectTypeForHint,
  createEnquiryText,
  gmailComposeUrl,
  whatsappComposeUrl,
} from "@/lib/contact";

export function ContactForm({
  hint,
  onClose,
  channel = "gmail",
}: {
  hint?: string;
  channel?: "gmail" | "whatsapp";
  onClose: () => void;
}) {
  const isWhatsApp = channel === "whatsapp";
  const [values, setValues] = useState({
    name: "",
    email: "",
    project: hint ? `I’d like to talk about ${hint}. ` : "",
    type: projectTypeForHint(hint),
    budget: "Let’s discuss",
  });
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(
    null,
  );
  const [copyState, setCopyState] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const project = String(data.get("project") || "").trim();
    if (!name || !project) {
      const field = event.currentTarget.elements.namedItem(
        !name ? "name" : "project",
      ) as HTMLInputElement | HTMLTextAreaElement;
      field.setCustomValidity(
        !name
          ? "Please enter your name."
          : "Please tell me a little about your project.",
      );
      field.reportValidity();
      return;
    }
    const text = createEnquiryText({
      name,
      email,
      project,
      type: String(data.get("type") || "Help choosing / something else"),
      budget: String(data.get("budget") || ""),
    });
    setValues({
      name,
      email,
      project,
      type: String(data.get("type")),
      budget: String(data.get("budget") || "Let’s discuss"),
    });
    const href = isWhatsApp
      ? whatsappComposeUrl(WHATSAPP_NUMBER, text)
      : gmailComposeUrl({
          subject: `Project enquiry from ${name}`,
          body: text,
        });
    if (isWhatsApp) {
      // Navigate from the submit gesture; no popup or automatic send.
      window.location.assign(href);
    }
    setDraft({ text, href });
  }

  async function copyDraft() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyState("Copied to clipboard");
    } catch {
      setCopyState("Select and copy the draft below.");
    }
  }

  if (draft)
    return (
      <div className="draft-success">
        <span className="success-mark">
          <Spark />
        </span>
        <p className="modal-eyebrow">All set for the next step</p>
        <h2 id="overlay-title" tabIndex={-1} ref={(node) => node?.focus()}>
          {isWhatsApp
            ? "Your WhatsApp message is ready."
            : "Your Gmail draft is ready."}
        </h2>
        <p>
          {isWhatsApp
            ? "Continue to WhatsApp, review your message and press Send."
            : "Open Gmail, review the details and press Send. Sign in if Gmail asks you to."}{" "}
          Your enquiry hasn’t been sent yet.
        </p>
        <a
          className="pill pill-dark"
          href={draft.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isWhatsApp ? "Continue to WhatsApp" : "Open Gmail draft"}{" "}
          <span className="button-icon">
            <Arrow />
          </span>
        </a>
        <button className="text-link" onClick={copyDraft}>
          Copy enquiry text <span aria-hidden="true">↗</span>
        </button>
        <p className="copy-status" role="status">
          {copyState}
        </p>
        {copyState === "Select and copy the draft below." ? (
          <textarea
            aria-label="Enquiry draft to copy"
            readOnly
            value={draft.text}
            rows={7}
          />
        ) : null}
        <button
          className="text-link"
          onClick={() => {
            setDraft(null);
            setCopyState("");
          }}
        >
          Edit details
        </button>
        <a
          className="draft-direct"
          href={
            isWhatsApp
              ? whatsappComposeUrl(
                  WHATSAPP_NUMBER,
                  "Hi Sayan, I’d like to discuss a project.",
                )
              : gmailComposeUrl()
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {isWhatsApp ? WHATSAPP_DISPLAY : CONTACT_EMAIL}
        </a>
        <button className="draft-dismiss" onClick={onClose}>
          Back to exploring
        </button>
      </div>
    );

  return (
    <>
      <div className="modal-heading">
        <p className="modal-eyebrow">
          <span className="section-dot" />
          {isWhatsApp ? "Let’s talk on WhatsApp" : "Start a conversation"}
        </p>
        <h2 id="overlay-title">
          {isWhatsApp ? (
            <>
              What can I help
              <br />
              your business build?
            </>
          ) : (
            <>
              Good things start
              <br />
              with a hello.
            </>
          )}
        </h2>
        <p>
          Pick what you need and describe your idea in your own words.
          <br />
          No technical knowledge needed.
        </p>
      </div>
      <form
        className="contact-form"
        onSubmit={submit}
        onInput={(event) => {
          const field = event.target;
          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement
          )
            field.setCustomValidity("");
        }}
      >
        <div className="field-row">
          <label>
            Your name
            <input
              name="name"
              defaultValue={values.name}
              type="text"
              placeholder="Alex Morgan"
              autoComplete="name"
              required
              maxLength={120}
            />
          </label>
          <label>
            Email address{" "}
            {isWhatsApp ? <span className="optional">(optional)</span> : null}
            <input
              name="email"
              defaultValue={values.email}
              type="email"
              placeholder="alex@company.com"
              autoComplete="email"
              required={!isWhatsApp}
              maxLength={254}
            />
          </label>
        </div>
        <fieldset className="project-choices">
          <legend>What are you looking for?</legend>
          {projectChoices.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="type"
                value={type}
                defaultChecked={type === values.type}
              />
              <span>{type}</span>
            </label>
          ))}
        </fieldset>
        <label>
          About your project
          <textarea
            name="project"
            rows={4}
            placeholder="For example: I run a grocery shop and want customers to order online, pay and track their delivery."
            required
            maxLength={5000}
            defaultValue={values.project}
          />
        </label>
        <label className="budget-field">
          Budget range <span className="optional">(optional)</span>
          <select name="budget" defaultValue={values.budget}>
            <option>Let’s discuss</option>
            <option>Under ₹50,000</option>
            <option>₹50,000 – ₹1,50,000</option>
            <option>₹1,50,000 – ₹5,00,000</option>
            <option>₹5,00,000+</option>
          </select>
        </label>
        <div className="form-bottom">
          <span>
            {isWhatsApp ? "Your message goes to" : "Made personal."}
            <br />
            <strong>{isWhatsApp ? WHATSAPP_DISPLAY : CONTACT_EMAIL}</strong>
          </span>
          <button className="pill pill-dark" type="submit">
            {isWhatsApp ? "Continue to WhatsApp" : "Create Gmail draft"}{" "}
            <span className="button-icon">
              <Arrow />
            </span>
          </button>
        </div>
        <p className="form-note">
          {isWhatsApp
            ? "WhatsApp opens with your message ready. You review it and press Send."
            : "You’ll review and send your draft in Gmail."}
        </p>
      </form>
    </>
  );
}
