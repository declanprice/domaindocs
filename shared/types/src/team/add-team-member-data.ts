import { IsString } from 'class-validator';

export class AddTeamMemberData {
    @IsString()
    userId: string;
}
