import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
      limits: { fileSize: 10_000_000 }, // 10MB
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
