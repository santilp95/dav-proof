import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { TokenDto } from './dto/token.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(mobile_phone: string, pass: string) {
    const user = await this.usersService.login(mobile_phone, pass);
    return user;
  }

  async login(user: User) {
    const payload = { mobile_phone: user.mobile_pho, email: user.email };
    const access_token = await this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });
    return {
      user,
      access_token,
      token_type: 'bearer',
    };
  }

  singIn(data): TokenDto {
    const token = new TokenDto();
    token.access_token = data;
    token.token_type = 'bearer';
    return token;
  }
}
