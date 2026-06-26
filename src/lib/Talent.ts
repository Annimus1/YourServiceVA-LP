export interface Talent {
  name: string;
  role: string;
  image: string;
  tags: string[];
}

const talents: Talent[] = [
  {
    name: "Steve Bravo",
    role: "Bookkeeping Assistant",
    image: "/img/agents/Steve.webp", 
    tags: ["QuickBooks", "Xero", "Invoicing", "Accounts Payable", "Bank Reconciliation"]
  },
  {
    name: "Keysha Thomas",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Keysha.webp",
    tags: ["Google Workspace", "Asana", "Calendar Management", "Inbox Management", "Slack"]
  },
  {
    name: "William Narváez",
    role: "Customer Support Specialist",
    image: "/img/agents/william.webp",
    tags: ["Zendesk", "Freshdesk", "Live Chat", "Intercom", "Troubleshooting"]
  },
  {
    name: "Ana Castrillo",
    role: "Executive Virtual Assistant",
    image: "/img/agents/ana.webp",
    tags: ["Notion", "HubSpot CRM", "Inbox Management", "ClickUp", "Travel Coordination"]
  },
  {
    name: "Adriana Ferrer",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Adriana.webp",
    tags: ["Microsoft 365", "Trello", "Calendar Management", "Zoom Scheduler", "Salesforce"]
  },
  {
    name: "Giselle Moret",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Giselle.webp",
    tags: ["Monday.com", "Google Workspace", "Slack", "Inbox Management", "Canva Pro"]
  },
  {
    name: "Zeyad Koura",
    role: "Executive Virtual Assistant",
    image: "/img/agents/zeyad.webp",
    tags: ["HubSpot CRM", "Asana", "Calendar Management", "Calendly", "VoIP Systems"]
  },
  {
    name: "Rodrigo Blajine",
    role: "Executive Virtual Assistant",
    image: "/img/agents/rodrigo.webp",
    tags: ["ClickUp", "Notion", "Travel Coordination", "Slack", "Microsoft Teams"]
  },
  {
    name: "Elizabeth Aviles",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Elizabeth.webp",
    tags: ["Google Workspace", "ActiveCampaign", "Inbox Management", "Trello", "Zapier"]
  },
  {
    name: "Abdulrahman Elhefnawy",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Abdelrahman.webp",
    tags: ["Salesforce CRM", "Monday.com", "Calendar Management", "Microsoft 365", "Calendly"]
  },
  {
    name: "Byron Heredia",
    role: "Executive Virtual Assistant",
    image: "/img/agents/byron.webp",
    tags: ["Asana", "HubSpot", "Travel Coordination", "Google Workspace", "Slack"]
  },
  {
    name: "Maya Abu Aisha",
    role: "Executive Virtual Assistant",
    image: "/img/agents/maya.webp",
    tags: ["ClickUp", "Notion", "Inbox Management", "Calendly", "Zoom Enterprise"]
  },
];

export function getRandomTalent(amount: number): Talent[] {
  // 1. Clonar el pool para no mutar el arreglo original mediante el algoritmo de mezcla de Fisher-Yates
  const shuffled = [...talents];
  
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // 2. Retornar solo la cantidad solicitada
  return shuffled.slice(0, amount);
}

export function getTalent() {
    return talents;
}

