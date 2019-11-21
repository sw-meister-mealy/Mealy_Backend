import { Body, Controller, InternalServerErrorException, Put, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { AddKeysDto } from './dto/add-keys.dto';
import { NewUserDto } from './dto/new-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiUseTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Put('keys')
  @ApiOperation({
    title: '키 일괄 등록',
  })
  public async addKeys(@Body(new ValidationPipe()) { keys }: AddKeysDto) {
    try {
      return await this.userService.addKeys(keys);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Put()
  @ApiOperation({
    title: '사용자 생성',
  })
  public async newUser(@Body(new ValidationPipe()) payload: NewUserDto) {
    try {
      return await this.userService.newUser(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
