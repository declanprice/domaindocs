import { IsNotEmpty, IsString } from 'class-validator';

export class EditDomainLinkData {
    @IsString()
    @IsNotEmpty()
    href: string;

    @IsString()
    @IsNotEmpty({ message: 'Description field cannot be empty' })
    description: string;

    @IsString()
    @IsNotEmpty({ message: 'Reason field cannot be empty' })
    reason: string;
}
