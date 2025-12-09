import { Injectable } from '@nestjs/common';
import { User, UserRepository } from '@spysec/auth';
import { PrismaService } from '../../db/prisma.service';
import { PrismaUserMapper } from './prisma-user.mapper';


@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrismaWithTimestamps(user);
    await this.prisma.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { email },
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }

  async findById(id: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { id },
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }

  async findByFirebaseUid(firebaseUid: string): Promise<User | null> {
    const prismaUser = await this.prisma.user.findUnique({
      where: { firebaseUid },
    });

    return PrismaUserMapper.toDomain(prismaUser);
  }

  async update(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.update({
      where: { id: user.id.value },
      data: {
        ...data,
        updatedAt: new Date(), 
      },
    });
  }

  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email },
    });
    return count > 0;
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}