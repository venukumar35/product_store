import { IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  offerPercntage: number;
  @IsNumber()
  offerPrice: number;
  @IsNumber()
  currentPrice: number;
  @IsNumber()
  offerQuantity: number;
  @IsNumber()
  currentQuantity: number;
  @IsString()
  fromDate: string;
  @IsString()
  toDate: string;
  @IsString()
  fromTime: string;
  @IsString()
  toTime: string;
  days: any;
  @IsNumber()
  offerPromotionPeriodId: number;
}
export class CalculateOfferDto {
  @IsNumber()
  productId: number;
  @IsNumber()
  percentage: number;
  @IsString()
  price: string;
  @IsString()
  offerQuantity: string;
}
