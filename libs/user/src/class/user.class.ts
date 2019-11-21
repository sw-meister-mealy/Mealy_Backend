import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class User {
  @Exclude()
  // tslint:disable-next-line:variable-name
  public readonly _id?: ObjectId;
  public readonly studentId: string;
  public readonly name: string;
  public readonly username: string;
  @Exclude()
  public readonly password: Buffer;

  constructor(user: User) {
    Object.assign(this, user);
  }
}
