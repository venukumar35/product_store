import { Injectable } from '@nestjs/common';
import { PrismaService } from 'database/db';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  async findEmailIsExist(email: string) {
    return (
      (await this.prisma.user.count({
        where: {
          email: email,
        },
      })) == 0
    );
  }
  async updateToken(id: number, email: string, token: string) {
    return await this.prisma.user.update({
      where: {
        id: id,
        email: email,
        isActive: true,
      },
      data: {
        token: token,
      },
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    const saltOrRounds = 10;
    const password = createUserDto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: createUserDto.email,
          mobile: createUserDto.mobile,
          username: createUserDto.name,
          password: hashedPassword,
          roleId: 2,
          genderId: 1,
        },
      });
      const address = await tx.address.create({
        data: {
          doorNumber: createUserDto.doorNumber,
          streetName: createUserDto.streetName,
          pinCode: createUserDto.pincode,
          stateId: createUserDto.stateId,
        },
      });

      await tx.userAddress.create({
        data: {
          addressId: address.id,
          userId: user.id,
        },
      });
    });
  }
}
