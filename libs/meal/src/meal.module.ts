import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { MealService } from './meal.service';

@Module({
  exports: [MealService],
  imports: [DatabaseModule],
  providers: [MealService],
})
export class MealModule {
}
