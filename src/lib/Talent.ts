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
  {
    name: "Giselle Moret",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Giselle.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Zeyad Koura",
    role: "Executive Virtual Assistant",
    image: "/img/agents/zeyad.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Rodrigo Blajine",
    role: "Executive Virtual Assistant",
    image: "/img/agents/rodrigo.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Elizabeth Aviles",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Elizabeth.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Abdulrahman Elhefnawy",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Abdelrahman.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Byron Heredia",
    role: "Executive Virtual Assistant",
    image: "/img/agents/byron.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
  },
  {
    name: "Jellomae Colina Quirante",
    role: "Executive Virtual Assistant",
    image: "/img/agents/Abdelrahman.webp",
    tags: ["Calendar Management", "Inbox Management", "Travel Coordination", "Client Communication", "CRM Tools"]
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

