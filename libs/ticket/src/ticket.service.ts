import { DatabaseService } from '@app/database';
import { Meal, MealService } from '@app/meal';
import { Ticket } from '@app/ticket';
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

  public async apply(user: User, meal: Meal[]) {
    meal.map((i) => {
      delete i.menu;
      return i;
    });
    await this.tickets.insertMany(meal.map((i) => {
      return {
        user: user.studentId,
        ...i,
      };
    }));
  }

  public async delete(user: User, meal: Meal[]) {
    for (const i of meal) {
      await this.tickets.deleteOne({
        user: user.studentId,
        ...i,
      });
    }
  }

  public async getTickets(user: User, { year, month }: {
    year: number;
    month: number;
  }): Promise<Ticket[]> {
    return [...await this.tickets.find({
      month,
      user: {
        $eq: user.studentId,
      },
      year,
    }).toArray(), ...await this.tickets.find({
      month: {
        $gt: month,
      },
      user: {
        $eq: user.studentId,
      },
      year,
    }).toArray(), ...await this.tickets.find({
      user: {
        $eq: user.studentId,
      },
      year: {
        $gt: year,
      },
    }).toArray()];
  }

  public async transfer(from: string, to: string, meal: Meal[]): Promise<void> {
    for (const i of meal) {
      await this.tickets.updateOne({
        user: from,
        ...i,
      }, {
        $set: {
          user: to,
        },
      });
    }
  }
}
