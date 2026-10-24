# Gmail and WhatsApp enquiries

Contact email: `sayan@opslin.com`. WhatsApp destination: owner-confirmed `9775845587`, normalized with India’s country code to `+919775845587`. Source of truth: `lib/contact.ts`.

The email form prepares a Gmail compose URL, including the recipient, subject and complete message. “Open Gmail draft” opens that URL in a new browser tab rather than invoking System Mail. Existing direct email links also use Gmail. Gmail may require login; the website cannot force an installed Gmail app to open on every operating system.

A floating WhatsApp button is present across the site. Its native dialog asks for a name, project category, description, optional email and optional budget. Fourteen plain-language project categories cover grocery/delivery, online shopping, laundry, store billing, bookings, food ordering, websites, WhatsApp customer support, automation, apps, custom software, hosting and games. Validated submission navigates to WhatsApp’s `https://wa.me/` click-to-chat URL with a complete prefilled message. App/Web handoff depends on the visitor’s device, installed applications and login state. The visitor presses Send inside WhatsApp; no message is sent by the website.

Drafts can be copied, and the confirmation’s Edit details action retains submitted values. Enquiries are not stored in a server or analytics tool. The forms and global WhatsApp dialog use native HTML validation, focus containment, Escape dismissal and focus restoration. Mobile fields use a 16px font to avoid input zoom.

Verification: `node --test tests/contact.test.mjs` covers URL recipient/text encoding, international-number validation, optional values, existing service preselection and server-rendered form requirements. Browser automation was unavailable because local browser use is disabled in Work settings. Native mobile app handoff and signed-in Gmail/WhatsApp flows were not executed; no test messages were sent.

Reference: [WhatsApp’s click-to-chat documentation](https://faq.whatsapp.com/5913398998672934).
