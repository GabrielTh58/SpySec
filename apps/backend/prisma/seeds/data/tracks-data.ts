import { TrackCategory, TrackDifficulty, TrackVisibility } from "@spysec/education"; 

export const TRACK_IDS = {
  MINDSET:              "550e8400-e29b-41d4-a716-446655440001",
  DEVICES_NETWORKS:     "550e8400-e29b-41d4-a716-446655440003",
  IDENTITY:             "550e8400-e29b-41d4-a716-446655440004",
  CORPORATE_ENG_SOCIAL: "550e8400-e29b-41d4-a716-446655440005",
  CORPORATE_POLICY:     "550e8400-e29b-41d4-a716-446655440006",
  TRENDS:               "550e8400-e29b-41d4-a716-446655440007",
  FINAL_EXAM:           "550e8400-e29b-41d4-a716-446655440008",
};

export const tracksData = [

  /* EIXO 1 — CONSCIÊNCIA */
  {
    id: TRACK_IDS.MINDSET,
    title: "Percepção de Ameaças",
    description: "Entenda como ataques realmente acontecem e por que qualquer pessoa pode ser alvo.",
    iconUrl: "brain-circuit",
    category: TrackCategory.MINDSET,
    difficulty: TrackDifficulty.BASIC,
    targetProfile: TrackVisibility.ALL,
    tags: ["Fundamentos", "Engenharia Social", "Consciência"],
    minLevel: 0,
  },

  /* EIXO 2 — IDENTIDADE */
  {
    id: TRACK_IDS.IDENTITY,
    title: "Controle de Acessos",
    description: "Proteja contas, acessos e identidades digitais contra invasões.",
    iconUrl: "user-lock",
    category: TrackCategory.IDENTITY, 
    difficulty: TrackDifficulty.BASIC,
    targetProfile: TrackVisibility.ALL,
    tags: ["Senhas", "MFA", "Identidade"],
    minLevel: 1,
  },

  /* EIXO 3 — DISPOSITIVOS */
  {
    id: TRACK_IDS.DEVICES_NETWORKS,
    title: "Dispositivos & Conexões Seguras",
    description: "Transforme dispositivos e conexões em ambientes confiáveis.",
    iconUrl: "monitor-smartphone",
    category: TrackCategory.DEVICES,
    difficulty: TrackDifficulty.BASIC,
    targetProfile: TrackVisibility.ALL,
    tags: ["Dispositivos", "WiFi", "Atualizações"],
    minLevel: 2,
  },

  /* EIXO 4 — CORPORATIVO */
  {
    id: TRACK_IDS.CORPORATE_ENG_SOCIAL,
    title: "Engenharia Social Corporativa",
    description: "Ataques reais que exploram rotina, pressão e hierarquia empresarial.",
    iconUrl: "users",
    category: TrackCategory.CORPORATE,
    difficulty: TrackDifficulty.INTERMEDIATE,
    targetProfile: TrackVisibility.CORPORATE,
    tags: ["Phishing", "BEC", "Vishing"],
    minLevel: 4,
  },

  {
    id: TRACK_IDS.CORPORATE_POLICY,
    title: "Riscos Operacionais & Incidentes",
    description: "Como agir corretamente diante de riscos, vazamentos e políticas internas.",
    iconUrl: "shield-alert",
    category: TrackCategory.CORPORATE,
    difficulty: TrackDifficulty.ADVANCED,
    targetProfile: TrackVisibility.CORPORATE,
    tags: ["LGPD", "Shadow IT", "Resposta"],
    minLevel: 6, 
  },

  /* EIXO 5 — TENDÊNCIAS */
  {
    id: TRACK_IDS.TRENDS,
    title: "IA & Novas Ameaças",
    description: "Como a Inteligência Artificial está mudando ataques e vazamentos.",
    iconUrl: "bot",
    category: TrackCategory.TRENDS,
    difficulty: TrackDifficulty.INTERMEDIATE,
    targetProfile: TrackVisibility.ALL,
    tags: ["IA", "Phishing IA", "Dados"],
    minLevel: 7,
  },

  /* FINAL */
  {
    id: TRACK_IDS.FINAL_EXAM,
    title: "Protocolo Final: Black Ops",
    description: "Simulação completa de incidente corporativo.",
    iconUrl: "swords",
    category: TrackCategory.FINAL,
    difficulty: TrackDifficulty.ADVANCED,
    targetProfile: TrackVisibility.CORPORATE,
    tags: ["Exame", "Certificação"],
    minLevel: 10,
  },
];