import { PrismaService } from 'database/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findAllProductCatogries() {
    const data = await this.prisma.productCategory.findMany({});
    return { data: data };
  }
  async findAllProductTypeByProductCatogriesId(id: number) {
    return await this.prisma.productType.findMany({
      where: {
        productCategoryId: id,
      },
      select: {
        id: true,
        itemsName: true,
        productCategoryId: true,
      },
    });
  }
  async findAllProductTypeSizes(id: number) {
    const data = await this.prisma.productTypeSize.findMany({
      where: {
        ietmsId: id,
      },
    });
    return { data: data };
  }
  async findAllProductSeasons() {
    const data = await this.prisma.seasonal.findMany({});
    return { data: data };
  }
  async findAllSleeveType() {
    const data = await this.prisma.sleeveType.findMany({});
    return { data: data };
  }
  async findAllNeckType() {
    const data = await this.prisma.neckType.findMany({});
    return { data: data };
  }
  async findAllBottomType() {
    const data = await this.prisma.typesOfBottom.findMany({});
    return { data: data };
  }
  async findAllBottomPleatsType() {
    const data = await this.prisma.typesOfPleats.findMany({});
    return { data: data };
  }
  async findAllTypeOfLengthBottom() {
    const data = await this.prisma.typesOfLengthBottom.findMany({});
    return { data: data };
  }
  async findAllKurtasLengthType() {
    const data = await this.prisma.kurtasLengthType.findMany({});
    return { data: data };
  }
}
