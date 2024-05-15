import { IsString } from 'class-validator';

export class AddProjectLinkData {
    @IsString()
    title: string;

    @IsString()
    subTitle: string;

    @IsString()
    href: string;

    @IsString()
    iconUri?: string;
}
