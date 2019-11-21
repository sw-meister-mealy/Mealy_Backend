import { MealTime } from '@app/meal';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsJWT, IsObject, IsString } from 'class-validator';

export class TransferDto {
  @IsJWT()
  @ApiModelProperty({
    description: '토큰',
  })
  public token: string;
  @IsString()
  @ApiModelProperty({
    description: '수신자 학번',
  })
  public to: string;
  @IsObject()
  @ApiModelProperty({
    description: '이동할 티켓들',
    example: {
      '2019-11-21': ['breakfast', 'lunch', 'dinner'],
    },
  })
  public meals: Record<string, MealTime[]>;
}
