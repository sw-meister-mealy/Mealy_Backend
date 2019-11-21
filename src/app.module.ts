import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';

@Module({
  controllers: [AppController, UserController],
  imports: [UserModule],
  providers: [AppService],
})
export class AppModule {
}
