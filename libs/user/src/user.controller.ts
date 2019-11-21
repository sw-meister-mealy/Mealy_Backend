import { Body, Controller, InternalServerErrorException, Put, ValidationPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { NewUserDto } from './dto/new-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiUseTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Put()
  public async newUser(@Body(new ValidationPipe()) payload: NewUserDto) {
    try {
      return await this.userService.newUser(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
