import { AuthModule } from '@app/auth';
import { MealModule } from '@app/meal';
import { TicketModule } from '@app/ticket';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { MealController } from './meal/meal.controller';
import { TicketController } from './ticket/ticket.controller';
import { UserController } from './user/user.controller';

@Module({
  controllers: [AppController, UserController, TicketController, MealController, AuthController],
  imports: [UserModule, TicketModule, MealModule, AuthModule],
  providers: [AppService],
})
export class AppModule {
}
