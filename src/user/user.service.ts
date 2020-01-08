import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user-dto';
import { ConfigService } from '@nestjs/config';

const saltRounds = 10;

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
                private readonly configService: ConfigService) {}

    async createUser(username: string, password: string, email: string) {
        const cryptPass = bcrypt.hashSync(password, saltRounds);
        const newUser = this.userModel({
            username,
            password: cryptPass,
            email,
        });
        const generatedUser = await newUser.save();
        return generatedUser as User;
    }

    async getUsers() {
        const users = await this.userModel.find({ }, { password: 0 }).exec();
        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
        }));
    }

    async getSingleUser(userId: string) {
        const user = await this.findUser(userId);
        return {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
        };
    }

    async findUserByUsername(username: string) {
        console.log('username a buscar:', username);
        const result = await this.userModel.findOne({ username });
        console.log('result:', result);
        return result;
    }

    async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const updatedUser = await this.findUser(id);
        if (updateUserDto.email) {
            updatedUser.email = updateUserDto.email;
        }
        if (updateUserDto.password) {
            const cryptPass = bcrypt.hashSync(updateUserDto.password, saltRounds);
            updatedUser.password = cryptPass;
        }
        if (updateUserDto.username) {
            updatedUser.username = updateUserDto.username;
        }
        updatedUser.save();
        return updatedUser;
    }

    async findUser(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Could not find user');
        }
        let user;
        try {
            user = await this.userModel.findById(id, { password: 0 }).exec();
        } catch (error) {
            throw new NotFoundException('Could not find user');
        }
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user;
    }

    async deleteUser(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Could no find user');
        }
        const result = this.userModel.deleteOne({_id: id}).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find product');
        }
    }

}
