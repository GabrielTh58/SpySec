import { Injectable } from '@nestjs/common';
import { Level, LevelRepository } from '@spysec/gamification';
import { PrismaService } from 'src/db/prisma.service';
import { LevelMapper } from '../mappers/level.mapper';

@Injectable()
export class PrismaLevelRepository implements LevelRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByNumber(levelNumber: number): Promise<Level | null> {
    const raw = await this.prisma.level.findUnique({
      where: { levelNumber },
    });

    if (!raw) return null;
    return LevelMapper.toDomain(raw);
  }

  async findAll(): Promise<Level[]> {
    const rawLevels = await this.prisma.level.findMany({
      orderBy: { levelNumber: 'asc' }, 
    });

    return rawLevels.map(LevelMapper.toDomain);
  }

  async save(level: Level): Promise<void> {
    const data = LevelMapper.toPersistence(level);

    await this.prisma.level.upsert({
      where: { levelNumber: data.levelNumber },
      create: data,
      update: data,
    });
  }
  
  async exists(levelNumber: number): Promise<boolean> {
     const count = await this.prisma.level.count({ where: { levelNumber }});
     return count > 0;
  }
}