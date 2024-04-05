import { gql } from 'graphql-request'

export const GET_USER = gql`
    query GetUser($userId: String!) {
        user(userId: $userId) {
            userId
        }
    }
`