export interface IDatabaseEnv {
  // DATABASE_HOST: string;
  // DATABASE_PORT: number;
  // DATABASE_USER: string;
  // DATABASE_PASSWORD: string;
  // DATABASE_NAME: string;
  // DATABASE_SCHEMA: string;
  // DATABASE_SYNCHRONIZE: boolean;
  DATABASE_URL: string;
}

export interface IDatabaseConfigService {
  // getDatabaseHost: () => string;
  // getDatabasePort: () => number;
  // getDatabaseUser: () => string;
  // getDatabasePassword: () => string;
  // getDatabaseName: () => string;
  // getDatabaseSchema: () => string;
  // getDatabaseSync: () => boolean;
  getDatabaseURL: () => string;
}
