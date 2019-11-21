import { DatabaseModule } from '@app/database';
import { MealModule } from '@app/meal';
import { UserModule } from '@app/user';
import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UserModule, MealModule],
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
