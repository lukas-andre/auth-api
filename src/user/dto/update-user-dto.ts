import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    username: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    password: string;
}
