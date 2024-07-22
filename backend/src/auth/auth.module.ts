import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'database/db';
import { UserRepository } from 'src/user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserRepository],
  imports: [],
})
export class AuthModule {}
