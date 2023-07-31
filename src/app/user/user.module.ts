import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { AuthModule } from '../auth';

@Module({
  imports: [],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
