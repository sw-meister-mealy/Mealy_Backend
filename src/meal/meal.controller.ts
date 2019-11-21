import { MealService } from '@app/meal';
import { Controller, Get, Inject } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@Controller('meal')
@ApiUseTags('Meal')
export class MealController {
  @Inject()
  private readonly mealService: MealService;

  @Get()
  public async getTodayMeal() {
    const now = new Date();
    return this.mealService.getMeal(now.getFullYear(), now.getMonth() + 1, now.getDay());
  }
}
