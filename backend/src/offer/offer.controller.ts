import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { OfferService } from './offer.service';
import { CalculateOfferDto, CreateOfferDto } from './dto/create-offer.dto';
import { middleware } from 'src/gaurd/auth_gaurd';

@Controller('offer')
@UseGuards(middleware)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('/calculate')
  calculateTheOffer(@Body() calculateOfferDto: CalculateOfferDto) {
    return this.offerService.calculateTheOffer(calculateOfferDto);
  }
  @Get('/promotion')
  findAllPromotionDays() {
    return this.offerService.findAllPromotionDays();
  }
  @Post('/create')
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
  //   return this.offerService.update(+id, updateOfferDto);
  // }
}
