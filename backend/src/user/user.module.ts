import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'database/db';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
})
export class UserModule {}
