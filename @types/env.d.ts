declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      // # DATABASE
      DATABASE_URL: string;

      // # JWT
      JWT_SECRET: string;
      JWT_EXPIRATION_TIME: string;
      JWT_REFRESH_TOKEN_SECRET: string;
      JWT_REFRESH_TOKEN_EXPIRATION_TIME: string;

      // # NODE
      NODE_ENV: 'local' | 'production';
    }
  }
}

// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
