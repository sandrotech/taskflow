// Central data store for the dashboard
export interface Task {
  id: string;
  date: string;
  client: string;
  title: string;
  type: "Feed" | "Carrossel" | "Stories" | "Adaptação";
  status: "done" | "producing" | "awaiting" | "late";
  priority: "normal" | "high" | "critical";
  notes?: string;
}

export interface FocusTimer {
  state: "running" | "paused" | "stopped";
  todaySeconds: number;
  sessionSeconds: number;
  weekSeconds: number;
  taskInFocus: string | null;
}

export const initialTasks: Task[] = [
  {
    id: "T-101",
    date: "2025-10-22",
    client: "TechStartup",
    title: "Carrossel Lançamento - v2",
    type: "Carrossel",
    status: "producing",
    priority: "high",
  },
  {
    id: "T-102",
    date: "2025-10-22",
    client: "Silva & Associados",
    title: "Feed jurídico - revisão",
    type: "Feed",
    status: "awaiting",
    priority: "normal",
  },
  {
    id: "T-103",
    date: "2025-10-23",
    client: "AS Eventos",
    title: "Stories pacote - ajustes",
    type: "Stories",
    status: "late",
    priority: "critical",
  },
  {
    id: "T-104",
    date: "2025-10-25",
    client: "TechStartup",
    title: "Adaptação Feed→Story",
    type: "Adaptação",
    status: "producing",
    priority: "normal",
  },
  {
    id: "T-105",
    date: "2025-10-28",
    client: "Pedro Costa",
    title: "Feed promocional",
    type: "Feed",
    status: "producing",
    priority: "normal",
  },
  {
    id: "T-106",
    date: "2025-10-30",
    client: "Silva & Associados",
    title: "Carrossel institucional",
    type: "Carrossel",
    status: "producing",
    priority: "high",
  },
];

export const initialFocusTimer: FocusTimer = {
  state: "paused",
  todaySeconds: 0,
  sessionSeconds: 0,
  weekSeconds: 0,
  taskInFocus: null,
};

export const kpiData = {
  projetosAtivos: 3,
  valorMes: 15000,
  valorRecebido: 9400,
  aReceber: 5600,
};

export const revenueByClient = [
  { name: "TechStartup", value: 3000 },
  { name: "Silva & Associados", value: 2500 },
  { name: "Pedro Costa", value: 1200 },
];

export const deliveryStatusData = [
  { label: "Em produção", count: 4, color: "#FFD75A" },
  { label: "Enviados", count: 5, color: "#FFD75A" },
  { label: "Aguardando aprovação", count: 1, color: "#FFC93A" },
  { label: "Aprovados", count: 12, color: "#78E08F" },
  { label: "Em ajuste", count: 2, color: "#FF6B6B" },
];

export interface Client {
  id: string;
  name: string;
  type: "Agência" | "Cliente Final";
  limit: number;
  balance: number;
  status: "active" | "inactive" | "warning";
  email?: string;
  phone?: string;
  whatsapp?: string;
  photo?: string;
  notes?: string;
}

export interface Product {
  id: string;
  name: string;
  type: "Feed" | "Carrossel" | "Stories" | "Identidade" | "Adaptação" | "Outro";
  description: string;
  defaultPrice: number;
  deliveryTime: number; // in days
  notes?: string;
}

export interface ClientProduct {
  clientId: string;
  productId: string;
  customPrice: number;
  isActive: boolean;
}

export interface Delivery {
  id: string;
  client: string;
  title: string;
  date: string;
  status: "Enviado" | "Aguardando" | "Aprovado" | "Em Ajuste";
  files: string[];
}

export interface FinanceEntry {
  date: string;
  client: string;
  type: string;
  desc: string;
  value: number;
  status: "Pago" | "A Receber";
}

export const clients: Client[] = [
  {
    id: "C-01",
    name: "TechStartup",
    type: "Agência",
    limit: 1200,
    balance: 900,
    status: "active",
    email: "contato@techstartup.com",
    phone: "(11) 98765-4321",
    whatsapp: "(11) 98765-4321",
    notes: "Agência focada em startups de tecnologia",
  },
  {
    id: "C-02",
    name: "Silva & Associados",
    type: "Cliente Final",
    limit: 800,
    balance: 620,
    status: "active",
    email: "silva@advocacia.com",
    phone: "(11) 3456-7890",
  },
  {
    id: "C-03",
    name: "AS Eventos",
    type: "Agência",
    limit: 1000,
    balance: -120,
    status: "warning",
    email: "contato@aseventos.com",
    phone: "(11) 99887-6655",
    whatsapp: "(11) 99887-6655",
  },
  {
    id: "C-04",
    name: "Pedro Costa",
    type: "Cliente Final",
    limit: 500,
    balance: 350,
    status: "active",
    email: "pedro@costa.com",
    phone: "(11) 91234-5678",
  },
];

export const products: Product[] = [
  {
    id: "P-01",
    name: "Feed Estático",
    type: "Feed",
    description: "Post único para feed do Instagram",
    defaultPrice: 20,
    deliveryTime: 1,
  },
  {
    id: "P-02",
    name: "Carrossel",
    type: "Carrossel",
    description: "Post carrossel com até 10 slides",
    defaultPrice: 40,
    deliveryTime: 2,
  },
  {
    id: "P-03",
    name: "Story",
    type: "Stories",
    description: "Story único para Instagram",
    defaultPrice: 10,
    deliveryTime: 1,
  },
  {
    id: "P-04",
    name: "Adaptação Feed→Story",
    type: "Adaptação",
    description: "Adaptação de feed para story",
    defaultPrice: 12,
    deliveryTime: 1,
  },
  {
    id: "P-05",
    name: "Identidade Visual",
    type: "Identidade",
    description: "Pacote completo de identidade visual",
    defaultPrice: 549.9,
    deliveryTime: 7,
  },
];

export const clientProducts: ClientProduct[] = [
  { clientId: "C-01", productId: "P-01", customPrice: 18, isActive: true },
  { clientId: "C-01", productId: "P-02", customPrice: 35, isActive: true },
  { clientId: "C-01", productId: "P-03", customPrice: 10, isActive: true },
  { clientId: "C-03", productId: "P-01", customPrice: 22, isActive: true },
  { clientId: "C-03", productId: "P-02", customPrice: 40, isActive: true },
];

export const deliveries: Delivery[] = [
  {
    id: "D-01",
    client: "TechStartup",
    title: "Carrossel Outubro",
    date: "2025-10-19",
    status: "Enviado",
    files: ["v1.pdf"],
  },
  {
    id: "D-02",
    client: "AS Eventos",
    title: "Stories Lançamento",
    date: "2025-10-18",
    status: "Em Ajuste",
    files: ["v1.png", "v2.png"],
  },
  {
    id: "D-03",
    client: "Pedro Costa",
    title: "Feed Anúncio - Aprov.",
    date: "2025-10-15",
    status: "Aprovado",
    files: ["final.jpg"],
  },
  {
    id: "D-04",
    client: "Silva & Associados",
    title: "Feed Jurídico",
    date: "2025-10-20",
    status: "Aguardando",
    files: ["v1.jpg"],
  },
];

export const financeHistory: FinanceEntry[] = [
  {
    date: "2025-10-05",
    client: "Silva & Associados",
    type: "Pacote",
    desc: "Growth Mensal",
    value: 924,
    status: "Pago",
  },
  {
    date: "2025-10-06",
    client: "TechStartup",
    type: "Urgência",
    desc: "Entrega 12h úteis",
    value: 150,
    status: "A Receber",
  },
  {
    date: "2025-10-09",
    client: "Agência Digital",
    type: "Identidade",
    desc: "Intermediário",
    value: 549.9,
    status: "Pago",
  },
  {
    date: "2025-09-28",
    client: "Pedro Costa",
    type: "Pacote",
    desc: "Essential Mensal",
    value: 450,
    status: "Pago",
  },
  {
    date: "2025-10-12",
    client: "AS Eventos",
    type: "Urgência",
    desc: "Stories pacote",
    value: 120,
    status: "A Receber",
  },
];
