import { DatabaseModule } from '@app/database';
import { MealModule } from '@app/meal/meal.module';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Module({
  exports: [TicketService],
  imports: [MealModule, UserModule, DatabaseModule],
  providers: [TicketService],
})
export class TicketModule {
}
