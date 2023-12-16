import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    // use hash algorithm in real world
    const hashedPasswod = password;
    const user = {
      email,
      password: hashedPasswod,
    };
    const newUser = await new this.userModel(user);
    return newUser.save();
  }
  async getUserById(userId: string): Promise<User | null> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }
}
