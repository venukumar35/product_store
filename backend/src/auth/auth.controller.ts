import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async userLogin(@Body() loginDto: LoginRequest) {
    return this.authService.userLogin(loginDto);
  }
}
