import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UserArg } from './args';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/passport';
import { UseGuards } from '@nestjs/common';
import { Form, User } from './models';
import { CreateFormInput } from './input';
import { CurrentUser } from '@infrastructure';

@Resolver((_of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Query((_returns) => User, { nullable: true })
  async user(@Args() userArgs: UserArg) {
    return this.userService.findOneByEmailOrPhone(userArgs);
  }

  @UseGuards(JwtGuard)
  @Query((_returns) => [User], { nullable: true })
  async users(@Args() userArgs: UserArg) {
    return this.userService.findOneByEmailOrPhone(userArgs);
  }

  @ResolveField('forms', (_returns) => [Form])
  getUserForms(
    @Parent() user: User,
    @Args('steps', { type: () => [Int] }) steps: number[],
  ) {
    return this.userService.getUserForms({ userId: user.id, steps });
  }

  @UseGuards(JwtGuard)
  @Mutation((_returns) => Form)
  createFrom(
    @Args('createFormInput') createFormInput: CreateFormInput,
    @CurrentUser() user: User,
  ) {
    console.log({ user });

    return this.userService.createForm({ userId: user.id, createFormInput });
  }
}
