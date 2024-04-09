import { gql } from 'graphql-request'

import { gqlClient } from '../client.ts'

export const CREATE_ACCOUNT = gql`
    mutation CreateUser($data: UserInput!) {
        createUser(data: $data) {
            userId
        }
    }
`

type CreateAccountData = {
    userId: string
    firstName: string
    lastName: string
}

export const createAccount = (data: CreateAccountData) => {
    return gqlClient.request(CREATE_ACCOUNT, {
        data: {
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
        },
    })
}
