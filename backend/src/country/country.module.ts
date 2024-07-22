import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { CountryRepository } from './country.repository';
import { PrismaService } from 'database/db';

@Module({
  controllers: [CountryController],
  providers: [CountryService, CountryRepository, PrismaService],
})
export class CountryModule {}
