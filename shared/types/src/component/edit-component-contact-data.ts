import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { TeamContactType } from '../team';

export class EditComponentContactData {
    @IsString()
    @IsNotEmpty()
    type: TeamContactType;

    @IsString()
    @IsNotEmpty()
    @ValidateIf((o) => o.type === TeamContactType.LINK)
    href?: string;

    @IsString()
    @IsNotEmpty({ message: 'Descriptor field cannot be empty' })
    description: string;
}
