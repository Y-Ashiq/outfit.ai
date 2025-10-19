import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string; 

  @Prop({ type: String, enum: ['customer', 'admin', 'owner'], default:"customer" })
  role: String;

  @Prop()
  userName: string;

  @Prop({ default: false })
  emailVerified?: boolean;

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export const StoreModel = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);
