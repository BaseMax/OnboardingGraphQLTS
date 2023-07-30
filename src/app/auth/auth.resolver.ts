import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoginInput, RegisterInput } from './input';
import { AuthService } from './auth.service';
import { AuthToken } from './output';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  //   @Mutation(() => String)
  //   async login(
  //     @Args('registerInput') registerInput: RegisterInput,
  //   ): Promise<string> {
  //     const token = await this.authService.login(authCredentialsDto);
  //     return token;
  //   }

  @Mutation(() => AuthToken)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthToken)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }
}
