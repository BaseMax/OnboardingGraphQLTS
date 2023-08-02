import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((_type) => Int)
  id: number;

  @Field((_type) => String)
  f_name: string;

  @Field((_type) => String)
  l_name: string;

  @Field((_type) => String)
  email: string;

  @Field((_type) => String)
  phone: string;

  @Field((_type) => String)
  post_code: string;

  @Field((_type) => String)
  country: string;

  @Field((_type) => String)
  address_detail: string;

  @Field((_type) => Boolean)
  email_verified: boolean;

  @Field((_type) => [String])
  languages: string[];

  @Field((_type) => Date)
  createdAt: Date;

  @Field((_type) => Date)
  updatedAt: Date;
}
