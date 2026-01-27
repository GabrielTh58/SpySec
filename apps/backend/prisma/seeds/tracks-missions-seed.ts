import { PrismaService } from 'src/db/prisma.service';

import { TRACK_IDS, tracksData } from './data/tracks-data';
import { Mission, MissionBlock, Track } from '@spysec/education';
import { finalEpicMission, missionsEixo01_Track01, missionsEixo01_Track02, missionsEixo02_Track03, missionsEixo02_Track04, missionsEixo03_Track05, missionsEixo03_Track06, missionsEixo04_Track07 } from './data/missions-data';

const missionsMap: Record<string, any[]> = {
  [TRACK_IDS.MINDSET]: missionsEixo01_Track01,
  [TRACK_IDS.IDENTITY]: missionsEixo01_Track02,
  [TRACK_IDS.DEVICES_HARDWARE]: missionsEixo02_Track03,
  [TRACK_IDS.DEVICES_NETWORKS]: missionsEixo02_Track04,
  [TRACK_IDS.ENG_SOCIAL]: missionsEixo03_Track05,
  [TRACK_IDS.JURIDICO]: missionsEixo03_Track06,
  [TRACK_IDS.TRENDS]: missionsEixo04_Track07,
  [TRACK_IDS.FINAL_EXAM]: [finalEpicMission]
};

export async function seedTracks(prisma: PrismaService) {
  console.log('🚀 Seeding Tracks & Missions...');

  const targetTrackIds = Object.values(TRACK_IDS);

  console.log('🧹 Limpando missões antigas para evitar conflitos de ordem...');
  await prisma.mission.deleteMany({
    where: {
      trackId: { in: targetTrackIds }
    }
  });
  
  for (const trackData of tracksData) {
    // 1. Cria a Entidade de Domínio (Validação)
    const trackOrError = Track.create(trackData);

    if (trackOrError.failed) {
      console.error(`❌ Erro na Trilha [${trackData.title}]:`, trackOrError.errors);
      continue; // Pula se estiver inválida
    }

    const track = trackOrError.value!;

    // 2. Salva a Trilha no Banco (Upsert para não duplicar)
    await prisma.track.upsert({
      where: { id: track.id.toString() },
      update: {
        title: track.title,
        description: track.description,
        iconUrl: track.iconUrl,
        category: track.category,
        difficulty: track.difficulty,
        targetProfile: track.targetProfile,
        minLevel: track.minLevel,
        tags: track.tags,
        updatedAt: new Date(), 
      },
      create: {
        id: track.id.toString(), 
        title: track.title,
        slug: track.slug,
        description: track.description,
        iconUrl: track.iconUrl,
        category: track.category,
        difficulty: track.difficulty,
        targetProfile: track.targetProfile,
        minLevel: track.minLevel,
        tags: track.tags,
        createdAt: track.createdAt,
        updatedAt: track.updatedAt
      }
    });

    console.log(`✅ Trilha: ${track.title}`);

    // 3. Processar Missões desta Trilha
    const trackMissions = missionsMap[track.id.toString()] || []; 

    for (const missionData of trackMissions) {
      const missionPayload = { ...missionData, trackId: track.id.toString(), content: missionData.content as MissionBlock[] };
      
      const missionOrError = Mission.create(missionPayload);

      if (missionOrError.failed) {
        console.error(`   ⚠️ Erro na Missão [${missionData.title}]:`, missionOrError.errors);
        continue;
      }

      const mission = missionOrError.value!;

      // O Content é um Value Object, precisamos extrair o JSON puro para o Prisma
      const contentJson = mission.content.value as any; 

      await prisma.mission.upsert({
        where: { slug: mission.slug }, // Supondo que slug seja único, ou use um ID fixo para missões também
        update: {
            title: mission.title,
            description: mission.description,
            content: contentJson, 
            xpReward: mission.xpReward,
            estimatedTime: mission.estimatedTime,
            updatedAt: new Date()
        },
        create: {
          id: mission.id.toString(),
          trackId: track.id.toString(),
          title: mission.title,
          slug: mission.slug,
          description: mission.description,
          xpReward: mission.xpReward,
          category: mission.category,
          estimatedTime: mission.estimatedTime,
          order: mission.order,
          content: contentJson,
          createdAt: mission.createdAt,
          updatedAt: mission.updatedAt
        }
      });
      console.log(`      -> Missão: ${mission.title}`);
    }
  }
}