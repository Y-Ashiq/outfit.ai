import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: Object }])
  links?: { type: string; url: string }[];
  
  @Prop({
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  })
  status: string;

  @Prop({type:Types.ObjectId })
  owner:Types.ObjectId
}

export const StoreSchema = SchemaFactory.createForClass(Store);
export const StoreModel = MongooseModule.forFeature([
  { name: Store.name, schema: StoreSchema },
]);
