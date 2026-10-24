export const servicePages = [
  {
    slug: "website-web-app-development",
    title: "Website & Custom Web Application Development",
    seoTitle: "Custom Web Application Development — Sayan Mondal",
    description:
      "Website development services and custom web applications by Sayan Mondal: Next.js dashboards, booking and commerce, with real project examples.",
    serviceTitles: ["Web & product engineering"],
    intro:
      "My website development services cover business websites and custom web application development: customer portals, booking systems, commerce and operational dashboards. I’m Sayan Mondal, founder of Shotlin and Opslin, working from Kolkata with businesses remotely. If you’re comparing a website developer, software agency or product partner, this page explains the work I can take on and the evidence you can inspect.",
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
        title: "What you receive with a custom web application",
        text: "Agree the deliverables before development: the customer and administrator journeys, data model, integrations, acceptance checks, source access and release instructions. A booking portal might need appointment availability and cancellation rules; a B2B dashboard might need account-specific permissions and order approval. A proposal should say which of those journeys are included, who supplies content and external accounts, and which ongoing hosting or service charges remain with the owner.",
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
    title: "DevOps Consulting & Cloud Deployment",
    seoTitle: "DevOps Consulting Services & Deployment — Sayan Mondal",
    description:
      "DevOps consulting services for Linux VPS deployment, Docker and CI/CD. Work with Sayan Mondal, founder of Opslin, on releases, monitoring and handover.",
    serviceTitles: ["Cloud & infrastructure"],
    intro:
      "My DevOps consulting services help developers and businesses move from a working application to a release they can operate. My DevOps work connects Linux server setup, Docker, deployment pipelines, domains, monitoring and recovery planning. I’m Sayan Mondal, founder of Opslin and Shotlin, based in Kolkata and working with teams worldwide.",
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
        title: "CI/CD implementation and deployment acceptance checks",
        text: "CI/CD is the automated path from a code change through checks to a release. For an agreed application, the handover can include a pipeline configuration, a documented environment-variable inventory without secret values, build and runtime log locations, a health-check URL and rollback instructions. Before accepting the work, test a successful deployment, a failed build and recovery to the previous application release. Confirm separately what happens to database migrations; rolling back code does not reverse a data change safely by itself.",
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
    seoTitle: "Flutter App Development Services — Sayan Mondal",
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
    title: "AI Automation & Custom Software Development",
    seoTitle: "AI Automation & Custom Software Services — Sayan Mondal",
    description:
      "AI automation services, AI agent development and custom business software by Sayan Mondal. Explore WhatsApp CRM, B2B workflows and actual product screens.",
    serviceTitles: ["AI & intelligent automation"],
    intro:
      "My AI automation services and custom software development connect the interface people use with the business process behind it. That can mean a Next.js product, an operations dashboard, a customer workflow or an AI assistant that works with defined tools. I’m Sayan Mondal, founder of Opslin and Shotlin, working across design, backend engineering and deployment.",
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
        title: "AI agent development services for a specific business task",
        text: "An AI agent should have a narrow job and a measurable acceptance test. For a customer-support workflow, define the approved knowledge source, which account or order details it can read, when it must hand off to a person and which actions require approval. Test incorrect customer details, missing information and failed external services before release. Measure useful answers and safe handoffs against a reviewed set of examples, together with response time and per-task usage costs; do not rely on a successful chat demonstration alone.",
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
        title: "WhatsApp CRM and workflow automation: define the boundary",
        text: "The Bakaloo project gallery shows a shared WhatsApp inbox, customer pipeline, team chat, message templates and a visual storefront builder. For a new workflow, decide who owns each conversation, which system is the source of customer information and how an enquiry becomes an order. Template availability, messaging permissions and provider rules must be checked for the account being integrated. Internal team messages and customer replies need separate paths. A deterministic reminder or routing rule can be more suitable than an AI agent when the decision is already clear.",
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
  {
    slug: "grocery-delivery-app-development",
    title: "Grocery Delivery App Development",
    seoTitle: "Grocery Delivery App Development — Sayan Mondal",
    description:
      "Plan a grocery delivery app with customer shopping, store operations and delivery workflows. Explore FreshCart and Bakaloo project screens by Sayan Mondal.",
    serviceTitles: ["Mobile app development", "Web & product engineering"],
    intro:
      "I build grocery delivery applications around the shopping journey and the store work needed to fulfil an order. I’m Sayan Mondal, founder of Shotlin and Opslin. My FreshCart and Bakaloo project galleries show real commerce interfaces; the separate Bakaloo platform gallery shows administration, WhatsApp CRM and a storefront builder. Use this page to decide what your grocery app needs before requesting a proposal.",
    sections: [
      {
        title: "Choose a single-store, multi-store or B2B grocery model",
        text: "A single-store app can begin with one catalogue, one service area and one fulfilment team. A multi-store business needs rules for stock ownership, order routing and store-level access. B2B ordering can require account-specific catalogues, minimum quantities and approval workflows. Decide which model you operate first. Adding all three to an initial release changes the data model, interface and testing work; they should be priced as explicit requirements rather than implied by the word marketplace.",
      },
      {
        title: "The customer app: discovery through order updates",
        text: "A useful customer journey starts with delivery availability, product categories and search. Define how pack sizes, stock availability, baskets, addresses and checkout work together. For fresh produce, discuss variable weights, substitutions and price adjustments. Customers need to understand what they ordered and what happens when an item is unavailable. Payment confirmation, failed payments, cancellation and refund responsibilities must be designed with the chosen payment provider and business policy.",
      },
      {
        title: "The store dashboard and delivery workflow",
        text: "The store team needs a way to receive an order, confirm items, record changes and progress it toward dispatch. A delivery workflow needs an owner for assignment, delivery status and exceptions. A separate rider app or live map is an additional integration, not an automatic requirement for every store. Agree the operating process and service area before making a fast-delivery promise. The software can display your delivery policy; it cannot establish that a store can meet it.",
      },
      {
        title: "What FreshCart and Bakaloo show",
        text: "FreshCart’s supplied screens show categories, product cards, pack-size choices and a B2C/B2B selector. Bakaloo’s customer screens show grocery categories, fresh-arrival listings and promotional sections. The separate Bakaloo platform project shows the administration and storefront-building context. These galleries are evidence of interface work, not a claim that every feature shown is included in a new app package. Review them with your own store workflow so we can identify which patterns fit and what needs a different design.",
      },
      {
        title: "What affects grocery app development cost?",
        text: "The largest scope decisions are the number of applications and user roles, store model, existing inventory system, payment integration and delivery requirements. A customer app with a simple administrator workflow differs from a marketplace with store onboarding, rider assignment and settlement reporting. Ask for a proposal that separates discovery and design, customer experience, store tools, integrations, testing and deployment. Hosting, SMS, maps, payments and other provider charges should be listed separately. I quote after reviewing the brief; enquiry budget bands are discussion ranges, not a fixed app price.",
      },
      {
        title: "A useful first release and an acceptance checklist",
        text: "Start with one complete order journey before adding loyalty, subscriptions or AI recommendations. Acceptance checks should include an out-of-area address, an unavailable product, an interrupted payment, a duplicate checkout attempt and an order change after confirmation. Define who updates stock and how the customer learns about substitutions. Agree supported devices, administrator permissions, source-code access, deployment responsibilities and post-launch support. A launch date should follow those scope decisions rather than an untested promise of an app in a fixed number of days.",
      },
      {
        title: "Prepare a grocery app brief",
        text: "Share your store locations and delivery areas, the type of catalogue, whether you sell to households or businesses, and how orders are managed today. Include an existing stock or POS system if it needs to connect. Identify the first customer journey you want working, the team who will operate it and your preferred launch window. I work remotely from Kolkata with businesses in India and internationally; the proposal should agree review times, currency, account ownership and handover for your location.",
      },
    ],
    faqs: [
      {
        question: "How much does grocery delivery app development cost?",
        answer:
          "There is no reliable fixed quote without the store model, user roles and integrations. Request an itemised scope covering the customer app, administration, payments, delivery, testing and deployment, with ongoing provider fees separate. The budget selector on this site starts a conversation; it is not a published package price.",
      },
      {
        question: "Can I start with a grocery website instead of a mobile app?",
        answer:
          "Yes. A responsive storefront can be a useful first step when customers need to browse and order without installation. Flutter apps can be considered when repeat use or device-specific features justify them. The choice depends on the customer journey and operating requirements.",
      },
      {
        question: "Do you build quick-commerce or multi-store grocery apps?",
        answer:
          "Those workflows can be scoped, including service areas, store-level catalogues and order routing. Quick-commerce delivery times depend on stock, staffing and fulfilment operations as well as software. They must be validated for your business before being promised to customers.",
      },
      {
        question: "Can an existing inventory or POS system be connected?",
        answer:
          "The first step is reviewing the system’s API, access permissions, product identifiers and stock update behaviour. Compatibility and integration scope must be established before promising synchronisation.",
      },
    ],
    projectIds: ["freshcart", "bakaloo", "bakaloo-platform"],
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
