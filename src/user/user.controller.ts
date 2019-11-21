import { UserService } from '@app/user';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { Key } from '../../libs/user/src/class/key.class';
import { AddKeysDto } from './dto/add-keys.dto';
import { NewUserDto } from './dto/new-user.dto';

@Controller('user')
@ApiUseTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put('keys')
  @ApiOperation({
    title: '키 일괄 등록',
  })
  public async addKeys(@Body(new ValidationPipe()) { keys }: AddKeysDto) {
    try {
      return await this.userService.addKeys(keys.map((i) => new Key(i)));
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

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    title: '사용자 불러오기',
  })
  public async getUser(@Param('id') id: string) {
    try {
      return await this.userService.getUser({
        studentId: {
          $eq: id,
        },
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
