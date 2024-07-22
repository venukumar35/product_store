import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async create(
    createProductDto: CreateProductDto,
    file: any[],
    userId: number,
  ) {
    const checkNameIsExist = await this.productRepo.isProductNameExist(
      createProductDto.title,
      userId,
    );

    if (checkNameIsExist) {
      throw new BadRequestException('Product name is already exist');
    }

    return await this.productRepo.create(createProductDto, file, userId);
  }
  async findAllProduct(page: number, search: string, userId: number) {
    return await this.productRepo.findAllProduct(page, search, userId);
  }
}
