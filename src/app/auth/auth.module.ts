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
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtGuard } from './passport';

@Global()
@Module({
  imports: [
    EnvironmentConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EncryptionModule,
    EmailModule,
    ConfigModule,
    UserModule,
  ],
  providers: [AuthService, AuthResolver, JwtGuard],
  exports: [AuthService, EncryptionModule, JwtGuard],
  controllers: [AuthController],
})
export class AuthModule {}
