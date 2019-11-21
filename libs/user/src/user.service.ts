import { DatabaseService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { Collection, FilterQuery } from 'mongodb';
import { Key } from './class/key.class';
import { User } from './class/user.class';
import { NewUserDto } from './dto/new-user.dto';

@Injectable()
export class UserService {
  private readonly users: Collection<User>;
  private readonly keys: Collection<Key>;

  constructor(database: DatabaseService) {
    this.users = database.collection('users');
    this.keys = database.collection('keys');
  }

  public getUser(filter: FilterQuery<User>): Promise<User | null> {
    return this.users.find(filter).next();
  }

  public async newUser(payload: NewUserDto) {
    const info = await this.keys.find({
      key: {
        $eq: payload.key,
      },
    }).next();
    if (!info) {
      throw new Error('User Key is not exist');
    }

    const user: User = {
      ...payload,
      ...info,
      password: Buffer.from(payload.password),
    };

    await this.users.insertOne(user);
  }

  public async addKeys(keys: Key[]): Promise<void> {
    await this.keys.insertMany(keys);
  }
}
