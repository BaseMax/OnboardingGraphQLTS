import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Form {
  @Field((_type) => Int)
  id: number;

  @Field((_type) => Int)
  step: number;

  @Field((_type) => Int)
  userId: number;

  @Field((_type) => String)
  field: string;

  @Field((_type) => String)
  value: string;

  @Field((_type) => Date)
  createdAt: Date;

  @Field((_type) => Date)
  updatedAt: Date;
}
