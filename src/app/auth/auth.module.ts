import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EncryptionModule } from '@infrastructure';
import { UserModule } from '../user';

@Module({
  imports: [EncryptionModule, UserModule],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
