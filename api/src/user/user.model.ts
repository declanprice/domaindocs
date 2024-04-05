import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field((type) => String)
  userId: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  firstName: string;

  @Field((type) => String)
  lastName: string;
}

@InputType()
export class UserInput {
  @Field({ nullable: false })
  userId: string;

  @Field({ nullable: false })
  firstName: string;

  @Field({ nullable: false })
  lastName: string;
}
