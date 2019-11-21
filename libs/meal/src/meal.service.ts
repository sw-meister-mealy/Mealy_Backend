import { DatabaseService } from '@app/database';
import { Meal } from '@app/meal/class/meal.class';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';

@Injectable()
export class MealService {
  private readonly meals: Collection<Meal>;

  constructor(database: DatabaseService) {
    this.meals = database.collection('meals');
  }
}
