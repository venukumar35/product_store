import {
  IsString,
  IsNotEmpty,
  IsArray,
  ArrayMinSize,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString({ message: 'Product category ID must be a string' })
  @IsNotEmpty({ message: 'Product category ID should not be empty' })
  productCatgoriesId: string;

  images: any[];

  @IsString({ message: 'Product type ID must be a string' })
  @IsNotEmpty({ message: 'Product type ID should not be empty' })
  productTypeId: string;

  @IsArray()
  quantities: [];

  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title should not be empty' })
  @MinLength(1, { message: 'Title should not be empty' })
  @MaxLength(30, { message: 'Title should not exceed 30 characters' })
  title: string;

  @IsString({ message: 'Brand name must be a string' })
  @IsNotEmpty({ message: 'Brand name should not be empty' })
  brandName: string;

  @IsString({ message: 'Material must be a string' })
  @IsNotEmpty({ message: 'Material should not be empty' })
  material: string;

  @IsString({ message: 'Fit must be a string' })
  @IsNotEmpty({ message: 'Fit should not be empty' })
  fit: string;

  @IsString({ message: 'Sleeve type must be a string' })
  @IsNotEmpty({ message: 'Sleeve type should not be empty' })
  @IsOptional()
  sleeveType: string;

  @IsString({ message: 'Neck type must be a string' })
  @IsNotEmpty({ message: 'Neck type should not be empty' })
  @IsOptional()
  neckType: string;

  @IsString({ message: 'Dress care must be a string' })
  @IsNotEmpty({ message: 'Dress care should not be empty' })
  care: string;

  @IsArray({ message: 'Seasons must be an array with at least 1 element' })
  @ArrayMinSize(1, { message: 'Seasons must contain at least 1 element' })
  seasons: string[];

  @IsString({ message: 'Price must be a string' })
  @IsNotEmpty({ message: 'Price should not be empty' })
  price: string;

  @IsString({ message: 'Origin must be a string' })
  @IsNotEmpty({ message: 'origin should not be empty' })
  origin: string;

  @IsString({ message: 'Occasion must be a string' })
  @IsNotEmpty({ message: 'occasion should not be empty' })
  occasion: string;

  @IsString({ message: 'Special feature must be a string' })
  @IsOptional()
  specialFeature: string;

  @IsString({ message: 'Product description must be a string' })
  @IsOptional()
  productDescription: string;

  @IsString({ message: 'Weight must be a string' })
  @IsOptional()
  weight: string;

  @IsString({ message: 'Chest must be a string' })
  @IsOptional()
  chest: string;

  @IsString({ message: 'Shoulder must be a string' })
  @IsOptional()
  shoulder: string;

  @IsString({ message: 'Color family must be a string' })
  @IsOptional()
  colorFamily: string;

  @IsString({ message: 'Print and pattern must be a string' })
  @IsOptional()
  printAndPattern: string;

  @IsString({ message: 'Length must be a string' })
  @IsOptional()
  length: string;

  @IsString({ message: 'Pocket must be a string' })
  @IsOptional()
  pocket: string;

  @IsString({ message: 'Waist must be a string' })
  @IsOptional()
  waist: string;

  @IsString({ message: 'Hip must be a string' })
  @IsOptional()
  hip: string;

  @IsString({ message: 'Belt loop must be a string' })
  @IsOptional()
  beltLoop: string;

  @IsString({ message: 'Pant id must be a string' })
  @IsOptional()
  typeOfPantId: string;

  @IsString({ message: 'Pleat id must be a string' })
  @IsOptional()
  pantPleatsId: string;

  @IsString({ message: 'Length id must be a string' })
  @IsOptional()
  pantLengthId: string;

  @IsString({ message: 'Work must be a string' })
  @IsOptional()
  work: string;

  @IsString({ message: 'transparencyOfTheFabric must be a string' })
  @IsOptional()
  transparencyOfTheFabric: string;

  @IsString({ message: 'type must be a string' })
  @IsOptional()
  type: string;

  @IsString({ message: 'Sole material must be a string' })
  @IsOptional()
  soleMaterial: string;

  @IsString({ message: 'Upper material must be a string' })
  @IsOptional()
  upperMaterial: string;

  @IsString({ message: 'Closure material must be a string' })
  @IsOptional()
  closure: string;

  @IsString({ message: 'Toe type must be a string' })
  @IsOptional()
  toeType: string;

  @IsString({ message: 'Warranty period must be a string' })
  @IsOptional()
  warrantyPeriod: string;

  @IsString({ message: 'Model must be a string' })
  @IsOptional()
  model: string;

  @IsString({ message: 'Dial diameter must be a string' })
  @IsOptional()
  dialDiameter: string;

  @IsString({ message: 'Dial color must be a string' })
  @IsOptional()
  dialColor: string;

  @IsString({ message: 'Strap color must be a string' })
  @IsOptional()
  strapColor: string;

  @IsString({ message: 'Dial shape must be a string' })
  @IsOptional()
  dialShape: string;

  @IsString({ message: 'Look and feel must be a string' })
  @IsOptional()
  lookAndFeel: string;

  @IsString({ message: 'Multi Color must be a string' })
  @IsOptional()
  multiColor: string;

  @IsString({ message: 'Contains must be a string' })
  @IsOptional()
  packageContains: string;

  @IsString({ message: 'Material description must be a string' })
  @IsOptional()
  materialDescription: string;

  @IsString({ message: 'Material description must be a string' })
  @IsOptional()
  deliveryForMetroCitys: string;

  @IsString({ message: 'Material description must be a string' })
  @IsOptional()
  deliveryForOtherCitys: string;

  @IsString({ message: 'Material description must be a string' })
  @IsOptional()
  returns: string;

  @IsString({ message: 'Bottom colorFamily must be a string' })
  @IsOptional()
  bottomColorFamily: string;

  @IsString({ message: 'Bottom description must be a string' })
  @IsOptional()
  bottomLength: string;

  @IsString({ message: 'Bottom PrintAndPattern must be a string' })
  @IsOptional()
  bottomPrintAndPattern: string;

  @IsString({ message: 'Bottom product description must be a string' })
  @IsOptional()
  bottomProductDescription: string;

  @IsString({ message: 'Bottom type must be a string' })
  @IsOptional()
  bottomType: string;

  @IsString({ message: 'Bottom weight must be a string' })
  @IsOptional()
  bottomWeight: string;

  @IsString({ message: 'Bottom pocket must be a string' })
  @IsOptional()
  bottomPocket: string;
}
