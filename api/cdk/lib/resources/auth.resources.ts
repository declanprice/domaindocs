import { Construct } from 'constructs'
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito'

export class AuthResources extends Construct {
    public readonly userPoolClient: UserPoolClient

    constructor(scope: Construct, id: string) {
        super(scope, id)

        const userPool = new UserPool(this, 'UserPool', {
            userPoolName: 'domaindocs-userpool'
        })

        this.userPoolClient = new UserPoolClient(this, 'UserPoolClient', {
            userPoolClientName: 'domaindocs-userpoolclient',
            userPool: userPool
        })
    }
}
