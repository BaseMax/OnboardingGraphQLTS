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

  @Query((_returns) => Boolean)
  async isEmailExist(@Args('email') email: string) {
    const user = await this.userService.findOneByEmailOrPhone({ email });
    return !!user;
  }

  @Query((_returns) => Boolean)
  async isPhoneExist(@Args('phone') phone: string) {
    const user = await this.userService.findOneByEmailOrPhone({ phone });
    return !!user;
  }
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
  createOrUpdateFrom(
    @Args('createFormInput') createFormInput: CreateFormInput,
    @CurrentUser() user: User,
  ) {
    return this.userService.createForm({ userId: user.id, createFormInput });
  }
}
