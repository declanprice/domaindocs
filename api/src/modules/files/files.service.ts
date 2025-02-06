import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { PrismaService } from '../../shared/prisma.service';
import { FileWithSignedUrl, GenerateFileSignedUrlData } from '@domaindocs/types';
import { v4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class FilesService {
    private PRIVATE_BUCKET_NAME: string;
    private PUBLIC_BUCKET_NAME: string;
    private S3 = new S3Client({});

    constructor(
        readonly prisma: PrismaService,
        readonly config: ConfigService,
    ) {
        this.PRIVATE_BUCKET_NAME = this.config.get('PRIVATE_BUCKET_NAME');
        this.PUBLIC_BUCKET_NAME = this.config.get('PUBLIC_BUCKET_NAME');
    }

    async generateUploadUrl(
        session: UserSession,
        domainId: string,
        data: GenerateFileSignedUrlData,
    ): Promise<FileWithSignedUrl> {
        const fileId = v4();

        const key = `${domainId}/${fileId}`;

        const file = await this.prisma.file.create({
            data: {
                domainId,
                fileId,
                type: data.type,
                name: data.name,
                bucket: this.PRIVATE_BUCKET_NAME,
                key: key,
                createdDate: new Date(),
                isUploaded: false,
            },
        });

        const url = await getSignedUrl(
            this.S3,
            new PutObjectCommand({
                Bucket: this.PRIVATE_BUCKET_NAME,
                Key: key,
            }),
            { expiresIn: 3600 },
        );

        return new FileWithSignedUrl(file.fileId, file.name, file.type, url);
    }

    async generateGetUrl(session: UserSession, domainId: string, fileId: string): Promise<FileWithSignedUrl> {
        const result = await this.prisma.file.findFirst({
            where: {
                fileId,
            },
        });

        const signedUrl = await getSignedUrl(
            this.S3,
            new GetObjectCommand({
                Bucket: this.PRIVATE_BUCKET_NAME,
                Key: result.key,
            }),
            { expiresIn: 3600 },
        );

        return new FileWithSignedUrl(result.fileId, result.name, result.type, signedUrl);
    }
}
