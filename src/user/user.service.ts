import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async createUser(username: string, password: string, email: string) {
        const newUser = this.userModel({
            username,
            password,
            email,
        });
        const generatedUser = await newUser.save();
        console.log('generatedUser', generatedUser);
        return generatedUser as User;
    }

    async getUsers() {
        const users = await this.userModel.find().exec();
        return users.map(user => ({
            id: user.id,
            username: user.username,
            password: user.password,
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

    findUser(id: string): Promise<User> {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Could not find user');
        }
        let user;
        try {
            user = this.userModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find user');
        }
        if (!user) {
            throw new NotFoundException('Could not find user');
        }
        return user;
    }
}
