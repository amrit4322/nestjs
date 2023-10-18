import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  username: string;

  @Prop()
  phoneNo: number;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
