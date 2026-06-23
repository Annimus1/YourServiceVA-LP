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
    tags: ["QuickBooks", "Invoicing", "Accounts Payable", "Bank Reconciliation", "Financial Reports"]
  },
  {
    name: "Keysha Thomas",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Keysha.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "William Narváez",
    role: "Customer Support Specialist",
    image: "/img/agents/william.webp",
    tags: ["Email Support", "Live Chat", "Zendesk", "Troubleshooting", "Customer Retention"]
  },
  {
    name: "Ana Castrillo",
    role: "Executive Virtual Assistant",
    image: "/img/agents/ana.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Adriana Ferrer",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Adriana.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
];

export function getRandomTalent(amount:number): Talent[] {
    return [];
}

export function getTalent() {
    return talents;
}

