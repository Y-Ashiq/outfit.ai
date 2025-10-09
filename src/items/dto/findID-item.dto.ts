import { Transform } from 'class-transformer';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class FindById {
    @IsMongoId()
    // @Transform(({ value }) => Types.ObjectId.createFromHexString(value))
  id: string;
}
