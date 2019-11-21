import { MealService } from '@app/meal';
import { ClassSerializerInterceptor, Controller, Get, Inject, Param, UseInterceptors } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { GetMealDto } from './dto/get-meal.dto';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':year-:month-:day')
  public async getMeal(@Param() {
    year, month, day,
  }: GetMealDto) {
    return this.mealService.getMeal(parseInt(year, 10), parseInt(month, 10), parseInt(day, 10));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':year-:month')
  public async getMonthMeal(@Param() {
    year, month,
  }: GetMealDto) {
    return this.mealService.getMeal(parseInt(year, 10), parseInt(month, 10));
  }
}
