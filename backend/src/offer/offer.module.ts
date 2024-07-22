import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { PrismaService } from 'database/db';
import { OfferRepository } from './offer.repository';

@Module({
  controllers: [OfferController],
  providers: [OfferService, PrismaService, OfferRepository],
})
export class OfferModule {}
