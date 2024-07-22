import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { PrismaService } from 'database/db';
import { CommonRepository } from './common.repo';

@Module({
  controllers: [CommonController],
  providers: [CommonService, PrismaService, CommonRepository],
})
export class CommonModule {}
