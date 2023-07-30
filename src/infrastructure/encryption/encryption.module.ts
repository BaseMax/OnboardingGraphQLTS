import { Module } from '@nestjs/common';
import {
  EnvironmentConfigModule,
  EnvironmentConfigService,
} from '../environment';
import { BcryptService } from './bcrypt.service';
import { JwtService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule.registerAsync({
      useFactory: async (configService: EnvironmentConfigService) => ({
        secret: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpirationTime(),
        },
      }),
      inject: [EnvironmentConfigService],
      global: true,
    }),
  ],
  providers: [BcryptService, JwtService],
  exports: [BcryptService, JwtService],
})
export class EncryptionModule {}
