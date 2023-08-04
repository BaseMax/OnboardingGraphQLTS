import { Module } from '@nestjs/common';
import { UserModule } from './app/user';
import { AuthModule } from './app/auth';
import { AppGraphQLModule, PrismaModule } from '@infrastructure';
import { FileModule } from './app/file/file.module';

@Module({
  imports: [AppGraphQLModule, PrismaModule, AuthModule, UserModule, FileModule],
})
export class AppModule {}
