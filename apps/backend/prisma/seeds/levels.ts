import { PrismaClient } from '../../generated/prisma/client';

export async function seedLevels(prisma: PrismaClient) {
  console.log('Generating Levels...');
  
  const levels: Array<{ levelNumber: number; xpRequired: number; title: string }> = [];
  
  
  for (let i = 1; i <= 50; i++) {
    const xpForThisLevel = i * 100; 
    
    levels.push({
      levelNumber: i,
      xpRequired: xpForThisLevel, 
      title: getLevelTitle(i),
    });
  }

  for (const level of levels) {
    await prisma.level.upsert({
      where: { levelNumber: level.levelNumber },
      update: { xpRequired: level.xpRequired, title: level.title },
      create: level,
    });
  }
  console.log(`✅ ${levels.length} Levels seeded.`);
}

function getLevelTitle(level: number): string {
  if (level <= 5) return 'Recruta Digital';
  if (level <= 10) return 'Vigilante de Dados';
  if (level <= 20) return 'Analista de Defesa';
  if (level <= 30) return 'Especialista em Cibersegurança';
  if (level <= 40) return 'Arquiteto de Proteção';
  return 'Lenda da Segurança (CISO)';
}