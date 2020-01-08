import { IsString, IsOptional } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsOptional()
    id: string;
    
    @IsString()
    username: string;

    @IsString()
    password: string;
}
