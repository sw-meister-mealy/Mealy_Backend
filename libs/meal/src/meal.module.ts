import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { HttpModule, Module } from '@nestjs/common';
import { MealService } from './meal.service';

@Module({
  exports: [MealService],
  imports: [DatabaseModule, HttpModule, ConfigModule],
  providers: [MealService],
})
export class MealModule {
}
