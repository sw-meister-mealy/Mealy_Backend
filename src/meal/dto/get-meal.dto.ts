import { ApiModelProperty } from '@nestjs/swagger';

export class GetMealDto {
  @ApiModelProperty({
    description: 'Y',
  })
  public year: string;
  @ApiModelProperty({
    description: 'M',
  })
  public month: string;
  @ApiModelProperty({
    description: 'D',
    required: false,
  })
  public day?: string;
}
