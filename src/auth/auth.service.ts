import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
) { }

    async validateUser(userDto: LoginUserDto) {
        console.log('validateUser', userDto);
        const user = await this.userService.findUserByUsername(userDto.username);
        if (user && bcrypt.compareSync(userDto.password, user.password)) {
            console.log('user', user.toObject());
            const { password, ...result } = user.toObject();
            return result;
        }
        throw new NotFoundException('Invalid credentials');
    }

    async login(user: LoginUserDto) {
        const isValid = await this.validateUser(user);
        if (isValid) {
            const payload = { username: user.username, sub: user.id };
            return {
                acccess_token: this.jwtService.sign(payload),
            }
        }
    }

}
