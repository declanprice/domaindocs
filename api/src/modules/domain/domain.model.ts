import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DomainModel {
  @Field((type) => String)
  domainId: string;

  @Field((type) => String)
  domainName: string;
}

@InputType()
export class CreateDomainInput {
  @Field({ nullable: false })
  domainName: string;
}
