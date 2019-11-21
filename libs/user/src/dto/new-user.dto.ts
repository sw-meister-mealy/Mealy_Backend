import { ApiModelProperty } from '@nestjs/swagger';

export class NewUserDto {
  @ApiModelProperty({
    description: '미리 배부돤 인증 키',
    example: 'SLoWMoTIoN',
  })
  public key: string;

  @ApiModelProperty({
    description: '사용자 ID',
    example: 'park012241',
  })
  public username: string;

  @ApiModelProperty({
    description: 'SHA256으로 해시된 사용자 비밀번호',
    example: 'B03DDF3CA2E714A6548E7495E2A03F5E824EAAC9837CD7F159C67B90FB4B7342',
  })
  public password: string;
}
