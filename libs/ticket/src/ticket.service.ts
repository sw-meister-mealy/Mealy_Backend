import { DatabaseService } from '@app/database';
import { Meal } from '@app/meal/class/meal.class';
import { MealService } from '@app/meal/meal.service';
import { Ticket } from '@app/ticket/class/ticket.class';
import { User, UserService } from '@app/user';
import { Inject, Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';

@Injectable()
export class TicketService {
  @Inject()
  private readonly userService: UserService;
  @Inject()
  private readonly mealService: MealService;
  private readonly tickets: Collection<Ticket>;

  constructor(database: DatabaseService) {
    this.tickets = database.collection('tickets');
  }

  private async apply(user: User, meal: Meal) {
    delete meal.menu;
    await this.tickets.insertOne({
      user: user.studentId,
      ...meal,
    });
  }

  private async getTickets(user: User, { year, month }: {
    year: number;
    month: number;
  }) {
    return this.tickets.find({
      month,
      user: {
        $eq: user.studentId,
      },
      year,
    });
  }
}
