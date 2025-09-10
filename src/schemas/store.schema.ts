import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop([{ type: Object }])
  links?: { type: string; url: string }[];

  @Prop()
  location?: string;

  @Prop([String])
  categories?: string[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
export const StoreModel = MongooseModule.forFeature([
  { name: Store.name, schema: StoreSchema },
]);
