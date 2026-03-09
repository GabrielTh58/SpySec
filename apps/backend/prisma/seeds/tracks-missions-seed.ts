import { PrismaService } from 'src/db/prisma.service';
import type { TrackCategory as PrismaTrackCategory, TrackDifficulty as PrismaTrackDifficulty, TrackVisibility as PrismaTrackVisibility } from '../../generated/prisma/client';

import { TRACK_IDS, tracksData } from './data/tracks-data';
import { Mission, MissionBlock, Track } from '@spysec/education';
import {
  finalEpicMission, missionsEixo01_Track01, missionsEixo02_Track02,
  missionsEixo03_Track03, missionsEixo04_Track04, missionsEixo04_Track05,
  missionsEixo05_Track06
} from './data/missions';

const missionsMap: Record<string, any[]> = {
  [TRACK_IDS.MINDSET]: missionsEixo01_Track01,
  [TRACK_IDS.IDENTITY]: missionsEixo02_Track02,
  [TRACK_IDS.DEVICES_NETWORKS]: missionsEixo03_Track03,
  [TRACK_IDS.CORPORATE_ENG_SOCIAL]: missionsEixo04_Track04,
  [TRACK_IDS.CORPORATE_POLICY]: missionsEixo04_Track05,
  [TRACK_IDS.TRENDS]: missionsEixo05_Track06,
  [TRACK_IDS.FINAL_EXAM]: [finalEpicMission]
};

export async function seedTracksAndMission(prisma: PrismaService) {
  console.log('🚀 Seeding Tracks & Missions...');
  
  // Retirar depois de testes
  console.log('🧹 Cleaning old missions...');
  await prisma.trackProgress.deleteMany({});
  await prisma.mission.deleteMany({});
  await prisma.track.deleteMany({});

  for (const trackData of tracksData) {
    const trackOrError = Track.create(trackData);

    if (trackOrError.failed) {
      console.error(`❌ Error on Trilha [${trackData.title}]:`, trackOrError.errors);
      continue;
    }

    const track = trackOrError.value!;

    await prisma.track.create({
      data: {
        id: track.id.toString(),
        title: track.title,
        slug: track.slug,
        description: track.description,
        iconUrl: track.iconUrl,
        category: track.category as PrismaTrackCategory,
        difficulty: track.difficulty as PrismaTrackDifficulty,
        targetProfile: track.targetProfile as PrismaTrackVisibility,
        minLevel: track.minLevel,
        tags: track.tags,
        createdAt: track.createdAt,
        updatedAt: track.updatedAt
      }
    });

    console.log(`✅ Created Trail: ${track.title}`);

    // 3. Processar Missões desta Trilha
    const trackMissions = missionsMap[track.id.toString()] || [];

    for (const missionData of trackMissions) {
      const missionPayload = { ...missionData, trackId: track.id.toString(), content: missionData.content as MissionBlock[] };

      const missionOrError = Mission.create(missionPayload);

      if (missionOrError.failed) {
        console.error(`   ⚠️ Error on Mission [${missionData.title}]:`, missionOrError.errors);
        continue;
      }

      const mission = missionOrError.value!;

      const contentJson = JSON.parse(JSON.stringify(mission.content.value)); 

      await prisma.mission.create({
        data: {
          id: mission.id.toString(),
          trackId: track.id.toString(),
          title: mission.title,
          slug: mission.slug,
          description: mission.description,
          iconUrl: mission.iconUrl,
          xpReward: mission.xpReward,
          category: mission.category,
          estimatedTime: mission.estimatedTime,
          order: mission.order,
          content: contentJson,
          createdAt: mission.createdAt,
          updatedAt: mission.updatedAt
        }
      });
      console.log(`      -> Created Mission: ${mission.title}`);
    }
  }
}