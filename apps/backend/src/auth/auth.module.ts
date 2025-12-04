import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [DbModule],
})
export class AuthModule {}
