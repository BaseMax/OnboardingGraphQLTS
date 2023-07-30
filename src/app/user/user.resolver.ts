import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserArg } from './args';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/passport';
import { UseGuards } from '@nestjs/common';

@Resolver((_of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Query((_returns) => User, { nullable: true })
  async user(@Args() userArgs: UserArg) {
    return await this.userService.findOneByEmailOrPhone(userArgs);
  }
}
