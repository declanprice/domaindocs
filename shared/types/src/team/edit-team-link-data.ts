import { IsNotEmpty, IsString } from 'class-validator';

export class EditTeamLinkData {
    @IsString()
    @IsNotEmpty()
    href: string;

    @IsString()
    @IsNotEmpty({ message: 'Descriptor field cannot be empty' })
    description: string;
}
