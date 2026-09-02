export interface LegalSection {
  id: string;
  title: string;
  body?: string[];
  list?: string[];
  after?: string[];
}

export const legalUpdated = "August 8, 2026";
export const legalEffective = "August 8, 2026";
export const legalEmail = "contact@alikotech.com";

export const privacySections: LegalSection[] = [
  {
    id: "about-this-policy",
    title: "About This Policy",
    body: [
      "AlikoTech is the construction technology business of AlikoHub LLC and develops Alikore, a construction project control and management SaaS platform.",
      "This Privacy Policy explains how AlikoHub LLC, operating through AlikoTech (\u201cAlikoTech,\u201d \u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d), handles personal information when you visit our websites, contact us, request a pilot, create an account, or use Alikore.",
      "Where a separate pilot, subscription, enterprise, or data-processing agreement applies, that agreement may include additional terms.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: ["Depending on how you use our services, we may collect:"],
    list: [
      "Name, email, phone number, company, country, and job role",
      "Account and authentication information",
      "Pilot, contact, support, and partnership requests",
      "Company, project, and project-team information",
      "Daily logs, photos, RFIs, submittals, tasks, punch items, and documents",
      "Budget, commitment, change, billing, payment, retention, and related project information",
      "Device, browser, IP address, security, diagnostic, and usage information",
    ],
    after: [
      "We collect information provided by users and information reasonably necessary to operate, secure, and improve our services.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    body: ["We may use information to:"],
    list: [
      "Operate AlikoTech and Alikore",
      "Create and manage accounts and project workspaces",
      "Provide requested product functionality",
      "Support onboarding and pilot implementation",
      "Respond to inquiries and support requests",
      "Maintain security and troubleshoot problems",
      "Improve product usability and workflows",
      "Communicate about accounts, pilots, services, and important updates",
      "Comply with applicable legal obligations",
    ],
    after: ["We aim to collect only information reasonably relevant to these purposes."],
  },
  {
    id: "customer-project-data",
    title: "Customer Project Data",
    body: [
      "Customers retain their rights in the project information they submit to Alikore.",
      "AlikoTech processes customer project information to provide, maintain, secure, and improve the service in accordance with applicable agreements.",
      "AlikoTech retains ownership of its software, platform architecture, interfaces, workflows, documentation, and other intellectual property.",
    ],
  },
  {
    id: "ai-assisted-features",
    title: "AI-Assisted Features",
    body: [
      "Alikore may include selected AI-assisted workflows, including daily-log structuring and summarization, RFI draft assistance, project Q&A through AI Copilot, and basic document classification where enabled.",
      "AI-generated information is assistive, not autonomous. Users remain responsible for reviewing generated content before relying on or submitting it.",
      "Alikore\u2019s current Phase 1 AI scope does not include autonomous approvals, autonomous project actions, computer vision, or cost, delay, or cash-flow prediction.",
    ],
  },
  {
    id: "service-providers",
    title: "Service Providers",
    body: ["We may use trusted technology providers to support functions such as:"],
    list: [
      "Cloud hosting and storage",
      "Authentication",
      "Email and communications",
      "Monitoring and security",
      "Analytics where enabled",
      "AI-assisted functionality where enabled",
    ],
    after: [
      "Information may be processed by these providers only as reasonably necessary to support the relevant service and subject to applicable agreements.",
      "We may also disclose information when required by law, necessary to protect our services or users, or as part of a legitimate corporate transaction.",
    ],
  },
  {
    id: "security-and-retention",
    title: "Security and Retention",
    body: [
      "We use administrative, technical, and organizational measures designed to protect information appropriate to the nature of our services.",
      "No internet-based service can guarantee absolute security.",
      "We retain information for as long as reasonably necessary to provide the services, meet contractual or legal requirements, resolve disputes, and maintain legitimate business records. Information may then be deleted, de-identified, or otherwise disposed of in accordance with applicable requirements and system capabilities.",
    ],
  },
  {
    id: "international-processing",
    title: "International Processing",
    body: [
      "AlikoHub LLC is based in the United States, while Alikore is beginning its flagship deployment and pilot activity in Ethiopia.",
      "Information may therefore be processed across national borders depending on the services and infrastructure used.",
      "Where required, AlikoTech will take appropriate measures relating to international processing and applicable data-protection requirements.",
    ],
  },
  {
    id: "your-choices-and-rights",
    title: "Your Choices and Rights",
    body: [
      "Depending on applicable law, you may have rights to request access, correction, deletion, or other action concerning your personal information.",
      "For information controlled by an organization using Alikore, requests may need to be directed to that organization.",
      `Privacy inquiries can be sent to ${legalEmail}.`,
    ],
  },
  {
    id: "changes-to-this-policy",
    title: "Changes to This Policy",
    body: [
      "We may update this Privacy Policy as our products, services, and legal requirements evolve.",
      "The latest version will be identified by the \u201cLast Updated\u201d date above.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About These Terms",
    body: [
      "These Terms of Service (\u201cTerms\u201d) govern access to websites, software, and services operated by AlikoHub LLC through AlikoTech, including Alikore where these Terms are referenced.",
      "AlikoTech is the construction technology business of AlikoHub LLC. Alikore is AlikoTech\u2019s construction project control and management SaaS product.",
      "By accessing or using a service covered by these Terms, you agree to these Terms.",
      "If you use the service on behalf of an organization, you represent that you are authorized to do so.",
    ],
  },
  {
    id: "separate-customer-agreements",
    title: "Separate Customer Agreements",
    body: ["Alikore may be provided under a separate:"],
    list: [
      "Pilot agreement",
      "Subscription agreement",
      "Order form",
      "Enterprise agreement",
      "Data-processing agreement",
    ],
    after: [
      "If a signed agreement conflicts with these Terms, the signed agreement controls for that customer and subject matter.",
    ],
  },
  {
    id: "accounts-and-authorized-use",
    title: "Accounts and Authorized Use",
    body: ["Users are responsible for:"],
    list: [
      "Providing accurate account information",
      "Protecting passwords and credentials",
      "Using accounts only as authorized",
      "Promptly reporting suspected unauthorized access",
    ],
    after: [
      "Organizations may control users, project membership, permissions, and access to organization-managed information.",
      "You may not misuse the services, attempt unauthorized access, interfere with security, introduce malicious software, violate another person\u2019s rights, or use the platform for unlawful activity.",
    ],
  },
  {
    id: "customer-content",
    title: "Customer Content",
    body: [
      "Customers retain their rights in information submitted to Alikore.",
      "You grant AlikoTech the limited rights necessary to host, process, store, display, transmit, back up, and otherwise handle that information to provide and support the service.",
      "You are responsible for ensuring that you have appropriate authority to submit the information you provide.",
    ],
  },
  {
    id: "alikore-and-ai-assisted-features",
    title: "Alikore and AI-Assisted Features",
    body: [
      "Alikore supports construction project-control workflows including field activity, project records, team coordination, cost visibility, and selected AI-assisted functionality.",
      "Current Phase 1 AI capabilities may include:",
    ],
    list: [
      "Daily Log Structuring",
      "Daily Log Summarization",
      "RFI Draft Generation",
      "AI Copilot project Q&A",
      "Basic Document Classification where enabled",
    ],
    after: [
      "AI-generated information may contain errors and must be reviewed by users.",
      "AI assists. Project teams decide.",
      "Alikore\u2019s current Phase 1 AI is not designed to autonomously approve project actions or provide cost, delay, or cash-flow prediction.",
    ],
  },
  {
    id: "construction-responsibility",
    title: "Construction Responsibility",
    body: [
      "Alikore is a software tool and does not replace professional construction judgment.",
      "AlikoTech does not act as your:",
    ],
    list: [
      "Contractor",
      "Engineer",
      "Architect",
      "Project manager",
      "Safety professional",
      "Accountant",
      "Lawyer",
      "Financial adviser",
    ],
    after: [
      "Customers remain responsible for project decisions, contractual obligations, safety, regulatory compliance, approvals, financial records, and professional judgment.",
    ],
  },
  {
    id: "pilot-and-early-stage-features",
    title: "Pilot and Early-Stage Features",
    body: [
      "Some Alikore functionality may be offered as an MVP, pilot, beta, preview, or early-access capability.",
      "Such features may change, contain limitations, or be improved based on customer feedback.",
      "A roadmap, concept, prototype, or planned feature is not a promise that the feature is currently available or will be released on a particular date.",
    ],
  },
  {
    id: "fees-and-commercial-terms",
    title: "Fees and Commercial Terms",
    body: [
      "Pricing, pilot fees, subscriptions, included usage, implementation services, billing periods, and other commercial terms will be stated on the applicable pricing page, order form, or customer agreement.",
      "Where a separate written agreement exists, that agreement controls.",
    ],
  },
  {
    id: "multi-currency-functionality",
    title: "Multi-Currency Functionality",
    body: [
      "Where enabled, Alikore may support project information involving multiple currencies.",
      "Alikore does not provide banking, foreign-exchange, accounting, or financial-advisory services.",
      "Customers remain responsible for verifying exchange rates, contractual obligations, taxes, and accounting treatment applicable to their projects.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: ["AlikoHub LLC and AlikoTech retain all rights to AlikoTech and Alikore technology, including their:"],
    list: [
      "Software",
      "Source code",
      "Interfaces",
      "Designs",
      "Documentation",
      "APIs",
      "Workflows",
      "Architecture",
      "Algorithms",
      "Trademarks and branding",
    ],
    after: [
      "These Terms give authorized users the right to use the applicable service; they do not transfer ownership of AlikoTech intellectual property.",
      "Customer ownership of submitted project information is not affected.",
    ],
  },
  {
    id: "availability-and-service-changes",
    title: "Availability and Service Changes",
    body: [
      "We work to maintain reliable services but do not guarantee uninterrupted or error-free availability unless a separate written agreement expressly provides a service-level commitment.",
      "AlikoTech may update the services to improve functionality, security, reliability, legal compliance, or product development.",
      "Do not interpret product-roadmap information as a contractual commitment.",
    ],
  },
  {
    id: "suspension-and-termination",
    title: "Suspension and Termination",
    body: ["Access may be restricted or suspended when reasonably necessary to address:"],
    list: [
      "Security threats",
      "Unlawful activity",
      "Material misuse",
      "Violations of these Terms",
      "Emergency maintenance",
      "Legal requirements",
    ],
    after: [
      "Termination of paid subscriptions or pilots will be governed primarily by the applicable customer agreement.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    body: [
      "To the extent permitted by applicable law, services provided only under these public Terms are offered on an \u201cas available\u201d and \u201cas is\u201d basis unless a separate written agreement provides otherwise.",
      "Alikore does not guarantee particular project costs, schedules, profits, safety results, regulatory outcomes, or construction outcomes.",
      "Users should independently verify information used for material construction or commercial decisions.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: [
      "To the maximum extent permitted by applicable law, AlikoHub LLC and AlikoTech will not be responsible under these public Terms for indirect, incidental, special, exemplary, or consequential losses resulting solely from use of the services.",
      "Any specific financial liability limits for pilots, subscriptions, or enterprise customers should be established in the applicable signed customer agreement.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    body: ["Use of the services is also subject to the AlikoTech Privacy Policy."],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    body: [
      "Unless applicable law requires otherwise or a separate written customer agreement states differently, these Terms are governed by the laws of the State of Washington, United States, without regard to conflict-of-law principles.",
    ],
  },
  {
    id: "changes-to-these-terms",
    title: "Changes to These Terms",
    body: [
      "We may update these Terms as our services, commercial model, or legal requirements change.",
      "The most recent version will display its updated effective date.",
    ],
  },
];
