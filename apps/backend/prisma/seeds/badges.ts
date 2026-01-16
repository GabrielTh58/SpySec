import { PrismaClient } from '../../generated/prisma/client';

export async function seedBadges(prisma: PrismaClient) {
  console.log('Generating Badges...');

  const badges = [
    {
      slug: 'recruta-digital', 
      name: 'Recruta Digital',
      description: 'Deu o primeiro passo completando sua primeira missão valendo XP.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3408/3408455.png',
      condition: 'XP_EARNED > 0',
    },
    {
      slug: 'explorador-curioso', 
      name: 'Explorador Curioso',
      description: 'Utilizou a Inteligência Artificial para tirar dúvidas ou buscar conhecimento.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2921/2921226.png', 
      condition: 'ACTION:AI_INTERACTION',
    },
    {
      slug: 'escudo-corporativo', 
      name: 'Escudo Corporativo',
      description: 'Concluiu trilhas essenciais para proteção empresarial.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/9564/9564115.png',
      condition: 'TRACK:seguranca-home-office OR lgpd-corporativo',
    },
    {
      slug: 'especialista-fundamentos', 
      name: 'Base Sólida',
      description: 'Dominou os conceitos fundamentais completando a trilha de Fundamentos.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/9630/9630249.png',
      condition: 'TRACK:fundamentos-da-seguranca',
    },
    {
      slug: 'guardiao-de-chaves', 
      name: 'Guardião das Chaves',
      description: 'Completou missões focadas em segurança de senhas.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2889/2889676.png',
      condition: 'CATEGORY:PASSWORDS',
    },
    {
      slug: 'fenix', 
      name: 'A Fênix',
      description: 'Mostrou resiliência ao voltar a estudar após perder uma grande sequência.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/785/785116.png',
      condition: 'RECOVER_STREAK (Max >= 5)',
    },
    {
      slug: 'em-ascensao', 
      name: 'Em Ascensão',
      description: 'Alcançou o nível 5 na plataforma.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3112/3112946.png',
      condition: 'LEVEL:5',
    },
    {
      slug: 'sentinela-atento', 
      name: 'Sentinela Atento',
      description: 'Manteve a constância nos estudos por 3 dias seguidos.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/1042/1042306.png', 
      condition: 'STREAK:3',
    },
    {
      slug: 'detector-de-iscas',
      name: 'Detector de Iscas',
      description: 'Concluiu treinamentos sobre identificação de Phishing.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2058/2058142.png',
      condition: 'TRACK:phishing',
    },
    {
      slug: 'aluno-do-futuro', 
      name: 'Aluno do Futuro',
      description: 'Interessado em IA e novas tecnologias.',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2282/2282195.png',
      condition: 'TRACK:ai-security',
    },
  ];

  for (const badge of badges) {
    await prisma.badge.upsert({
      where: { slug: badge.slug },
      update: {
        name: badge.name,
        description: badge.description,
        iconUrl: badge.iconUrl,
        condition: badge.condition
      },
      create: badge,
    });
  }
  console.log(`✅ ${badges.length} Badges seeded.`);
}