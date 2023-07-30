import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { RegisterInput } from '../auth/input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findOneByEmailAndPhone({ email, phone }: { email: string; phone: string }) {
    return this.prisma.user.findUnique({ where: { email, phone } });
  }

  create(dto: RegisterInput) {
    console.log({ dto });

    return this.prisma.user.create({ data: dto });
  }
}
