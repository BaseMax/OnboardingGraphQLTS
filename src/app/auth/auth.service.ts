import { Injectable } from '@nestjs/common';
import { LoginInput, RegisterInput } from './input';
import { UserService } from '../user';
import { BcryptService, EmailService, JwtService } from '@infrastructure';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}
  async register(dto: RegisterInput) {
    // check user existence
    const { email, phone } = dto;
    const user = await this.userService.findOneByEmailOrPhone({
      email,
      phone,
    });

    if (user) return new GraphQLError('user already registered');

    // hash password
    const hashPassword = await this.bcryptService.hash(dto.password);
    dto.password = hashPassword;

    // create/register user
    await this.userService.create(dto);

    await this.sendEmailVerifyToken(email);

    // generate tokens
    const token = await this.jwtService.generateAccessToken({ email });
    return { token };
  }

  async login(dto: LoginInput) {
    const { email, password } = dto;
    // check existence
    const user = await this.userService.findByEmail(email);
    if (!user) throw new GraphQLError('credentials are invalid');

    // check password
    const isPasswordCorrect = await this.bcryptService.compare({
      raw: password,
      hash: user.password,
    });
    if (!isPasswordCorrect) throw new GraphQLError('credentials are invalid');

    // generate tokens
    const token = await this.jwtService.generateAccessToken({
      email: user.email,
    });
    return { token };
  }

  async verifyToken(token: string) {
    // verify token (time expiration)
    const { email } = await this.jwtService.verifyEmailToken(token);
    return this.userService.verifyUserEmail(email);
  }

  async resendVerificationEmail(email: string) {
    const user = await this.userService.findByEmail(email);

    if (user.email_verified) {
      throw new GraphQLError('user already verified');
    }

    await this.sendEmailVerifyToken(email);
    return { message: 'email send successfully', email_sent: true };
  }

  private async sendEmailVerifyToken(email: string) {
    // generate email token
    const emailToken = await this.jwtService.generateEmailToken({ email });
    // send email
    return this.emailService.sendVerifyEmail(email, emailToken);
  }
}
