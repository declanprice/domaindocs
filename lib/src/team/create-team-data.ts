import { IsString } from 'class-validator';

export class CreateTeamData {
    @IsString()
    name: string;
}
