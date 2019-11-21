import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { Key } from '../../../libs/user/src/class/key.class';

export class AddKeysDto {
  @ValidateNested()
  @Type(() => Key)
  @ApiModelProperty({
    description: '인증키 배열',
    example: [{
      key: 'SLoWMoTIoN',
      name: '박주성',
      studentId: '2308',
    }],
    isArray: true,
    type: Key,
  })
  public readonly keys: Key[];
}
