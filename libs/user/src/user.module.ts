import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  exports: [UserService],
  imports: [DatabaseModule],
  providers: [UserService],
})
export class UserModule {
}
