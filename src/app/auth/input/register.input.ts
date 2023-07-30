import { InputType, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsPostalCode,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  f_name: string;

  @Field(() => String)
  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  l_name: string;

  @Field(() => String)
  @IsEmail()
  @MaxLength(60)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(14)
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  phone: string;

  @MaxLength(64)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  password: string;

  // @IsPostalCode()
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  post_code: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  country: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  address_detail: string;

  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Field(() => [String])
  language: string[];
}
