import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthAdapter } from './adapter/firebase-auth.adapter';
import { PrismaUserRepository } from './adapter/prisma-user.repository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    FirebaseAuthAdapter,
    PrismaUserRepository
  ],
  exports:[AuthService]
})
export class AuthModule {}
