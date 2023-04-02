import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { mobile_phone: string; password: string }) {
    return this.authService.login(body.mobile_phone, body.password);
  }
}
