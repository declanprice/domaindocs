import { IsString } from 'class-validator';

export class EditDomainDescriptionData {
    @IsString()
    description: string;
}
