import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { JwtGuard } from '../auth/passport';
import { FilesInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() dto: CreateFileDto,
  ) {
    return this.fileService.create(dto, files);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files', 10))
  update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.fileService.update(+id, updateFileDto, files);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
