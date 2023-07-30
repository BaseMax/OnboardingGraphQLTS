import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsEmail()
  @MaxLength(60)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(64)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  password: string;
}
