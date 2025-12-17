import { User as PrismaUser } from '../../../generated/prisma/client';
import { ProfileType, ProviderType, User } from '@spysec/auth';

export class PrismaUserMapper {
  static toDomain(prismaUser: PrismaUser | null): User | null {
    if (!prismaUser) return null;
    
    return User.restore({
      id: prismaUser.id,
      firebaseUid: prismaUser.firebaseUid,
      name: prismaUser.name,
      email: prismaUser.email,
      password: prismaUser.password, 
      provider: prismaUser.provider as ProviderType,
      profileType: prismaUser.profileType as ProfileType,
      isEmailVerified: prismaUser.isEmailVerified,
      imageURL: prismaUser.imageURL,
      lastLoginAt: prismaUser.lastLoginAt,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }

  static toPrismaUpdateInput(user: User): Omit<PrismaUser, 'createdAt' | 'updatedAt' | 'id'> {
    return {
      firebaseUid: user.firebaseUid,
      name: user.name.value,
      email: user.email.value,
      password: user.password?.value ?? null,
      provider: user.provider,
      profileType: user.profileType,
      isEmailVerified: user.isEmailVerified,
      imageURL: user.imageURL,
      lastLoginAt: user.lastLoginAt ?? null,
    } as any;
  }

  static toPrismaCreateInput(user: User): PrismaUser {
    return {
      id: user.id.value,
      ...this.toPrismaUpdateInput(user),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as PrismaUser;
  }
}
