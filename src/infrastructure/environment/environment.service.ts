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
}
