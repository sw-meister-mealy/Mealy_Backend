import { DatabaseService } from '@app/database';
import { Meal, MealService } from '@app/meal';
import { Ticket } from '@app/ticket';
import { UserService } from '@app/user';
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

  public async apply(user: string, meal: Meal[]) {
    meal.map((i) => {
      delete i.menu;
      return i;
    });
    await this.tickets.insertMany(meal.map((i) => {
      return {
        user,
        ...i,
      };
    }));
  }

  public async delete(user: string, meal: Meal[]) {
    for (const { day, month, year, time } of meal) {
      await this.tickets.deleteOne({
        day,
        month,
        time,
        user,
        year,
      });
    }
  }

  public async getTickets(user: string, { year, month }: {
    year: number;
    month: number;
  }): Promise<Ticket[]> {
    return [...await this.tickets.find({
      month,
      user: {
        $eq: user,
      },
      year,
    }).toArray(), ...await this.tickets.find({
      month: {
        $gt: month,
      },
      user: {
        $eq: user,
      },
      year,
    }).toArray(), ...await this.tickets.find({
      user: {
        $eq: user,
      },
      year: {
        $gt: year,
      },
    }).toArray()];
  }

  public async transfer(from: string, to: string, meal: Meal[]): Promise<void> {
    for (const { day, month, year } of meal) {
      await this.tickets.updateOne({
        day,
        month,
        user: from,
        year,
      }, {
        $set: {
          user: to,
        },
      });
    }
  }
}
