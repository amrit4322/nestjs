import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from '../interface/user.interface';
import { CreateUserDTO } from '../dto/createUser.dto';
import { UpdateUserDTO } from '../dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<IUser> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  async updateUser(
    userName: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userName,
      updateUserDTO,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User ${userName} not found`);
    }
    return existingUser;
  }

  async getAllUser(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException(`User data not found`);
    }
    return userData;
  }

  async getUser(username: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(username).exec();
    if (!existingUser) {
      throw new NotFoundException(`User ${username} not found!`);
    }
    return existingUser;
  }

  async deletUser(username: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(username);
    if (!deletedUser) {
      throw new NotFoundException(`User ${username} not found`);
    }
    return deletedUser;
  }
}
