import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '@infrastructure';
import * as fs from 'fs/promises';

@Injectable()
export class FileService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateFileDto, files: Express.Multer.File[]) {
    const paths = files.map((file) => file.originalname);
    return this.prisma.file.create({
      data: { name: dto.name, stepId: +dto.stepId, files: { set: paths } },
    });
  }

  async findOne(id: number) {
    return this.prisma.file.findFirst({ where: { id } });
  }

  update(id: number, dto: UpdateFileDto, files: Express.Multer.File[]) {
    const paths = files.map((file) => file.originalname);
    return this.prisma.file.update({
      where: { id },
      data: { name: dto.name, stepId: +dto.stepId, files: { set: paths } },
    });
  }

  async remove(id: number) {
    const file = await this.prisma.file.findFirst({ where: { id } });

    for (const path of file.files) {
      const filePath = this.getPath(path);
      await fs.unlink(filePath);
    }
    return this.prisma.file.delete({ where: { id } });
  }

  private getPath(id: string) {
    return './uploads/' + id;
  }
}
