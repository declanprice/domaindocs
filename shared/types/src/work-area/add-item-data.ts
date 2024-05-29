import { IsString, MaxLength, MinLength } from 'class-validator';
import { WorkItemType } from './work-item';

export class AddItemData {
    @IsString()
    @MinLength(3)
    name: string;

    @IsString()
    type: WorkItemType;

    @IsString()
    @MaxLength(100)
    description: string;
}
