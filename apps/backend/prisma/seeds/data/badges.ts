import { PrismaClient, Rarity } from '../../../generated/prisma/client';

const ICON_BASE_URL = "https://github.com/GabrielTh58/SpySec/blob/main/public/badge-icons";

export async function seedBadges(prisma: PrismaClient) {
  console.log('Generating Badges...');

  // Tipagem explicita para ajudar o TS
  const badges = [
    {
      slug: 'recruta-digital', 
      name: 'Recruta Digital',
      description: 'Deu o primeiro passo completando sua primeira missão valendo XP.',
      iconUrl: `${ICON_BASE_URL}/footprints.svg`,
      condition: 'XP_EARNED > 0',
      rarity: Rarity.COMMON
    },
    {
      slug: 'explorador-curioso', 
      name: 'Explorador Curioso',
      description: 'Utilizou a Inteligência Artificial para tirar dúvidas ou buscar conhecimento.',
      iconUrl: `${ICON_BASE_URL}/shield-question-mark.svg`,
      condition: 'ACTION:AI_INTERACTION',
      rarity: Rarity.COMMON
    },
    {
      slug: 'escudo-corporativo', 
      name: 'Escudo Corporativo',
      description: 'Concluiu trilhas essenciais para proteção empresarial.',
      iconUrl: `${ICON_BASE_URL}/shield-check.svg`,
      condition: 'TRACK:seguranca-home-office OR lgpd-corporativo',
      rarity: Rarity.EPIC
    },
    {
      slug: 'especialista-fundamentos', 
      name: 'Base Sólida',
      description: 'Dominou os conceitos fundamentais completando a trilha de Fundamentos.',
      iconUrl: `${ICON_BASE_URL}/brick-wall-shield.svg`,
      condition: 'TRACK:fundamentos-da-seguranca',
      rarity: Rarity.RARE
    },
    {
      slug: 'guardiao-de-chaves', 
      name: 'Guardião das Chaves',
      description: 'Completou missões focadas em segurança de senhas.',
      iconUrl: `${ICON_BASE_URL}/key-round.svg`,
      condition: 'CATEGORY:PASSWORDS',
      rarity: Rarity.RARE
    },
    {
      slug: 'fenix', 
      name: 'A Fênix',
      description: 'Mostrou resiliência ao voltar a estudar após perder uma grande sequência.',
      iconUrl: `${ICON_BASE_URL}/flame.svg`,
      condition: 'RECOVER_STREAK (Max >= 5)',
      rarity: Rarity.LEGENDARY
    },
    {
      slug: 'em-ascensao', 
      name: 'Em Ascensão',
      description: 'Alcançou o nível 5 na plataforma.',
      iconUrl: `${ICON_BASE_URL}/rocket.svg`,
      condition: 'LEVEL:5',
      rarity: Rarity.RARE
    },
    {
      slug: 'sentinela-atento', 
      name: 'Sentinela Atento',
      description: 'Manteve a constância nos estudos por 3 dias seguidos.',
      iconUrl: `${ICON_BASE_URL}/eye.svg`, 
      condition: 'STREAK:3',
      rarity: Rarity.COMMON
    },
    {
      slug: 'detector-de-iscas',
      name: 'Detector de Iscas',
      description: 'Concluiu treinamentos sobre identificação de Phishing.',
      iconUrl: `${ICON_BASE_URL}/fishing-hook.svg`,
      condition: 'TRACK:phishing',
      rarity: Rarity.RARE
    },
    {
      slug: 'aluno-do-futuro', 
      name: 'Aluno do Futuro',
      description: 'Interessado em IA e novas tecnologias.',
      iconUrl: `${ICON_BASE_URL}/brain-circuit.svg`,
      condition: 'TRACK:ai-security',
      rarity: Rarity.EPIC
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {
        name: badge.name,
        description: badge.description,
        iconUrl: badge.iconUrl,
        condition: badge.condition,
        rarity: badge.rarity 
      },
      create: {
        ...badge
      },
    });
  }
  console.log(`✅ ${badges.length} Badges seeded.`);
}