import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { IDatabaseConfigService, IJwtConfigService } from '@domain';

@Injectable()
export class EnvironmentConfigService
  implements IDatabaseConfigService, IJwtConfigService
{
  constructor(private configService: ConfigService) {}

  // JWT
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  // Database
  getDatabaseURL(): string {
    return this.configService.get<string>('DATABASE_URL');
  }

  // APP_DOMAIN
  getAppDomain(): string {
    return this.configService.get<string>('APP_DOMAIN');
  }

  // EMAIL
  getEmailSecret(): string {
    return this.configService.get<string>('EMAIL_SECRET');
  }

  getEmailExpirationTime(): string {
    return this.configService.get<string>('EMAIL_EXPIRATION_TIME');
  }
}
