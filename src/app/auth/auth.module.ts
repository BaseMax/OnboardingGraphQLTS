import { Global, Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import {
  EmailModule,
  EncryptionModule,
  EnvironmentConfigModule,
} from '@infrastructure';
import { UserModule } from '../user';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './passport';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    EnvironmentConfigModule,
    PassportModule.register({ property: 'email', defaultStrategy: 'jwt' }),
    EncryptionModule,
    EmailModule,
    ConfigModule,
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
