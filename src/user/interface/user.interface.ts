import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly name: string;
  readonly username: string;
  phoneNo: number;
  password: string;
}
