import { Resolver, Args, Query } from '@nestjs/graphql';
import { AuthService } from '../../auth/auth.service';
import { AuthUserModel } from '../model/auth-user.model'

@Resolver((of: any) => AuthUserModel)
export class AuthUserResolver {
    constructor(readonly authService: AuthService) {}

    @Query((returns) => AuthUserModel)
    async user(@Args({ name: 'id', type: () => String }) id: string) {
        return this.authService.getUser(id);
    }
}
