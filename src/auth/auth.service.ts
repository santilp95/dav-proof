import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(mobile_phone: string, password: string) {
    const user = await this.usersService.findOneByMobilePhone(mobile_phone);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const payload = { mobile_phone: user.mobile_pho, email: user.email };

    return {
      user,
      access_token: this.jwtService.sign(payload),
      token_type: 'bearer',
    };
  }
}
