import { TrackCategory, TrackDifficulty, TrackVisibility } from "@spysec/education"; 
// Base URL para ícones (Substitua pelo seu repo real se quiser)
const ICON_BASE_URL = "https://github.com/GabrielTh58/SpySec/tree/main/public/track-icons";

export const TRACK_IDS = {
  MINDSET: "550e8400-e29b-41d4-a716-446655440001",
  IDENTITY: "550e8400-e29b-41d4-a716-446655440002",
  DEVICES_HARDWARE: "550e8400-e29b-41d4-a716-446655440003",
  DEVICES_NETWORKS: "550e8400-e29b-41d4-a716-446655440004",
  ENG_SOCIAL: "550e8400-e29b-41d4-a716-446655440005",
  JURIDICO: "550e8400-e29b-41d4-a716-446655440006",
  TRENDS: "550e8400-e29b-41d4-a716-446655440007",
  FINAL_EXAM: "550e8400-e29b-41d4-a716-446655440008"
};

export const tracksData = [
  // --- EIXO 1: INDIVÍDUO ---
  {
    id: TRACK_IDS.MINDSET, 
    title: "O Alvo Invisível",
    description: "Descubra por que hackers querem seus dados",
    iconUrl: `${ICON_BASE_URL}/crosshair.svg`,
    category: TrackCategory.MINDSET,
    difficulty: TrackDifficulty.BASIC,
    targetProfile: TrackVisibility.ALL,
    tags: ["Mindset", "Privacidade", "Fundamentos"],
    minLevel: 0
  },
  {
    id: TRACK_IDS.IDENTITY,   
    title: "O Cofre de Identidade",
    description: "Aprenda a criar senhas inquebráveis",
    iconUrl: `${ICON_BASE_URL}/shield-check.svg`,
    category: TrackCategory.MINDSET, 
    difficulty: TrackDifficulty.BASIC,
    targetProfile: TrackVisibility.ALL,
    tags: ["Senhas", "MFA", "Vazamentos"],
    minLevel: 0
  },
  
  // --- EIXO 2: MÁQUINA ---
  {
    id: TRACK_IDS.DEVICES_HARDWARE,
    title: "Seus Dispositivos, Seus Espiões",
    description: "Transforme seu computador e celular em fortalezas",
    iconUrl: `${ICON_BASE_URL}/monitor-smartphone.svg`,
    category: TrackCategory.DEVICES,
    difficulty: TrackDifficulty.INTERMEDIATE,
    targetProfile: TrackVisibility.ALL,
    tags: ["Antivirus", "Hardware", "Updates"],
    minLevel: 2
  },
  {
    id: TRACK_IDS.DEVICES_NETWORKS,
    title: "O Campo Minado",
    description: "Navegue na web e use Wi-Fi público sem ser interceptado",
    iconUrl: `${ICON_BASE_URL}/bomb.svg`,
    category: TrackCategory.DEVICES,
    difficulty: TrackDifficulty.INTERMEDIATE,
    targetProfile: TrackVisibility.ALL,
    tags: ["Redes", "VPN", "Wi-Fi"],
    minLevel: 3
  },

  // --- EIXO 3: PROFISSIONAL ---
  {
    id: TRACK_IDS.ENG_SOCIAL,
    title: "Hackeando Humanos",
    description: "Treinamento avançado contra Engenharia Social",
    iconUrl: `${ICON_BASE_URL}/users.svg`,
    category: TrackCategory.CORPORATE,
    difficulty: TrackDifficulty.ADVANCED,
    targetProfile: TrackVisibility.CORPORATE,
    tags: ["Phishing", "Engenharia Social", "BEC"],
    minLevel: 0
  },
  {
    id: TRACK_IDS.JURIDICO,
    title: "O Jurídico e a Crise",
    description: "Como evitar multas milionárias da LGPD",
    iconUrl: `${ICON_BASE_URL}/scale.svg`,
    category: TrackCategory.CORPORATE,
    difficulty: TrackDifficulty.ADVANCED,
    targetProfile: TrackVisibility.CORPORATE,
    tags: ["LGPD", "Ransomware", "Compliance"],
    minLevel: 0
  },

  // --- EIXO 4: TENDÊNCIAS ---
  {
    id: TRACK_IDS.TRENDS,
    title: "IA & Novos Riscos",
    description: "Deepfakes, ChatGPT e o futuro dos ataques",
    iconUrl: `${ICON_BASE_URL}/bot.svg`,
    category: TrackCategory.TRENDS,
    difficulty: TrackDifficulty.INTERMEDIATE,
    targetProfile: TrackVisibility.ALL, 
    tags: ["IA", "Deepfake", "ChatGPT"],
    minLevel: 5
  },
  
  {
    id: TRACK_IDS.FINAL_EXAM,
    title: "Protocolo Final: Black Ops",
    description: "A prova de fogo. Teste suas habilidades em um cenário de auditoria real. Apenas para quem sobreviveu ao treinamento.",
    iconUrl: `${ICON_BASE_URL}/skull.svg`,
    category: TrackCategory.FINAL,
    difficulty: TrackDifficulty.ADVANCED,
    targetProfile: TrackVisibility.ALL,
    tags: ["Exame", "Certificação", "Hardcore"],
    minLevel: 10, 
  }
];