import { IsString } from 'class-validator';

export class UpdateItemParentData {
    @IsString()
    itemId: string;
}
