import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Key {
  @IsString()
  @ApiModelProperty({
    description: '학번',
    example: '2308',
  })
  public studentId: string;
  @IsString()
  @ApiModelProperty({
    description: '이름',
    example: '박주성',
  })
  public name: string;
  @IsString()
  @ApiModelProperty({
    description: '인증 키',
    example: 'SLoWMoTIoN',
  })
  public key: string;

  constructor(key: Key) {
    Object.assign(this, key);
  }
}
