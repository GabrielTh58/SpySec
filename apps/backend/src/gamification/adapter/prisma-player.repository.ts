import { Injectable } from '@nestjs/common';
import { Player, PlayerRepository } from '@spysec/gamification';
import { PrismaService } from 'src/db/prisma.service';
import { PlayerMapper } from '../mappers/player.mapper';

@Injectable()
export class PrismaPlayerRepository implements PlayerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string): Promise<Player | null> {
    const raw = await this.prisma.player.findUnique({
      where: { userId },
    });

    if (!raw) return null;
    return PlayerMapper.toDomain(raw);
  }

  async existsByNickname(nickname: string): Promise<boolean> {
    const count = await this.prisma.player.count({
      where: { nickname },
    });
    return count > 0;
  }

  async findTopPlayers(limit: number): Promise<Player[]> {
    const rawPlayers = await this.prisma.player.findMany({
      take: limit,
      orderBy: [
        { currentLevel: 'desc' }, 
        { currentXp: 'desc' },    
      ],
    });

    return rawPlayers.map(PlayerMapper.toDomain);
  }

  async save(player: Player): Promise<void> {
    const data = PlayerMapper.toPersistence(player);

    await this.prisma.player.upsert({
      where: { userId: data.userId },
      create: data,
      update: {
        currentLevel: data.currentLevel,
        currentXp: data.currentXp,
        streak: data.streak,
        maxStreak: data.maxStreak,
        badges: data.badges,
        lastActivityDate: data.lastActivityDate,
        updatedAt: new Date(), 
      },
    });
  }
}