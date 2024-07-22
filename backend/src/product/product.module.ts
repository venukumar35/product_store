import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'database/db';
import { ProductRepository } from './product.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination(req, file, cb) {
          const destination = process.cwd() + '/public/task';
          if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
          }
          cb(null, destination);
        },
        filename(req, file, callback) {
          const customFileName = `${
            file.originalname.toLowerCase().split('.')[0]
          }-${new Date().toISOString()}.${
            file.originalname.toLowerCase().split('.')[1]
          }`;
          callback(null, customFileName);
        },
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ProductRepository],
})
export class ProductModule {}
