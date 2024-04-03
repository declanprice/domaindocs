import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import * as path from 'path';
import * as process from 'process'

import { AuthUserResolver } from './resolvers/auth-user.resolver';

@Module({
    providers: [AuthUserResolver],
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
           driver: ApolloDriver,
            autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
            playground: true,
            context: () => {},
        }),
    ]
})
export class GraphqlModule {}
