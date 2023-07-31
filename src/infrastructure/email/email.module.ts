import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EnvironmentConfigModule } from '../environment';

@Module({
  imports: [EmailModule, EnvironmentConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
