import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateFormInput {
  @Field((_type) => String)
  @IsString()
  @IsNotEmpty()
  field: string;

  @Field((_type) => String)
  @IsString()
  @IsNotEmpty()
  value: string;

  @Field((_type) => Int)
  @IsNumber()
  @IsNotEmpty()
  step: number;
}
