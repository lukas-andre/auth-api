import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user-dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService ) { }
    
    @Post('login')
    async login(@Body('data') loginUserDto: LoginUserDto) {
        console.log('loginUserDto', loginUserDto);
        const result = this.authService.login(loginUserDto);
        return result;
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Body('data') data: any){ 
        return data;
    }


}
