export const servicePages = [
  {
    slug: "website-web-app-development",
    title: "Website & Web App Development",
    seoTitle: "Website & Web App Developer — Sayan Mondal",
    description:
      "Business websites, Next.js web apps and customer dashboards by Sayan Mondal. Founder-led development from Kolkata for remote clients worldwide.",
    serviceTitles: ["Web & product engineering"],
    intro:
      "I build business websites and web applications that connect a clear customer experience with the systems behind it. I’m Sayan Mondal, founder of Shotlin and Opslin, working from Kolkata with businesses remotely. If you’re comparing a website developer, software agency or product partner, this page explains the work I can take on and the evidence you can inspect.",
    sections: [
      {
        title: "A business website or a web application?",
        text: "A business website helps people understand your offer, find information and make an enquiry. A web application lets them complete a task: book a service, place an order, use an account or manage operations. Some businesses need both. The first step is choosing the smallest useful solution for the customer journey instead of adding features simply because a competitor has them.",
      },
      {
        title: "Design, development and the supporting systems",
        text: "The scope can include responsive page design, Next.js development, accessible navigation, content structure, enquiry journeys and integrations. For a web application it can extend to authentication, APIs, databases, dashboards and payments. Each integration needs a defined owner, access model and failure behaviour so the product works beyond its first successful demonstration.",
      },
      {
        title: "Mobile usability and a clear release path",
        text: "The experience needs to work on a phone as well as a laptop. I consider readable content, practical forms, image delivery and navigation alongside backend requirements. Before a release, the agreed scope should identify domain and hosting access, deployment settings, application checks, monitoring needs and who maintains the system afterward.",
      },
      {
        title: "Real websites and operational products",
        text: "The portfolio includes the LNDRY customer website and mobile experience, the Agnix Studio company website, and Bakaloo’s operational platform and storefront builder. Those are different products with different requirements. Their project pages show actual interfaces and describe my work, providing a more useful starting point than a generic list of services.",
      },
      {
        title: "Get an estimate with the right assumptions",
        text: "Share the purpose of the site, the audience, essential pages or workflows, required integrations and any existing design or code. Include a preferred launch window and budget if known. We can then discuss what should be built first, which parts can use existing tools, and what a scoped proposal needs to include. Pricing and timing depend on those decisions; a precise quote needs a project brief.",
      },
    ],
    faqs: [
      {
        question: "Can you create a website for a business outside India?",
        answer:
          "Yes. I’m based in Kolkata and available for remote projects worldwide. We should agree communication, review times, requirements, account access and delivery responsibilities before starting.",
      },
      {
        question: "Do I need a mobile app or a responsive website?",
        answer:
          "A responsive website may be enough for discovery, enquiries and simpler booking or commerce flows. A mobile app can make sense for device capabilities or repeat use. The right choice depends on your users and the task, not a fixed rule.",
      },
      {
        question: "What affects the cost and timeline?",
        answer:
          "The number and complexity of workflows, design requirements, content readiness, integrations, existing code and review process all matter. A short project brief helps define a useful first release and a realistic estimate.",
      },
    ],
    projectIds: ["lndry", "agnix-studio", "bakaloo-platform"],
  },
  {
    slug: "devops-cloud-deployment",
    title: "DevOps & Cloud Deployment",
    seoTitle: "DevOps & Cloud Deployment — Sayan Mondal",
    description:
      "DevOps and cloud engineering by Sayan Mondal, founder of Opslin: Linux VPS deployment, Docker, CI/CD, monitoring and application handover.",
    serviceTitles: ["Cloud & infrastructure"],
    intro:
      "I help developers and businesses move from a working application to a release they can operate. My DevOps work connects Linux server setup, Docker, deployment pipelines, domains, monitoring and recovery planning. I’m Sayan Mondal, founder of Opslin and Shotlin, based in Kolkata and working with teams worldwide.",
    sections: [
      {
        title: "A deployment is more than a successful build",
        text: "A production application needs a runtime, configuration, secrets, a domain, HTTPS and access to its data. It also needs a clear release process and a way to investigate problems. I work across those connections so the application and its infrastructure are considered together, rather than handed over as separate pieces.",
      },
      {
        title: "Start with the workload and the server you control",
        text: "The first step is understanding the application, its dependencies, expected usage and operating constraints. A static website, API and database-backed service have different needs. Server sizing should consider memory, build requirements, storage and traffic; there is no single VPS specification that fits every product. That review shapes the deployment approach and the checks needed before launch.",
      },
      {
        title: "Build a repeatable path to production",
        text: "The scope can include Docker configuration, Linux VPS provisioning, deployment pipelines, environment variables, domain and SSL setup, and application health checks. A release should have a clear target environment, observable build and runtime logs, and a way to return to a known working application version. Database changes and data recovery need their own plan.",
      },
      {
        title: "Operate and hand over the system",
        text: "Monitoring and logs help explain what happens after release. I consider the operating workflow alongside deployment: what to watch, where to inspect a failure, who has access, and what the owner needs to maintain the system. Ongoing support, alerts, backups and response expectations should be agreed for the particular workload.",
      },
      {
        title: "Opslin is evidence of this work",
        text: "I founded Opslin, a deployment platform for a Linux VPS you own or rent. It connects apps, releases, databases, monitoring and rollback in a dashboard, with a permissioned MCP beta for supported AI-assisted operations. Opslin is a separate product you can explore directly; its project page shows the interface and explains the operating model.",
      },
    ],
    faqs: [
      {
        question: "Can you deploy an existing application to my VPS?",
        answer:
          "Yes. I can review the runtime, source, database and server requirements, then define a deployment and handover scope. The exact approach depends on compatibility and access to the infrastructure.",
      },
      {
        question: "What should I prepare before a deployment?",
        answer:
          "Prepare the application repository, runtime requirements, domain access, server details and any database or external service dependencies. Share secrets through an appropriate secure channel rather than a public enquiry message.",
      },
      {
        question: "Is rollback the same as a database backup?",
        answer:
          "No. Release rollback restores an application version. Backups and restore procedures protect data; schema changes may require a separate migration and recovery plan.",
      },
    ],
    projectIds: ["opslin", "shotvault"],
  },
  {
    slug: "flutter-app-development",
    title: "Flutter App Development",
    seoTitle: "Flutter App Developer — Sayan Mondal, Kolkata",
    description:
      "Flutter app development for Android and iOS by Sayan Mondal. Explore customer apps, booking, commerce and store workflows with real project screens.",
    serviceTitles: ["Mobile app development"],
    intro:
      "I design and build Flutter applications around the work people need to complete: discovering a service, placing an order, booking a pickup or managing a store. I’m Sayan Mondal, a software developer and founder of Opslin and Shotlin in Kolkata, India. My portfolio connects mobile interfaces with the backend systems that support them.",
    sections: [
      {
        title: "Start with the customer journey",
        text: "An app project begins with its users, the key tasks and the operational process behind each screen. A laundry booking experience needs service selection and pickup details. A commerce app needs a useful catalogue and a coherent order journey. Those requirements shape the navigation, interface states and supporting APIs before additional features are added.",
      },
      {
        title: "A shared Flutter codebase with platform checks",
        text: "Flutter can support shared interface code across Android and iOS. That still leaves platform-specific work: permissions, notifications, payment integrations, deep links, device capabilities and release requirements must be checked for the intended devices. I plan the shared experience together with those differences rather than assuming the same build behaves identically everywhere.",
      },
      {
        title: "Connect the app to real operations",
        text: "Depending on the project, the scope can include authentication, API integration, state management, search, booking, notifications, payments or order tracking. The right first release is the one that completes a useful journey reliably. Error, empty, loading and interrupted-network states deserve attention alongside the main screens.",
      },
      {
        title: "Real applications and separate business workflows",
        text: "The portfolio includes FreshCart, Dealker and Bakaloo mobile interfaces, plus the LNDRY customer application and its separate store POS project. Their galleries show the actual supplied product screens. Keeping the customer and store experiences distinct makes the role of each product easier to understand and the next project’s requirements easier to discuss.",
      },
      {
        title: "From prototype to a maintainable release",
        text: "The delivery scope should cover the interface, backend integration, device testing and the agreed release path. Before quoting a new app, I review its target platforms, required integrations, existing backend and the responsibilities of the people maintaining it. That gives the project a practical boundary without promising a timeline before the requirements are known.",
      },
    ],
    faqs: [
      {
        question: "Can one Flutter app support Android and iOS?",
        answer:
          "Flutter supports both platforms with shared code. Device testing and platform-specific integrations still need their own checks. The final scope depends on the app’s requirements.",
      },
      {
        question: "Can you connect an app to an existing backend?",
        answer:
          "Yes. The first step is reviewing the available API, authentication, data model and required workflows so the mobile experience fits the existing system.",
      },
      {
        question: "Can I see your app work before discussing a project?",
        answer:
          "Yes. The linked portfolio galleries show actual app screens for commerce, booking and store operations, along with each project’s description and role.",
      },
    ],
    projectIds: ["freshcart", "dealker", "bakaloo", "lndry", "lndry-pos"],
  },
  {
    slug: "custom-software-ai-development",
    title: "Custom Software & AI Development",
    seoTitle: "Custom Software & AI Developer — Sayan Mondal",
    description:
      "Custom software, Next.js dashboards, SaaS and AI workflows by Sayan Mondal, founder of Opslin and Shotlin. Explore real commerce and CRM projects.",
    serviceTitles: ["AI & intelligent automation"],
    intro:
      "I build software that connects the interface people use with the business process behind it. That can mean a Next.js product, an operations dashboard, a customer workflow or an AI assistant that works with defined tools. I’m Sayan Mondal, founder of Opslin and Shotlin, working across design, backend engineering and deployment.",
    sections: [
      {
        title: "Define the workflow before choosing the features",
        text: "Useful custom software starts with the task it needs to improve. I look at the users, existing tools, data and decisions that form the workflow. That makes it possible to define an initial release around a complete process rather than a long list of disconnected screens.",
      },
      {
        title: "Web products and business dashboards",
        text: "My work covers full-stack web applications, Next.js interfaces, APIs, databases and operational tools. Depending on the project, that can include authentication, tenant boundaries, payments, real-time updates and role-based access. The architecture and interface should support the people who operate the product as well as its customers.",
      },
      {
        title: "AI that works within a defined boundary",
        text: "AI workflows can help retrieve information, explain an issue or act through approved tools. I work with agents, retrieval and automation in the context of the actual operation. The scope should specify inputs, permissions, expected outputs and where a person reviews an action. AI output needs evaluation against the task; adding a chat interface alone does not establish that a business problem has been solved.",
      },
      {
        title: "Connected commerce, CRM and operational systems",
        text: "The Bakaloo platform work includes WhatsApp CRM, customer pipeline, team communication and a storefront theme builder, alongside B2B workflows and AI automation. LNDRY POS shows another operating context: order booking, garment selection and delivery progress for a store. The galleries provide concrete examples to discuss when planning a different workflow.",
      },
      {
        title: "A delivery process that includes deployment",
        text: "A new product needs a release path, configuration and a handover as well as working screens. I connect product design and engineering with the cloud infrastructure behind the application. Opslin, my independent VPS deployment product, is a separate example of that work and can be explored through its product overview and founder’s guide.",
      },
    ],
    faqs: [
      {
        question: "Can you build a custom dashboard or SaaS product?",
        answer:
          "Yes. I work on interfaces, APIs, databases and deployment. We first define the users, workflows, integrations and access model to agree the initial scope.",
      },
      {
        question: "Can AI be added to an existing business workflow?",
        answer:
          "Potentially. The workflow needs accessible data, an appropriate permission model and a clear task to evaluate. Some tasks benefit more from a reliable conventional automation than an AI agent.",
      },
      {
        question: "Do you offer game development too?",
        answer:
          "Yes. My portfolio separately covers game design and development for mobile and PC using Unity and Godot, including 2D and 2.5D work.",
      },
    ],
    projectIds: ["bakaloo-platform", "lndry-pos", "opslin"],
  },
];

export const profileFaqs = [
  {
    question: "Who is Sayan Mondal?",
    answer:
      "Sayan Mondal, also known as SayanTheCoder, is a software, app and DevOps developer based in Kolkata, India, and the founder of Opslin and Shotlin.",
  },
  {
    question: "What does Opslin do?",
    answer:
      "Opslin is Sayan’s independent VPS deployment product. It connects applications, releases, domains, SSL, databases, logs, monitoring and rollback on a supported Linux server you control, with a permissioned MCP beta for supported AI-assisted operations.",
  },
  {
    question: "What is Shotlin?",
    answer:
      "Shotlin is the product studio founded by Sayan Mondal. Its work connects interface design, websites, mobile applications, business dashboards and software engineering.",
  },
  {
    question: "Can you build an app and deploy its backend?",
    answer:
      "Yes. My services cover Flutter mobile apps, web and backend development, and cloud deployment. The linked projects show customer apps, store tools, CRM workflows and infrastructure work.",
  },
];
