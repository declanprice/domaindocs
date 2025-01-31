import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ContactType } from './contact-type';

export class EditContactData {
    @IsString()
    @IsOptional()
    contactId?: string;

    @IsString()
    @IsNotEmpty()
    type: ContactType;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === ContactType.LINK)
    href?: string;

    @IsString()
    @IsNotEmpty({ message: 'Description field cannot be empty' })
    description: string;

    @IsString()
    reason: string;
}
