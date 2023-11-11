import { Construct } from 'constructs'
import {
    AccountRecovery,
    StringAttribute,
    UserPool,
    UserPoolClient,
    UserPoolEmail
} from 'aws-cdk-lib/aws-cognito'
import { Duration, RemovalPolicy } from 'aws-cdk-lib'

export class AuthResources extends Construct {
    private readonly userPoolClient: UserPoolClient

    constructor(scope: Construct, id: string) {
        super(scope, id)

        const userPool = new UserPool(this, 'UserPool', {
            userPoolName: 'domaindocs-userpool',
            accountRecovery: AccountRecovery.EMAIL_ONLY,
            customAttributes: {
                displayName: new StringAttribute({ mutable: true }),
                inviteCode: new StringAttribute({ mutable: true })
            },
            removalPolicy: RemovalPolicy.DESTROY,
            selfSignUpEnabled: true,
            signInAliases: {
                email: true,
                username: true
            },
            passwordPolicy: {
                minLength: 8,
                requireUppercase: true,
                requireLowercase: true,
                requireDigits: true,
                requireSymbols: false
            }
        })

        this.userPoolClient = new UserPoolClient(this, 'UserPoolClient', {
            userPoolClientName: 'domaindocs-userpoolclient',
            userPool: userPool,
            generateSecret: false,
            authFlows: {
                adminUserPassword: true,
                userSrp: true,
                userPassword: false,
                custom: false
            },
            idTokenValidity: Duration.hours(8),
            accessTokenValidity: Duration.hours(8),
            refreshTokenValidity: Duration.days(30)
        })
    }
}
