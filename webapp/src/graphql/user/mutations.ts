import { gql } from 'graphql-request'

export const CREATE_USER = gql`
    mutation CreateUser($data: UserInput!) {
        createUser(data: $data) {
            userId
        }
    }
`