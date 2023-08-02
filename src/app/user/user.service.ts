import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure';
import { RegisterInput } from '../auth/input';
import { CreateFormInput } from './input';

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

  getUserForms({ userId, steps }: { userId: number; steps: number[] }) {
    console.log({ steps, userId });

    return this.prisma.form.findMany({
      where: {
        userId,
        step: { in: [1] },
      },
    });
  }

  createForm({
    userId,
    createFormInput,
  }: {
    userId: number;
    createFormInput: CreateFormInput;
  }) {
    console.log({ userId, createFormInput });

    return this.prisma.form.create({
      data: { ...createFormInput, userId },
    });
  }
}
