import { IsString, MaxLength } from 'class-validator';

export class UpdateItemDescriptionData {
    @IsString()
    @MaxLength(1000)
    description: string;
}
