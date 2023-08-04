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

  findOneByEmailOrPhone({ email, phone }: IFindUserPaginate) {
    return this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }] },
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

  async createForm({
    userId,
    createFormInput,
  }: {
    userId: number;
    createFormInput: CreateFormInput;
  }) {
    const { step, field } = createFormInput;
    const form = await this.prisma.form.findFirst({ where: { step, field } });
    if (form) {
      return this.prisma.form.update({
        where: { id: form.id },
        data: { ...createFormInput, userId },
      });
    }

    return this.prisma.form.create({
      data: { ...createFormInput, userId },
    });
  }
}
