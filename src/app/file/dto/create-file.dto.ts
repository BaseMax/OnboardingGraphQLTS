import { IsNumberString, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsNumberString()
  stepId: number;
}
