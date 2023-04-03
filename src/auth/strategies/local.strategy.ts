/* eslint-disable prettier/prettier */
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(mobile_phone: string, password: string){
        const user = await this.authService.validateUser(mobile_phone, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
