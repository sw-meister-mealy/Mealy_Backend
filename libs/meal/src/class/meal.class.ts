export enum MealTime {
  breakfast = 'breakfast',
  lunch = 'lunch',
  dinner = 'dinner',
}

export class Meal {
  public year: number;
  public month: number;
  public day: number;
  public time: MealTime;
  public menu: string[];
}
