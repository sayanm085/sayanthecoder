"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";
import { Close } from "./icons";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M27 15.8a11 11 0 0 1-16.4 9.6L5 27l1.5-5.4A11 11 0 1 1 27 15.8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="m12.1 10.2 1.5 3-1.1 1.3c1 2 2.3 3.3 4.5 4.2l1.4-1.1 2.8 1.4c.2.2.2.5.1.8-.5 1.6-1.8 2-3.3 1.7-4.8-1-8.5-4.6-9-8.6-.2-1.4.5-2.5 1.7-3 .5-.2 1-.1 1.4.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppEnquiry() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.documentElement.style.overflow;
    const trigger = triggerRef.current;
    dialog.showModal();
    document.documentElement.style.overflow = "hidden";
    dialog
      .querySelector<HTMLInputElement>("input")
      ?.focus({ preventScroll: true });
    return () => {
      if (dialog.open) dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <>
      <button
        ref={triggerRef}
        className="whatsapp-float"
        aria-label="Discuss your project on WhatsApp"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <WhatsAppIcon />
        <span>Let’s chat</span>
      </button>
      <dialog
        ref={dialogRef}
        className="overlay-dialog whatsapp-dialog"
        aria-labelledby="overlay-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        data-lenis-prevent
      >
        {open ? (
          <div className="modal-panel">
            <button
              className="dialog-close"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp enquiry"
            >
              <Close />
            </button>
            <ContactForm channel="whatsapp" onClose={() => setOpen(false)} />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
