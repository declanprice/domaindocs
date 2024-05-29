import { IsString } from 'class-validator';

export class UpdateItemAssigneesData {
    @IsString({ each: true })
    userIds: string[];
}
