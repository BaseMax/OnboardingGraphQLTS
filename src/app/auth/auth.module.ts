import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { EmailModule, EncryptionModule } from '@infrastructure';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    EncryptionModule,
    UserModule,
    EmailModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
