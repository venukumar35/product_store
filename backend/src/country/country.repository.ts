import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/db';

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const data = await this.prisma.country.findMany();
    return { data: data };
  }
  async findStateBycountryId(id: number) {
    const data = await this.prisma.state.findMany({
      where: {
        countryId: id,
      },
    });
    return { data: data };
  }
}
