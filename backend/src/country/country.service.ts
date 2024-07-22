import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';

@Injectable()
export class CountryService {
  constructor(private readonly services: CountryRepository) {}
  findAll() {
    return this.services.findAll();
  }

  findStateBycountryId(id: number) {
    return this.services.findStateBycountryId(id);
  }
}
