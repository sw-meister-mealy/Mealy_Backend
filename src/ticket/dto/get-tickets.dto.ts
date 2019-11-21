import { ApiModelProperty } from '@nestjs/swagger';
import { IsJWT, IsNumber } from 'class-validator';

export class GetTicketsDto {
  @IsJWT()
  @ApiModelProperty({
    description: 'Token',
  })
  public token: string;
  @IsNumber()
  @ApiModelProperty({
    description: 'Year',
    type: Number,
  })
  public year: number;
  @IsNumber()
  @ApiModelProperty({
    description: 'Month',
    type: Number,
  })
  public month: number;
}
