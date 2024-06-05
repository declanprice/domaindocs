import { IsString, MaxLength } from 'class-validator';

export class EditComponentDescriptionData {
    @IsString()
    @MaxLength(500)
    description: string;
}
