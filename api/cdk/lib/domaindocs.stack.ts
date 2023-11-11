import { Construct } from 'constructs'
import { Stack, StackProps } from 'aws-cdk-lib'
import { AuthResources } from './resources/auth.resources'
import { StorageResources } from './resources/storage.resources'

export class DomainDocsStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props)

        const auth = new AuthResources(this, 'AuthResources')

        const storage = new StorageResources(this, 'StorageResources')
    }
}
