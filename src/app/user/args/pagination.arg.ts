import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((_type) => Int, { defaultValue: 0 })
  skip = 0;

  @Field((_type) => Int, { defaultValue: 10 })
  take = 10;
}
