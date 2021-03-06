import { MealTime } from '@app/meal';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsJWT, IsObject } from 'class-validator';

export class ApplyDto {
  @IsJWT()
  @ApiModelProperty({
    description: '토큰',
  })
  public token: string;
  @IsObject()
  @ApiModelProperty({
    description: '급식 정보',
    example: {
      '2019-11-21': ['breakfast', 'lunch', 'dinner'],
    },
  })
  public meals: Record<string, MealTime[]>;
}
