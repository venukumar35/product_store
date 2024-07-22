import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginRequest } from './dto/auth.dto';
import { sign } from 'jsonwebtoken';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userrepo: UserRepository) {}
  async userLogin(loginDto: LoginRequest) {
    //Finding user by email
    const isUserExistByEmail = await this.userrepo.findUserByEmail(
      loginDto.email,
    );

    if (!isUserExistByEmail.isActive) {
      throw new BadRequestException('Useraccount is blocked contact admin');
    }
    if (!isUserExistByEmail) {
      throw new BadRequestException('Useraccount is not found');
    } else if (
      !(await bcrypt.compare(loginDto.password, isUserExistByEmail.password))
    ) {
      throw new BadRequestException('Password is wrong');
    }
    //Creating token
    const token = await this.createToken(isUserExistByEmail.id);
    const updateToken = await this.userrepo.updateToken(
      isUserExistByEmail.id,
      isUserExistByEmail.email,
      token,
    );
    return { message: 'Login successfull', data: updateToken };
  }
  // creating the jwt bearer token
  async createToken(userId: number): Promise<string> {
    const dataStoredInToken = {
      id: userId,
    };
    const secretKey: string = 'Tasks';
    const expiresIn: number = 120 * 120;
    return sign(dataStoredInToken, secretKey, {
      expiresIn: expiresIn,
    });
  }
}
