import { IsString } from 'class-validator';

export class EditDescriptionData {
    @IsString()
    description: string;
}
