import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTokenDto {
  @IsString()
  @ApiModelProperty({
    description: 'ID',
    example: 'park012241',
  })
  public username: string;
  @IsString()
  @ApiModelProperty({
    description: 'PW',
    example: 'B03DDF3CA2E714A6548E7495E2A03F5E824EAAC9837CD7F159C67B90FB4B7342',
  })
  public password: string;
}
