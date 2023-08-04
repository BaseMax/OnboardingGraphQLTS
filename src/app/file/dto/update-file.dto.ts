import { PartialType } from '@nestjs/mapped-types';
import { CreateFileDto } from './create-file.dto';
import { IsNumberString, IsString } from 'class-validator';

export class UpdateFileDto extends PartialType(CreateFileDto) {
  @IsNumberString()
  stepId: number;

  @IsString()
  name: string;
}
