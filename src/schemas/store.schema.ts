import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop([{ type: Object }])
  links?: { type: string; url: string }[];



}

export const StoreSchema = SchemaFactory.createForClass(Store);
export const StoreModel = MongooseModule.forFeature([
  { name: Store.name, schema: StoreSchema },
]);
