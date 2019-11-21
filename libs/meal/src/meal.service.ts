import { DatabaseService } from '@app/database';
import { Meal } from '@app/meal';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';

@Injectable()
export class MealService {
  private readonly meals: Collection<Meal>;

  constructor(database: DatabaseService) {
    this.meals = database.collection('meals');
  }

  public getMeal(year: number, month: number, day: number): Promise<Meal> {
    return this.meals.find({
      day,
      month,
      year,
    }).next();
  }
}
