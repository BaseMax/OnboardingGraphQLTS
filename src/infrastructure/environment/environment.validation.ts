import type { IDatabaseEnv, IJwtEnv } from '@domain';
import { EnvironmentStats } from '@domain';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

class EnvironmentVariables implements IJwtEnv, IDatabaseEnv {
  // env
  @IsEnum(EnvironmentStats)
  NODE_ENV: EnvironmentStats;

  // Jwt
  @IsString()
  JWT_SECRET: string;

  @IsString()
  JWT_EXPIRATION_TIME: string;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsString()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;

  // Database
  @IsString()
  DATABASE_URL: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
