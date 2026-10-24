export type ProjectImage = {
  id: string;
  label: string;
  src: string;
  width: number;
  height: number;
  format: "mobile" | "desktop" | "game";
  alt: string;
};

export type Project = {
  id: string;
  name: string;
  seoTitle?: string;
  category: string;
  headline: string;
  description: string;
  seoDescription: string;
  tags: string[];
  relationship: "Client project" | "My product" | "Studio work";
  image?: string;
  secondary?: string;
  secondaryWidth?: number;
  secondaryHeight?: number;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  logo?: string;
  gallery?: ProjectImage[];
  companionId?: string;
  companionText?: string;
  status?: string;
  imageCaption?: string;
  externalLinks?: { label: string; href: string }[];
  browserLabel?: string;
  format?: "mobile" | "desktop" | "game";
  href?: string;
  linkLabel?: string;
  highlights: { title: string; text: string }[];
};

export const projects: Project[] = [
  {
    id: "freshcart",
    seoDescription:
      "FreshCart client project by Sayan Mondal: a Flutter food and grocery app with B2C and B2B shopping, category discovery and connected delivery operations.",
    name: "FreshCart",
    category: "Fresh food & grocery commerce",
    relationship: "Client project",
    headline: "Fresh food. A thoughtful shopping experience.",
    description:
      "A fresh-food and grocery shopping app with B2C and B2B shopping modes, location-aware discovery, category browsing and a clear product-to-cart experience. Built as client work across customer, vendor and delivery operations.",
    tags: ["Flutter", "Commerce", "Customer experience"],
    image: "/assets/projects/freshcart-home.webp",
    imageWidth: 1080,
    imageHeight: 2400,
    format: "mobile",
    imageAlt:
      "FreshCart customer app showing delivery location, meat and grocery categories, product prices and shopping navigation",
    logo: "/assets/brands/freshcart.png",
    highlights: [
      {
        title: "A familiar way to shop",
        text: "Location, product discovery, categories and the basket stay close to the customer’s everyday shopping flow.",
      },
      {
        title: "Commerce across touchpoints",
        text: "The wider project connects customer, vendor and rider applications with tools for catalog and day-to-day operations.",
      },
      {
        title: "Real product detail",
        text: "Product imagery, weights, prices and delivery information are given a clear hierarchy in the customer interface.",
      },
    ],
  },
  {
    id: "dealker",
    seoDescription:
      "Dealker client project by Sayan Mondal: a Flutter electronics marketplace connecting phone shopping, brand discovery, auctions and repair services.",
    name: "Dealker",
    category: "Electronics marketplace",
    relationship: "Client project",
    headline: "Electronics, discovery and deals. Connected.",
    description:
      "A mobile marketplace for phones, parts, accessories and electronics. The customer experience brings together category discovery, brand-led shopping, promotional offers, auctions and repair entry points, supported by vendor and operations tools.",
    tags: ["Flutter", "Marketplace", "Full-stack"],
    image: "/assets/projects/dealker-home.webp",
    imageWidth: 1080,
    imageHeight: 2400,
    format: "mobile",
    imageAlt:
      "Dealker mobile marketplace with phone categories, electronics offers, Apple and Samsung brand discovery, auctions and repair navigation",
    logo: "/assets/brands/dealker.png",
    highlights: [
      {
        title: "Discovery that fits the catalog",
        text: "Phones, mobile parts, accessories and electronics have distinct discovery paths, with brands and promotional collections close at hand.",
      },
      {
        title: "More than a storefront",
        text: "Shopping sits alongside auction and repair entry points in one mobile experience.",
      },
      {
        title: "The systems behind the screen",
        text: "Client delivery spans customer, vendor and rider apps, a backend and an operations dashboard.",
      },
    ],
  },
  {
    id: "bakaloo",
    companionId: "bakaloo-platform",
    companionText:
      "Explore the separate WhatsApp CRM, agentic AI, B2B tools and storefront theme builder behind Bakaloo.",
    seoDescription:
      "Bakaloo client project by Sayan Mondal: a Flutter grocery delivery platform connecting customers, local stores, riders and everyday shopping.",
    name: "Bakaloo",
    category: "Hyperlocal grocery delivery",
    relationship: "Client project",
    headline: "A neighborhood grocery shop, in your pocket.",
    description:
      "A grocery delivery platform connecting customers with local shops. The product brings location-aware browsing, fresh groceries, a wallet, offers and order tracking into a mobile experience, with rider and operations tools behind it.",
    tags: ["Flutter", "Node.js", "Quick commerce"],
    image: "/assets/projects/bakaloo-home.webp",
    secondary: "/assets/img/bakaloo-detail.webp",
    secondaryWidth: 900,
    secondaryHeight: 799,
    imageWidth: 1080,
    imageHeight: 2400,
    format: "mobile",
    imageAlt:
      "Bakaloo grocery app showing its purple logo, local delivery, vegetable categories, fresh arrivals, prices and wallet access",
    logo: "/assets/brands/bakaloo.png",
    href: "https://bakalooindia.com/",
    linkLabel: "Visit Bakaloo",
    highlights: [
      {
        title: "Built around local shopping",
        text: "Delivery location and product categories help customers find the groceries available around them.",
      },
      {
        title: "An end-to-end ordering experience",
        text: "The product connects discovery, offers, wallet payments and order progress with the operational side of delivery.",
      },
      {
        title: "One connected platform",
        text: "Customer and rider experiences work with the backend and catalog, offer and fulfilment dashboard.",
      },
    ],
  },
  {
    id: "bakaloo-platform",
    seoTitle: "Bakaloo WhatsApp CRM & Storefront Builder",
    name: "Bakaloo CRM & Builder",
    category: "WhatsApp CRM, agentic AI & B2B commerce",
    relationship: "Client project",
    seoDescription:
      "Bakaloo CRM and theme builder by Sayan Mondal: WhatsApp inbox, agentic AI, customer pipelines, B2B commerce and a visual Flutter storefront builder.",
    headline: "Conversations, commerce and the storefront. Connected.",
    description:
      "The operations platform behind Bakaloo, presented separately from its customer app. A shared WhatsApp CRM, agentic AI workflows, team collaboration and customer pipelines connect with B2B commerce and a visual theme and section builder for B2B and B2C storefronts.",
    tags: ["WhatsApp CRM", "Agentic AI", "B2B / B2C", "Theme builder"],
    image: "/assets/projects/bakaloo-theme-builder.webp",
    imageWidth: 2400,
    imageHeight: 1242,
    format: "desktop",
    logo: "/assets/brands/bakaloo.png",
    browserLabel: "dash.bakaloo.in",
    imageAlt:
      "Bakaloo visual storefront section builder with a component library, live phone preview and B2B and B2C controls",
    imageCaption:
      "Actual Bakaloo admin interfaces · WhatsApp CRM, customer pipeline and storefront builder",
    companionId: "bakaloo",
    companionText:
      "The Bakaloo customer application has its own grocery shopping showcase, separate from this operations platform.",
    gallery: [
      {
        id: "builder",
        label: "Theme & section builder",
        src: "/assets/projects/bakaloo-theme-builder.webp",
        width: 2400,
        height: 1242,
        format: "desktop",
        alt: "Bakaloo section builder with component library, phone preview, theme presets, B2B and B2C selection and publishing controls",
      },
      {
        id: "inbox",
        label: "WhatsApp · Shared inbox",
        src: "/assets/projects/bakaloo-crm-inbox-redacted.webp",
        width: 1744,
        height: 902,
        format: "desktop",
        alt: "Bakaloo WhatsApp CRM shared inbox with conversation ownership, labels, customer context and bot handoff controls",
      },
      {
        id: "team",
        label: "CRM · Team chat",
        src: "/assets/projects/bakaloo-crm-team-redacted.webp",
        width: 1744,
        height: 901,
        format: "desktop",
        alt: "Bakaloo internal team chat workspace for collaboration between headquarters and stores",
      },
      {
        id: "pipeline",
        label: "CRM · Customer pipeline",
        src: "/assets/projects/bakaloo-crm-pipeline-redacted.webp",
        width: 1752,
        height: 897,
        format: "desktop",
        alt: "Bakaloo customer pipeline with lead, conversation, customer and order stages and B2B plus B2C filtering",
      },
      {
        id: "templates",
        label: "WhatsApp · Templates",
        src: "/assets/projects/bakaloo-crm-templates.webp",
        width: 2400,
        height: 1238,
        format: "desktop",
        alt: "Bakaloo WhatsApp template management with approval statuses, languages, search and Meta synchronization controls",
      },
    ],
    highlights: [
      {
        title: "One shared customer context",
        text: "The WhatsApp inbox connects conversations with owners, labels and customer details. Team chat and the pipeline keep collaboration and the next customer action visible.",
      },
      {
        title: "Agentic AI with team handoff",
        text: "AI agents and conversation automations work alongside the team, with bot resumption and human handoff controls in the shared inbox.",
      },
      {
        title: "A visual storefront system",
        text: "A reusable section library, phone preview, theme presets, drafts and scheduling support storefront composition. Dashboard configuration flows through the backend to the Flutter interface.",
      },
      {
        title: "B2B and B2C in the same platform",
        text: "Business commerce and customer commerce have distinct storefront modes. The builder includes B2B-to-B2C copying, while customer pipeline filters can span both audiences.",
      },
    ],
  },
  {
    id: "radha",
    seoDescription:
      "Radha client project by Sayan Mondal: a mobile store management app for scanning, expiry tracking, daily tasks and retail operational health.",
    name: "Radha",
    category: "Retail operations & store management",
    relationship: "Client project",
    headline: "A clearer picture of the shop floor.",
    description:
      "A mobile command center for store operations. Radha brings scanning, expiry management, task tracking and store activity into one place, helping a retailer move from a daily overview to the work that needs attention.",
    tags: ["Flutter", "Retail operations", "Inventory"],
    image: "/assets/projects/radha-dashboard.webp",
    imageWidth: 1080,
    imageHeight: 2400,
    format: "mobile",
    imageAlt:
      "Radha store management app with an operational health overview, seven-day scans and tasks activity, expiry management and scanning navigation",
    logo: "/assets/brands/radha.png",
    highlights: [
      {
        title: "A daily command center",
        text: "The store overview connects operational health with scans, completed tasks and recent activity.",
      },
      {
        title: "From insight to action",
        text: "Scanning, expiry and task workflows have direct entry points in the mobile navigation.",
      },
      {
        title: "Made for retail routines",
        text: "A warm visual system and straightforward information hierarchy support day-to-day shop-floor work.",
      },
    ],
  },
  {
    id: "opslin",
    seoDescription:
      "Opslin, founded by Sayan Mondal: VPS deployment, Git releases, SSL, databases, monitoring, rollback and AI-assisted DevOps through MCP beta.",
    name: "Opslin",
    category: "Cloud infrastructure & developer tools",
    relationship: "My product",
    headline: "Your server. Your rules.",
    description:
      "I’m the founder of Opslin, a bring-your-own-VPS deployment platform for developers, founders and small teams. Connect your Linux server, deploy from GitHub or an upload, and manage domains, SSL, databases, logs, monitoring and rollback in one dashboard. Opslin’s MCP beta connects supported deployment tasks to an AI assistant through permissions you control.",
    tags: ["VPS deployment", "DevOps", "AI / MCP", "Next.js", "Go"],
    status: "Public beta",
    image: "/assets/projects/opslin-dashboard.webp",
    secondary: "/assets/img/opslin-monitoring.webp",
    secondaryWidth: 1800,
    secondaryHeight: 700,
    imageWidth: 2940,
    imageHeight: 1512,
    format: "desktop",
    imageAlt:
      "Opslin deployment platform overview showing online servers, running apps, deploy activity, alerts and server fleet",
    logo: "/assets/brands/opslin.png",
    href: "https://www.opslin.com/",
    linkLabel: "Visit Opslin",
    highlights: [
      {
        title: "Own the infrastructure",
        text: "Applications run on the user’s VPS, with an outbound agent connecting the server to the control plane.",
      },
      {
        title: "See the complete picture",
        text: "Apps, servers, deployments, monitoring and alerts share a consistent operational surface.",
      },
      {
        title: "Built and operated by me",
        text: "I’m Sayan Mondal, founder of Opslin and Shotlin. My work on Opslin spans the dashboard, backend, outbound Go agent and deployment infrastructure.",
      },
    ],
  },
  {
    id: "lndry",
    name: "LNDRY",
    category: "Customer app & laundry website",
    relationship: "Studio work",
    seoDescription:
      "LNDRY by Sayan Mondal: a laundry customer app and website for service discovery, pickup booking and order tracking. Explore real mobile and web screens.",
    headline: "Garment care, from your phone to your doorstep.",
    description:
      "The customer-facing LNDRY experience, spanning the mobile app and public website. Service discovery, pickup scheduling and order tracking help customers follow their garment-care journey. This project is presented separately from the LNDRY POS tools used in stores.",
    tags: ["Flutter", "Customer app", "Website"],
    image: "/assets/projects/lndry-customer-home.webp",
    imageWidth: 720,
    imageHeight: 1600,
    format: "mobile",
    imageAlt:
      "LNDRY customer app home with garment care categories, search and pickup scheduling",
    logo: "/assets/brands/lndry-horizontal.png",
    href: "https://lndry.in/",
    linkLabel: "Visit lndry.in",
    browserLabel: "lndry.in",
    companionId: "lndry-pos",
    gallery: [
      {
        id: "app-home",
        label: "Customer app · Home",
        src: "/assets/projects/lndry-customer-home.webp",
        width: 720,
        height: 1600,
        format: "mobile",
        alt: "LNDRY customer app home with laundry service categories and the schedule pickup card",
      },
      {
        id: "website-home",
        label: "Website · Home",
        src: "/assets/projects/lndry-website-home.webp",
        width: 1280,
        height: 720,
        format: "desktop",
        alt: "LNDRY public website homepage showing the garment care marketplace and doorstep handover imagery",
      },
      {
        id: "website-services",
        label: "Website · Services",
        src: "/assets/projects/lndry-website-services.webp",
        width: 1280,
        height: 720,
        format: "desktop",
        alt: "LNDRY website service page with garment care options and laundry studio imagery",
      },
      {
        id: "website-journey",
        label: "Website · How it works",
        src: "/assets/projects/lndry-website-journey.webp",
        width: 1280,
        height: 720,
        format: "desktop",
        alt: "LNDRY website booking journey from customer pickup through garment care to final handover",
      },
      {
        id: "app-tracking",
        label: "Customer app · Tracking",
        src: "/assets/img/lndry-track.webp",
        width: 620,
        height: 1340,
        format: "mobile",
        alt: "LNDRY customer app live order tracking from pickup to delivery",
      },
      {
        id: "app-confirmation",
        label: "Customer app · Confirmation",
        src: "/assets/img/lndry-confirm.webp",
        width: 620,
        height: 1340,
        format: "mobile",
        alt: "LNDRY customer app order confirmation screen",
      },
    ],
    highlights: [
      {
        title: "The customer side of the journey",
        text: "The app brings service discovery, garment-care categories, pickup scheduling and order progress into one customer experience.",
      },
      {
        title: "A connected public website",
        text: "The website introduces the service, explains the booking journey and provides a clear path to pickup booking. Its home, services and journey views are captured in the gallery.",
      },
      {
        title: "Separate from the store tools",
        text: "LNDRY is the customer app and website project. The LNDRY POS project covers the counter and store operations experience, with its own dedicated showcase.",
      },
    ],
  },
  {
    id: "lndry-pos",
    seoTitle: "LNDRY POS — Laundry Store Software",
    name: "LNDRY POS",
    category: "In-store laundry POS · Mobile & web",
    relationship: "Studio work",
    seoDescription:
      "LNDRY POS by Sayan Mondal: an in-store laundry system with mobile and desktop interfaces for order booking, garment pricing, invoicing and store operations.",
    headline: "From the counter to the final handover.",
    description:
      "A separate laundry point-of-sale and store operations project for physical shops. The mobile operations app and desktop counter workspace cover garment and service pricing, order booking, workflow progress, invoicing, collections and delivery controls.",
    tags: ["POS system", "Flutter", "Desktop web"],
    image: "/assets/projects/lndry-pos-web-overview.webp",
    imageWidth: 2400,
    imageHeight: 1238,
    format: "desktop",
    imageAlt:
      "LNDRY POS desktop counter dashboard with daily revenue, order requests, pending orders and operational shortcuts",
    logo: "/assets/brands/lndry-horizontal.png",
    browserLabel: "pos.lndry.in",
    href: "https://pos.lndry.in/",
    linkLabel: "Visit LNDRY POS",
    companionId: "lndry",
    gallery: [
      {
        id: "web-dashboard",
        label: "Desktop · Dashboard",
        src: "/assets/projects/lndry-pos-web-overview.webp",
        width: 2400,
        height: 1238,
        format: "desktop",
        alt: "LNDRY POS desktop dashboard showing order requests, pending orders, delivery signals and counter actions",
      },
      {
        id: "web-booking",
        label: "Desktop · Order booking",
        src: "/assets/projects/lndry-pos-web-booking.webp",
        width: 2400,
        height: 1238,
        format: "desktop",
        alt: "LNDRY POS desktop order booking workspace with garment catalog, service selection and charge, discount and GST controls",
      },
      {
        id: "mobile-dashboard",
        label: "Mobile · Store overview",
        src: "/assets/projects/lndry-pos-mobile-overview.webp",
        width: 1080,
        height: 2400,
        format: "mobile",
        alt: "LNDRY POS mobile store overview showing revenue, collections, orders and quick actions",
      },
      {
        id: "mobile-booking",
        label: "Mobile · Book order",
        src: "/assets/projects/lndry-pos-mobile-booking.webp",
        width: 1080,
        height: 2400,
        format: "mobile",
        alt: "LNDRY POS mobile booking interface with service categories, garment pricing, item quantities and order totals",
      },
      {
        id: "mobile-workflow",
        label: "Mobile · Order workflow",
        src: "/assets/projects/lndry-pos-mobile-order.webp",
        width: 1080,
        height: 2400,
        format: "mobile",
        alt: "LNDRY POS mobile order details with status timeline, invoice actions and delivery controls",
      },
    ],
    highlights: [
      {
        title: "Built for the shop counter",
        text: "The desktop workspace brings service selection, garment quantities, pricing, charges, discounts and tax controls into one order-building interface.",
      },
      {
        title: "Operations in the palm of your hand",
        text: "The mobile app connects daily revenue and collection summaries with booking, expenses, reports and the work waiting in the store.",
      },
      {
        title: "A visible fulfilment workflow",
        text: "Order details bring status progression, payment state, invoices and delivery controls together. The gallery shows the actual mobile and web interfaces as a separate project from the customer app.",
      },
    ],
  },
  {
    id: "rustbloom",
    seoTitle: "Rustbloom — 2D & 2.5D Game Development",
    name: "Rustbloom",
    category: "2D / 2.5D game design & development",
    relationship: "Studio work",
    status: "In development",
    seoDescription:
      "Rustbloom game development by Sayan Mondal: an ongoing platformer with layered environments, touch controls, combat, settings and graphics options.",
    headline: "A world of overgrown clockwork. Built to play.",
    description:
      "Rustbloom is an ongoing game project. The supplied mobile gameplay shows a layered garden and clockwork world, traversal and combat controls, and a dedicated settings and graphics interface. This work sits within my mobile and PC game design and development practice using Unity and Godot for 2D and 2.5D experiences.",
    tags: ["Game design", "2D / 2.5D", "Mobile / PC", "Unity / Godot"],
    image: "/assets/projects/agnix-game-gameplay.webp",
    imageWidth: 2400,
    imageHeight: 1080,
    format: "game",
    logo: "/assets/brands/agnix-studio.png",
    imageAlt:
      "Rustbloom mobile platformer gameplay in a flowering clockwork garden with touch movement, jump, dash and action controls",
    imageCaption:
      "Rustbloom · Actual mobile gameplay and settings · In development",
    companionId: "agnix-studio",
    companionText:
      "Explore the Agnix Studio company website as a separate web design and development project.",
    gallery: [
      {
        id: "gameplay",
        label: "Rustbloom · Gameplay",
        src: "/assets/projects/agnix-game-gameplay.webp",
        width: 2400,
        height: 1080,
        format: "game",
        alt: "Rustbloom gameplay showing a character and clockwork figure in a layered garden environment with mobile touch controls",
      },
      {
        id: "traversal",
        label: "Rustbloom · Traversal",
        src: "/assets/projects/agnix-game-traversal.webp",
        width: 2400,
        height: 1080,
        format: "game",
        alt: "Rustbloom character traversal through an overgrown clockwork garden with jump and dash controls",
      },
      {
        id: "combat",
        label: "Rustbloom · Combat",
        src: "/assets/projects/agnix-game-combat.webp",
        width: 2400,
        height: 1080,
        format: "game",
        alt: "Rustbloom character performing an attack in the garden platformer gameplay",
      },
      {
        id: "world",
        label: "Rustbloom · World detail",
        src: "/assets/projects/agnix-game-environment.webp",
        width: 2400,
        height: 1080,
        format: "game",
        alt: "Rustbloom environment detail with flowering trees, layered architecture and clockwork platforms",
      },
      {
        id: "settings",
        label: "Rustbloom · Settings",
        src: "/assets/projects/agnix-game-settings.webp",
        width: 2400,
        height: 1080,
        format: "game",
        alt: "Rustbloom game settings for master volume, music, sound effects and controls",
      },
      {
        id: "graphics",
        label: "Rustbloom · Graphics",
        src: "/assets/projects/agnix-game-graphics.webp",
        width: 2400,
        height: 1080,
        format: "game",
        alt: "Rustbloom graphics and performance options including graphics preset, frame-rate cap and character shadows",
      },
    ],
    highlights: [
      {
        title: "Design and engineering together",
        text: "Game design, gameplay programming and interface work come together in a playable prototype, with movement, actions and an environment built around the player.",
      },
      {
        title: "Depth in a 2D world",
        text: "Layered architecture, foliage and foreground platforms create a sense of depth while retaining a readable side-scrolling play space.",
      },
      {
        title: "An interface built for play",
        text: "The supplied mobile build includes touch movement and action controls alongside settings for audio, graphics and frame-rate limits.",
      },
      {
        title: "Ongoing production",
        text: "Rustbloom is in development. The screenshots document the current gameplay and interface work; they are separate from ANTAR’s launch announcement.",
      },
    ],
  },
  {
    id: "antar",
    seoTitle: "ANTAR — The Last Flame | Agnix Studio",
    name: "ANTAR — The Last Flame",
    category: "Game production & launch presentation",
    relationship: "Studio work",
    status: "Preparing for launch",
    seoDescription:
      "ANTAR — The Last Flame: an Agnix Studio game in the portfolio of Sayan Mondal. Production ready and preparing for launch, with its official announcement.",
    headline: "A mythological world. Ready for its first reveal.",
    description:
      "ANTAR — The Last Flame is Agnix Studio’s cinematic Indian mythological action-platformer. The studio has confirmed that the game is production ready and preparing for launch. This showcase presents its official announcement visual, separately from the ongoing Rustbloom gameplay project.",
    tags: ["Game production", "Launch preparation", "Agnix Studio"],
    image: "/assets/projects/agnix-website-home.webp",
    imageWidth: 1280,
    imageHeight: 720,
    format: "game",
    logo: "/assets/brands/agnix-studio.png",
    imageAlt:
      "Official ANTAR — The Last Flame coming-soon announcement on the Agnix Studio website",
    imageCaption:
      "ANTAR — The Last Flame · Official announcement visual · Preparing for launch",
    href: "https://www.agnixstudio.com/",
    linkLabel: "View the announcement",
    companionId: "rustbloom",
    companionText:
      "Rustbloom is the separate ongoing game project shown in the supplied mobile gameplay gallery.",
    highlights: [
      {
        title: "An original Agnix Studio game",
        text: "The official studio announcement introduces ANTAR as a cinematic Indian mythological action-platformer centred on memory, courage, compassion and sacred fire.",
      },
      {
        title: "Preparing for launch",
        text: "The studio has confirmed production readiness and launch preparation. The public announcement remains marked coming soon.",
      },
      {
        title: "A distinct game project",
        text: "ANTAR’s official announcement is presented independently from Rustbloom, whose gallery shows an ongoing game build.",
      },
    ],
  },
  {
    id: "agnix-studio",
    name: "Agnix Studio",
    category: "Game studio company website",
    relationship: "Client project",
    seoDescription:
      "Agnix Studio website by Sayan Mondal: a cinematic company and game announcement site featuring ANTAR — The Last Flame and the studio’s original identity.",
    headline: "A cinematic stage for an original studio.",
    description:
      "The Agnix Studio company website brings the studio identity and the ANTAR — The Last Flame announcement into a cinematic presentation. Original branding, atmospheric imagery and a focused announcement create the public-facing introduction to the studio’s game work.",
    tags: ["Web design", "Website development", "Game studio"],
    image: "/assets/projects/agnix-website-home.webp",
    imageWidth: 1280,
    imageHeight: 720,
    format: "desktop",
    logo: "/assets/brands/agnix-studio.png",
    browserLabel: "agnixstudio.com",
    imageAlt:
      "Agnix Studio company website featuring its gold logo and cinematic ANTAR — The Last Flame announcement",
    imageCaption:
      "Original Agnix Studio company website · agnixstudio.com / agnixstudio.in",
    href: "https://www.agnixstudio.com/",
    linkLabel: "Visit agnixstudio.com",
    externalLinks: [
      { label: "agnixstudio.in", href: "https://www.agnixstudio.in/" },
    ],
    companionId: "antar",
    companionText:
      "ANTAR — The Last Flame has its own game project entry, with the launch announcement and confirmed production status.",
    highlights: [
      {
        title: "A clear studio identity",
        text: "The original Agnix Studio mark anchors the site and carries through the cinematic visual direction.",
      },
      {
        title: "An announcement with focus",
        text: "Atmospheric imagery and the original title artwork introduce ANTAR — The Last Flame with a clear coming-soon message.",
      },
      {
        title: "Company website delivery",
        text: "This is the studio’s web design and development project, distinct from the playable game projects. Both supplied domains resolve to the studio presentation.",
      },
    ],
  },
  {
    id: "shotvault",
    seoDescription:
      "ShotVault by Sayan Mondal: self-hosted media infrastructure combining S3-style object storage and on-demand image delivery in a Go binary.",
    name: "ShotVault",
    category: "Media infrastructure",
    relationship: "Studio work",
    headline: "One binary. All your media.",
    description:
      "Self-hosted media infrastructure for the Shotlin product family, combining S3-style object storage and on-demand image delivery in a Go binary.",
    tags: ["Go", "S3 API", "Image delivery"],
    highlights: [
      {
        title: "A compact foundation",
        text: "Object storage, image delivery, SQLite and a containerized runtime support the Shotlin product family.",
      },
    ],
  },
  {
    id: "fullbag",
    seoDescription:
      "Explore Full Bag, a commerce platform in the Shotlin product family built across customer-facing mobile experiences and supporting backend systems.",
    name: "Full Bag",
    category: "Commerce platform",
    relationship: "Studio work",
    headline: "Commerce, thoughtfully connected.",
    description:
      "A commerce platform in the Shotlin product family, built across mobile and backend. A closer walkthrough is available on request.",
    tags: ["Commerce", "Mobile", "Backend"],
    highlights: [
      {
        title: "Mobile meets backend",
        text: "Commerce flows connect the customer-facing mobile experience with its supporting backend.",
      },
    ],
  },
  {
    id: "shotlin",
    seoDescription:
      "Shotlin is the independent product studio founded by Sayan Mondal, connecting product thinking, interface design, engineering and infrastructure.",
    name: "Shotlin",
    category: "Independent product studio",
    relationship: "Studio work",
    headline: "A studio for ambitious software.",
    description:
      "Shotlin is the product studio I founded to connect interface design, website and mobile app development, business dashboards and software engineering. Its work spans commerce and operational workflows, supported by the infrastructure behind each product.",
    tags: ["Web development", "App development", "Software engineering"],
    highlights: [
      {
        title: "From first idea to release",
        text: "Product thinking, interface design, engineering and infrastructure come together in one delivery process.",
      },
      {
        title: "Customer-facing apps and business systems",
        text: "Websites, mobile apps and dashboards are designed around the people using them and the operations supporting them. Portfolio examples show commerce, booking, store and CRM workflows.",
      },
      {
        title: "Founder-led product engineering",
        text: "I’m Sayan Mondal, founder of Shotlin and Opslin. My work connects interface design, backend development and deployment. Opslin is presented separately as my independent deployment product.",
      },
    ],
  },
];

export const clientProjects = projects.filter(
  (project) =>
    project.relationship === "Client project" && project.format === "mobile",
);
export const ownProduct = projects.find((project) => project.id === "opslin")!;
export const laundryProjects = projects.filter(
  (project) => project.id === "lndry" || project.id === "lndry-pos",
);
export const otherProjects = projects.filter(
  (project) =>
    project.relationship === "Studio work" &&
    !laundryProjects.includes(project) &&
    !["rustbloom", "antar"].includes(project.id),
);
export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}
