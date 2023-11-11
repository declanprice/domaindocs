import { Construct } from 'constructs'
import {
    BlockPublicAccess,
    Bucket,
    BucketAccessControl,
    HttpMethods
} from 'aws-cdk-lib/aws-s3'
import { Duration, RemovalPolicy } from 'aws-cdk-lib'
import {
    CloudFrontWebDistribution,
    OriginAccessIdentity
} from 'aws-cdk-lib/aws-cloudfront'

export class StorageResources extends Construct {
    public readonly publicBucket: Bucket
    public readonly privateBucket: Bucket

    constructor(scope: Construct, id: string) {
        super(scope, id)

        this.publicBucket = new Bucket(this, 'PublicBucket', {
            bucketName: 'domaindocs-public',
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            accessControl: BucketAccessControl.PRIVATE,
            publicReadAccess: false,
            removalPolicy: RemovalPolicy.DESTROY,
            cors: [
                {
                    allowedMethods: [
                        HttpMethods.PUT,
                        HttpMethods.GET,
                        HttpMethods.DELETE,
                        HttpMethods.HEAD,
                        HttpMethods.POST
                    ],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*']
                }
            ]
        })

        this.privateBucket = new Bucket(this, 'PrivateBucket', {
            bucketName: 'domaindocs-private',
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            accessControl: BucketAccessControl.PRIVATE,
            publicReadAccess: false,
            removalPolicy: RemovalPolicy.DESTROY,
            cors: [
                {
                    allowedMethods: [
                        HttpMethods.PUT,
                        HttpMethods.GET,
                        HttpMethods.DELETE,
                        HttpMethods.HEAD,
                        HttpMethods.POST
                    ],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*']
                }
            ]
        })

        const publicStorageDistribution = new CloudFrontWebDistribution(
            this,
            `CloudfrontDistribution`,
            {
                originConfigs: [
                    {
                        s3OriginSource: {
                            s3BucketSource: this.publicBucket,
                            originAccessIdentity: new OriginAccessIdentity(
                                this,
                                'PublicDocuments-OriginAccessIdentity',
                                {
                                    comment: 'Public Documents'
                                }
                            )
                        },
                        behaviors: [
                            {
                                isDefaultBehavior: true,
                                defaultTtl: Duration.days(1),
                                maxTtl: Duration.days(365)
                            }
                        ]
                    }
                ]
            }
        )
    }
}
