import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserModel {
    @Field((type) => String)
    id: string;

    @Field((type) => [String])
    emails: string[];
}
