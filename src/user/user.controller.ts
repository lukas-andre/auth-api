import { Controller, Get, Post, Res, Body, HttpStatus, Param, Patch } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user-dto.interface';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto.interface';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    async registerUser(@Body('data') registerUserDto: RegisterUserDto ) {
        const generatedUser = await this.userService.createUser(
            registerUserDto.username,
            registerUserDto.password,
            registerUserDto.email,
        );
        return { user: generatedUser };
    }

    @Get()
    async getAllUsers() {
        const users = await this.userService.getUsers();
        return users;
    }

    @Get(':id')
    async getUser(@Param('id') userId: string ) {
        const user = await this.userService.getSingleUser(userId);
        return user;
    }

    @Patch(':id')
    async updateUser(
        @Param('id') userId,
        @Body('data') updateUserDto: UpdateUserDto,
    ) {
        console.log('updateUser', updateUserDto);
        const updatedUser = await this.userService.updateUser(userId, updateUserDto);
        return { user: updatedUser };
    }

}
