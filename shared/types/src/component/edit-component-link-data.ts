import { IsNotEmpty, IsString } from 'class-validator';

export class EditComponentLinkData {
    @IsString()
    @IsNotEmpty()
    href: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
