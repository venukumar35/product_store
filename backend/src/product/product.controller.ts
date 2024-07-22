import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';

import { CreateProductDto } from './dto/create-product.dto';
import { middleware } from 'src/gaurd/auth_gaurd';

@Controller('product')
@UseGuards(middleware)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('images', 10))
  async create(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: CreateProductDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    interface FileDataType {
      filename: string;
      originalName: string;
      path: string;
    }
    console.log(images);

    const fileData: FileDataType[] = images.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.destination,
    }));

    return await this.productService.create(body, fileData, userId);
  }

  @Get('/userproduct')
  findAllProduct(
    @Query('page', ParseIntPipe) page: number,
    @Query('searchQuery') searchQuery: string,
    @Request() req,
  ) {
    const userId = req.user.id;

    return this.productService.findAllProduct(page, searchQuery, userId);
  }
}
