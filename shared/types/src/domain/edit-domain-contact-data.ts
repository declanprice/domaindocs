import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ContactType } from '../contacts/contact-type';

export class EditDomainContactData {
    @IsString()
    @IsNotEmpty()
    type: ContactType;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === ContactType.LINK)
    href?: string;

    @IsString()
    @IsNotEmpty({ message: 'Descriptor field cannot be empty' })
    description: string;
}
