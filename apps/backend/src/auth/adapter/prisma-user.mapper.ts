import { User as PrismaUser } from '../../../generated/prisma/client';
import { User, ProfileType, ProviderType } from '@spysec/auth';

export class PrismaUserMapper {

  static toDomain(prismaUser: PrismaUser | null): User | null {
    if (!prismaUser) return null;

    const userResult = User.create({
      id: prismaUser.id,
      firebaseUid: prismaUser.firebaseUid,
      name: prismaUser.name,
      email: prismaUser.email,
      provider: prismaUser.provider as ProviderType,
      profileType: prismaUser.profileType as ProfileType,
      isEmailVerified: prismaUser.isEmailVerified,
      imageURL: prismaUser.imageURL,
      lastLoginAt: prismaUser.lastLoginAt ?? undefined,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });

    if (userResult.failed) {
      throw new Error(
        `Dados corrompidos no banco: ${userResult.errors.join(', ')}`
      );
    }

    return userResult.value!;
  }


  static toPrisma(user: User): Omit<PrismaUser, 'createdAt' | 'updatedAt'> {
    return {
      id: user.id.value,              
      firebaseUid: user.firebaseUid,  
      name: user.name.value,          
      email: user.email.value,                
      provider: user.provider ,
      profileType: user.profileType,
      isEmailVerified: user.isEmailVerified,
      imageURL: user.imageURL,
      lastLoginAt: user.lastLoginAt ?? null,
    };
  }

  static toPrismaWithTimestamps(user: User): PrismaUser {
    return {
      ...this.toPrisma(user),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

   static toDomainList(prismaUsers: PrismaUser[]): User[] {
    return prismaUsers
      .map(this.toDomain)
      .filter((user): user is User => user !== null);
  }
}