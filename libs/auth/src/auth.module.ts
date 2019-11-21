import { ConfigModule } from '@app/config';
import { DatabaseModule } from '@app/database';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  exports: [AuthService],
  imports: [DatabaseModule, ConfigModule, UserModule],
  providers: [AuthService],
})
export class AuthModule {
}
