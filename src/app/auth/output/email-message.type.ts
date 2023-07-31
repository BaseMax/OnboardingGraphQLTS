import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailMessage {
  @Field()
  message: string;

  @Field()
  email_sent: boolean;
}
