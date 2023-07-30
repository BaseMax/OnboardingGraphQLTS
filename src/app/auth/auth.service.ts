import { Injectable } from '@nestjs/common';
import { RegisterInput } from './input';
import { UserService } from '../user';
import { BcryptService } from '@infrastructure';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    // private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}
  async register(dto: RegisterInput) {
    // check user existence
    const { email, phone } = dto;
    const user = await this.userService.findOneByEmailAndPhone({
      email,
      phone,
    });

    if (user) return new Error('user already registered');

    // hash password
    const hashPassword = await this.bcryptService.hash(dto.password);
    dto.password = hashPassword;

    // create/register user
    await this.userService.create(dto);

    // generate tokens
    const token = await this.jwtService.signAsync({ email: dto.email });
    return { token };
  }
}
