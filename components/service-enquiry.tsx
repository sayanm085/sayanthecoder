"use client";

import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";
import { Close } from "./icons";

export function ServiceEnquiry({ service }: { service: string }) {
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
        className="pill pill-dark"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        Discuss your project →
      </button>
      <dialog
        ref={dialogRef}
        className="overlay-dialog"
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
              aria-label="Close project enquiry"
            >
              <Close />
            </button>
            <ContactForm hint={service} onClose={() => setOpen(false)} />
          </div>
        ) : null}
      </dialog>
    </>
  );
}
