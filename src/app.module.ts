import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './openai/openai.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StoresModule } from './stores/stores.module';
import { ItemsModule } from './items/items.module';
import { MongoDbModule } from './mongo-db/mongo-db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(`${process.env.ATLAS_URI}`as string),
    OpenaiModule,
    StoresModule,
    ItemsModule,
    MongoDbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
