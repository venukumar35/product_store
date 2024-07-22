import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'database/db';
import { UserModule } from './user/user.module';
import { CountryModule } from './country/country.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OfferModule } from './offer/offer.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    UserModule,
    CountryModule,
    AuthModule,
    ProductModule,
    OfferModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), './public/task'),
      serveRoot: '/api/task',
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
