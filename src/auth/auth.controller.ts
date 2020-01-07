import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('auth')
export class AuthController {

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {

        return Promise.resolve('testiando');
    }

}
