import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly services: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    const isEmailExist = await this.services.findEmailIsExist(
      createUserDto.email,
    );

    if (!isEmailExist) {
      throw new BadRequestException('Email is already exist');
    }

    return await this.services.createUser(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
