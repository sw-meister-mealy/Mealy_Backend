import { AuthService } from '@app/auth';
import { Body, Controller, Inject, InternalServerErrorException, Post, ValidationPipe } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { GetTokenDto } from './dto/get-token.dto';

@Controller('auth')
@ApiUseTags('Auth')
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  @Post()
  public async getToken(@Body(new ValidationPipe()) payload: GetTokenDto) {
    try {
      return await this.authService.getToken(payload);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
