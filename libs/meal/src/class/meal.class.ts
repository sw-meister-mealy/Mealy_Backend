import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';

export enum MealTime {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
}

export class Meal {
  @Exclude()
  // tslint:disable-next-line:variable-name
  public _id?: ObjectId;
  public year: number;
  public month: number;
  public day: number;
  public time: MealTime;
  public menu: string[];

  constructor(meal: Meal) {
    Object.assign(this, meal);
  }
}
