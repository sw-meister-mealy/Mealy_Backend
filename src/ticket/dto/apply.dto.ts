import { MealTime } from '@app/meal';
import { IsJWT, IsObject } from 'class-validator';

export class ApplyDto {
  @IsJWT()
  public token: string;
  @IsObject()
  public meals: Record<string, MealTime[]>;
}
