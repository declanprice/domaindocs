import { GraphQLClient } from 'graphql-request'
import { QueryClient } from '@tanstack/react-query'

const endpoint = `http://localhost:3000/graphql`

export const gqlClient = new GraphQLClient(endpoint, {
    headers: {
    },
})

export const queryClient = new QueryClient();
