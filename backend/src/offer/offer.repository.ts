import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/db';
import { CalculateOfferDto, CreateOfferDto } from './dto/create-offer.dto';
@Injectable()
export class OfferRepository {
  constructor(private readonly prisma: PrismaService) {}
  async checkProductPrice(calculateOfferDto: CalculateOfferDto) {
    return (
      (await this.prisma.product.count({
        where: {
          id: calculateOfferDto.productId,
          isActive: true,
          price: +calculateOfferDto.price,
        },
      })) == 1
    );
  }
  async checkProductOfferQuanity(calculateOfferDto: CalculateOfferDto) {
    const data = await this.prisma.product.findMany({
      where: {
        id: calculateOfferDto.productId,
        isActive: true,
      },
      select: {
        color: {
          select: {
            colorSize: {
              select: {
                quantity: true,
              },
            },
          },
        },
      },
    });
    let quantity = 0;
    data.map((e) => {
      e.color.map((e) => {
        e.colorSize.map((e) => {
          quantity = quantity + e.quantity;
        });
      });
    });

    console.log('quanity', quantity);
    return +calculateOfferDto.offerQuantity <= quantity;
  }

  async findAllPromotionDays() {
    return await this.prisma.offerPromotionPeriods.findMany();
  }
  async checkProductStatus(id: number) {
    return (
      (await this.prisma.product.count({
        where: {
          id: id,
          isActive: true,
        },
      })) == 1
    );
  }
  async isOfferExist(id: number) {
    return (
      (await this.prisma.offer.count({
        where: {
          productId: id,
          isActive: true,
        },
      })) > 1
    );
  }
  async quantityExist(id: number) {
    return await this.prisma.quantityHistory.findFirst({
      where: {
        isActive: true,
      },
    });
    console.log(id);
  }
  async create(createOfferDto: CreateOfferDto) {
    await this.prisma.offer.create({
      data: {
        productId: createOfferDto.productId,
        offerPercntage: createOfferDto.offerPercntage,
        offerPrice: createOfferDto.offerPrice,
        currentPrice: createOfferDto.currentPrice,
        offerQuantity: createOfferDto.offerQuantity,
        currentQuantity: createOfferDto.currentQuantity,
        offerValidity: {
          create: {
            fromDate: createOfferDto.fromDate,
            toDate: createOfferDto.toDate,
            fromTime: createOfferDto.fromTime,
            toTime: createOfferDto.toTime,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: true,
            sunday: true,
            offerPromotionPeriodId: createOfferDto.offerPromotionPeriodId,
          },
        },
      },
    });
  }
}
