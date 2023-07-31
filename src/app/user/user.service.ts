import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure';
import { RegisterInput } from '../auth/input';

interface IFindUserPaginate {
  email?: string;
  phone?: string;
  skip?: number;
  take?: number;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmailOrPhone({
    email,
    phone,
    skip = 0,
    take = 10,
  }: IFindUserPaginate) {
    return this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
      skip,
      take,
    });
  }

  create(dto: RegisterInput) {
    console.log('USER CREATED');

    return this.prisma.user.create({ data: dto });
  }

  findByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  verifyUserEmail(email: string) {
    return this.prisma.user.update({
      where: { email },
      data: { email_verified: true },
    });
  }
}
