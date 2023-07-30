import { Module } from '@nestjs/common';
import { UserModule } from './app/user';
import { AuthModule } from './app/auth';
import { AppGraphQLModule, PrismaModule } from '@infrastructure';

@Module({
  imports: [AppGraphQLModule, PrismaModule, AuthModule, UserModule],
})
export class AppModule {}
