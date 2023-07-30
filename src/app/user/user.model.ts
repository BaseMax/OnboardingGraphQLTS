import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field((type) => String, { name: 'f_name' })
  firstName: string;

  @Field((type) => String, { name: 'l_name' })
  lastName: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  phone: string;

  @Field((type) => String, { name: 'post_code' })
  postCode: string;

  @Field((type) => String)
  country: string;

  @Field((type) => String, { name: 'address_detail' })
  addressDetail: string;

  @Field((type) => [String])
  languages: string[];

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
