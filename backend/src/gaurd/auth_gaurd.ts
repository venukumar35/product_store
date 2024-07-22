import {
  CanActivate,
  HttpException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'database/db';
import { verify } from 'jsonwebtoken';

@Injectable()
export class middleware implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}
  //Spliting Bearer in the token from the header
  getToken(req) {
    const token = req.header('Authorization')
      ? req.header('Authorization').split('Bearer ')[1]
      : null;
    if (token) {
      return token;
    } else {
      throw new HttpException('Authentication token missing', 401);
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const token = this.getToken(req);
      //Verifing the token
      const verificationResponse: any = verify(token, 'Tasks');
      const userId = verificationResponse.id;
      //Finding user by id
      const user = await this.prismaService.user.findFirst({
        where: {
          id: Number(userId),
          token: token,
        },
      });
      if (user) {
        req.user = user;
        return true;
      } else {
        throw new HttpException('Wrong authentication token', 401);
      }
    } catch (e) {
      throw new HttpException('Error: ' + e.message, 401);
    }
  }
}
