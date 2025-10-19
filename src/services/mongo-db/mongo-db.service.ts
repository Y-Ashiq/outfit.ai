import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Db, MongoClient } from 'mongodb';

@Injectable()
export class MongoDbService implements OnModuleInit, OnModuleDestroy {
  private client: MongoClient;
  private db: Db;

  async onModuleInit() {
    this.client = new MongoClient(process.env.ATLAS_URI as string);
    await this.client.connect();
    this.db = this.client.db("outfitAi");
  }

  getDb(): Db {
    return this.db;
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
