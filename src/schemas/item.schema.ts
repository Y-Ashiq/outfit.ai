import { MongooseModule, Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Store } from './store.schema';

@Schema({ timestamps: true })
export class Item {
  @Prop({ type: Types.ObjectId, ref: Store.name, required: true })
  store: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  category?: string;

  @Prop()
  price?: number;

  @Prop([{ type: String }])
  imageUrls?: string[]; 

  @Prop({ type: [Number], required: true })
  embedding: number[]; 
}

export const ItemSchema = SchemaFactory.createForClass(Item);

export const ItemModel = MongooseModule.forFeature([
  { name: Item.name, schema: ItemSchema },
]);

export type ItemDocument = HydratedDocument<Item>;
