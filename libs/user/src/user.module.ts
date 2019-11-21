import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {
}
