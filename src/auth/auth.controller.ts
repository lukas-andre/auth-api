import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Get()
    async testGet(): Promise<string> {
        return Promise.resolve('testiando');
    }

}
