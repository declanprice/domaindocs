import { IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';
import { PersonContactType } from './person';

export class EditPersonContactData {
    @IsString()
    @IsNotEmpty()
    type: PersonContactType;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === PersonContactType.LINK)
    href?: string;

    @IsString()
    @IsNotEmpty({ message: 'Descriptor field cannot be empty' })
    description: string;
}
