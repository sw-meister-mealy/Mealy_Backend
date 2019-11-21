import { MealTime } from '@app/meal';

export class Ticket {
  public user: string;
  public year: number;
  public month: number;
  public day: number;
  public time: MealTime;
}
