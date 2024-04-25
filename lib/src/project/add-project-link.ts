import { IsString } from 'class-validator';

export class AddProjectLink {
    @IsString()
    title: string;

    @IsString()
    subTitle: string;

    @IsString()
    href: string;

    @IsString()
    iconUri?: string;
}
