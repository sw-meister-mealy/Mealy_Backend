import { AuthModule } from '@app/auth';
import { MealModule } from '@app/meal';
import { TicketModule } from '@app/ticket';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketController } from './ticket.controller';

describe('Ticket Controller', () => {
  let controller: TicketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketController],
      imports: [TicketModule, AuthModule, MealModule],
    }).compile();

    controller = module.get<TicketController>(TicketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
