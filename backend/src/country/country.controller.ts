import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get('/get')
  findStateBycountryId(@Query('id', ParseIntPipe) id: number) {
    console.log(process.cwd());

    return this.countryService.findStateBycountryId(id);
  }
}
