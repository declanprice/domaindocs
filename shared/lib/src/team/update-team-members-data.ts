import { IsString } from 'class-validator';

export class UpdateTeamMembersData {
    @IsString({ each: true })
    userIds: string[];
}
