import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  mobile: string;
  @IsString()
  password: string;
  @IsString()
  doorNumber: string;
  @IsString()
  streetName: string;
  @IsString()
  pincode: string;
  @IsNumber()
  stateId: number;
}
