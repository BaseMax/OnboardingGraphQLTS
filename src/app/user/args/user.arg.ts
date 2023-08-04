import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

@ArgsType()
export class UserArg {
  @Field((_type) => String, { nullable: true })
  @IsEmail()
  @MaxLength(60)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @Field((_type) => String, { nullable: true })
  @MaxLength(14)
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone?: string;
}
