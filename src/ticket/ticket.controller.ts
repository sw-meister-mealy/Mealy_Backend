import { AuthService } from '@app/auth';
import { Meal, MealService, MealTime } from '@app/meal';
import { Ticket, TicketService } from '@app/ticket';
import { Body, Controller, Delete, Inject, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { ApplyDto } from './dto/apply.dto';
import { GetTicketsDto } from './dto/get-tickets.dto';
import { TransferDto } from './dto/transfer.dto';

@Controller('ticket')
@ApiUseTags('Ticket')
export class TicketController {
  @Inject()
  private readonly ticketService: TicketService;
  @Inject()
  private readonly authService: AuthService;
  @Inject()
  private readonly mealService: MealService;

  private static recordToMealArray(record: Record<string, MealTime[]>) {
    const data: Meal[] = [];
    for (const i of Object.keys(record)) {
      const date = /([0-9]{4})-([0-1][0-9])-([0-3][0-9])/.exec(i);
      for (const j of record[i]) {
        data.push({
          day: parseInt(date[3], 10),
          menu: [],
          month: parseInt(date[2], 10),
          time: j,
          year: parseInt(date[1], 10),
        })
        ;
      }
    }
    return data;
  }

  @Post()
  @ApiOperation({
    title: '모든 티켓 가져오기',
  })
  public async getAllTickets(@Body() payload: GetTicketsDto): Promise<Ticket[]> {
    return this.ticketService.getTickets(await this.authService.auth(payload.token), payload);
  }

  @Put()
  @ApiOperation({
    title: '급식 신청',
  })
  public async apply(@Body() payload: ApplyDto) {
    await this.ticketService.apply(await this.authService.auth(payload.token), TicketController.recordToMealArray(payload.meals));
  }

  @Delete()
  @ApiOperation({
    title: '급식 신청 취소',
  })
  public async delete(@Body() payload: ApplyDto) {
    await this.ticketService.delete(await this.authService.auth(payload.token), TicketController.recordToMealArray(payload.meals));
  }

  @Post('transfer')
  @ApiOperation({
    title: '티켓 이동',
  })
  public async transfer(@Body() payload: TransferDto) {
    const user = await this.authService.auth(payload.token);
    await this.ticketService.transfer(user.studentId, payload.to, TicketController.recordToMealArray(payload.meals));
  }
}
