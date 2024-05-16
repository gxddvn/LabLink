import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log('Inside LocalStrategy');
        const user = await this.userService.login({ email, password });
        if (!user) throw new UnauthorizedException('Email or password is incorrect');
        return user;
    }
}