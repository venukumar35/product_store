import { BadRequestException, Injectable } from '@nestjs/common';
import { CalculateOfferDto, CreateOfferDto } from './dto/create-offer.dto';
import { OfferRepository } from './offer.repository';

@Injectable()
export class OfferService {
  constructor(private readonly repo: OfferRepository) {}
  async calculateTheOffer(calculateOfferDto: CalculateOfferDto) {
    const checkProductPrice =
      await this.repo.checkProductPrice(calculateOfferDto);

    if (!checkProductPrice) {
      throw new BadRequestException('Check the product price ');
    }
    const checkProductOfferQuantity =
      await this.repo.checkProductOfferQuanity(calculateOfferDto);

    if (!checkProductOfferQuantity) {
      throw new BadRequestException('Check the product offer quantity ');
    }
    const discountAmount =
      +calculateOfferDto.price * (calculateOfferDto.percentage / 100);

    const finalPrice = +calculateOfferDto.price - discountAmount;

    console.log(finalPrice);

    return finalPrice;
  }
  async findAllPromotionDays() {
    return await this.repo.findAllPromotionDays();
  }
  async create(createOfferDto: CreateOfferDto) {
    const productstatus = await this.repo.checkProductStatus(
      createOfferDto.productId,
    );

    if (!productstatus) {
      throw new BadRequestException('Product status is not in alive state');
    }
    const isOfferAviable = await this.repo.isOfferExist(
      createOfferDto.productId,
    );
    if (isOfferAviable) {
      throw new BadRequestException('Product offer is still in live status');
    }

    const isQuantityIsAviable = await this.repo.quantityExist(
      createOfferDto.productId,
    );

    if (isQuantityIsAviable.quantity < createOfferDto.offerQuantity) {
      throw new BadRequestException(
        'Product quantity is less. Check the quantity',
      );
    }
    return await this.repo.create(createOfferDto);
  }

  findAll() {
    return `This action returns all offer`;
  }

  // update(id: number, updateOfferDto: UpdateOfferDto) {
  //   return `This action updates a #${id} offer`;
  // }
}
