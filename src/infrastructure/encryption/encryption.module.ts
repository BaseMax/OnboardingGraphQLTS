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
        global: true,
        secretOrPrivateKey: configService.getJwtSecret(),
        signOptions: {
          expiresIn: configService.getJwtExpirationTime(),
        },
      }),
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
    }),
  ],
  providers: [BcryptService, JwtService],
  exports: [BcryptService, JwtService],
})
export class EncryptionModule {}
