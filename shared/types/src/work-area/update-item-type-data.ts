import { IsString } from 'class-validator';
import { WorkItemType } from './work-item';

export class UpdateItemTypeData {
    @IsString()
    type: WorkItemType;
}
