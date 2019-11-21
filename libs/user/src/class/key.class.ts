import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Key {
  @IsString()
  @ApiModelProperty({
    description: '학번',
    example: '2308',
  })
  public readonly studentId: string;
  @IsString()
  @ApiModelProperty({
    description: '이름',
    example: '박주성',
  })
  public readonly name: string;
  @IsString()
  @ApiModelProperty({
    description: '인증 키',
    example: 'SLoWMoTIoN',
  })
  public readonly key: string;

  constructor(key: Key) {
    Object.assign(this, key);
  }
}
