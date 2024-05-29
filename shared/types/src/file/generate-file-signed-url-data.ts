import { IsString } from 'class-validator';

export class GenerateFileSignedUrlData {
    @IsString()
    name: string;

    @IsString()
    type: string;
}
