import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService extends MongoClient {
  constructor(uri: string) {
    super(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect() {
    await super.connect();
    return this;
  }

  public collection<T = any>(name: string): Collection<T> {
    return super.db().collection<T>(name);
  }
}
