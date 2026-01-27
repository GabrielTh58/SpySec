import { Injectable } from '@nestjs/common';
import { IPlayerUpdateParams, Player, PlayerRepository } from '@spysec/gamification';
import { PrismaService } from 'src/db/prisma.service';
import { PlayerMapper } from '../mappers/player.mapper';
import { Prisma } from 'generated/prisma/browser';

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

  async getRankingPosition(userId: string, currentXp: number): Promise<number> {
    const countBetterPlayers = await this.prisma.player.count({
        where: {
            currentXp: { gt: currentXp }
        }
    });
    return countBetterPlayers + 1; 
  }

  async update(userId: string, data: IPlayerUpdateParams): Promise<Player> {
    const prismaData: Prisma.PlayerUpdateInput = {};

    if (data.nickname) {
        prismaData.nickname = data.nickname;
    }
    const updatedRaw = await this.prisma.player.update({
        where: { userId: userId },
        data: prismaData
    });

    return PlayerMapper.toDomain(updatedRaw);
}
}