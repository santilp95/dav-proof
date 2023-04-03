import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login-user.dto';
@Controller('users')
@ApiTags('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: LoginUserDto,
    description: 'Login user',
    examples: {
      one: {
        summary: 'Login user with this data',
        value: {
          password: '123456',
          mobile_phone: '3217654321',
        } as LoginUserDto,
      },
    },
  })
  async login(@Body() body: LoginUserDto) {
    const user = await this.authService.validateUser(
      body.mobile_phone,
      body.password,
    );
    const accessToken = await this.authService.login(user as any);
    return this.authService.singIn(accessToken);
  }
}
