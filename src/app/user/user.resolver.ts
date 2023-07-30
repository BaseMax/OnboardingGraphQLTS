import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver((of) => User)
export class UserResolver {
  //   constructor() {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => Int }) id: number) {
    // return this.authorsService.findOneById(id);
  }
}
