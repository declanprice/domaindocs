import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditLinkData {
    @IsString()
    @IsOptional()
    linkId?: string;

    @IsString()
    @IsNotEmpty()
    href: string;

    @IsString()
    @IsNotEmpty({ message: 'Description field cannot be empty' })
    description: string;
}
