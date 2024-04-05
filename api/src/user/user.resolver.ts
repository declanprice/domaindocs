import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { UserInput, UserModel } from './user.model';
import { UserService } from './user.service';

@Resolver((of: any) => UserModel)
export class UserResolver {
  constructor(readonly userService: UserService) {}

  @Query((returns) => UserModel, { nullable: true })
  async user(@Args({ name: 'userId', type: () => String }) userId: string) {
    return this.userService.getUser(userId);
  }

  @Mutation((returns) => UserModel)
  async createUser(@Args('data') input: UserInput) {
    return this.userService.createUser(input);
  }
}
