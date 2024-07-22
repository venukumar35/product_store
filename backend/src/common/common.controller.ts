import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}
  @Get('/catogries')
  findAllProductCatogries() {
    return this.commonService.findAllProductCatogries();
  }
  @Get('/types')
  findAllProductTypeByProductCatogriesId(
    @Query('id', ParseIntPipe) id: number,
  ) {
    return this.commonService.findAllProductTypeByProductCatogriesId(id);
  }

  @Get('/sizes')
  findAllProductTypeSizes(@Query('id', ParseIntPipe) id: number) {
    return this.commonService.findAllProductTypeSizes(id);
  }
  @Get('/seasons')
  findAllProductSeasons() {
    return this.commonService.findAllProductSeasons();
  }

  @Get('/sleeve')
  findAllSleeveType() {
    return this.commonService.findAllSleeveType();
  }

  @Get('/neck')
  findAllNeckType() {
    return this.commonService.findAllNeckType();
  }

  @Get('bottomtype')
  findAllBottomType() {
    return this.commonService.findAllBottomType();
  }

  @Get('bottompleats')
  findAllBottomPleatsType() {
    return this.commonService.findAllBottomPleatsType();
  }

  @Get('bottomlengthtype')
  findAllTypeOfLengthBottom() {
    return this.commonService.findAllTypeOfLengthBottom();
  }

  @Get('kurtaslength')
  findAllKurtasLengthType() {
    return this.commonService.findAllKurtasLengthType();
  }
}
