import { TicketService } from '@app/ticket';
import { Controller, Inject } from '@nestjs/common';

@Controller('ticket')
export class TicketController {
  @Inject()
  private readonly ticketService: TicketService;
}
