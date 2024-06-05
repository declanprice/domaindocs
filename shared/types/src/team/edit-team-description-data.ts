import { IsString } from 'class-validator';

export class EditTeamDescriptionData {
    @IsString()
    description: string;
}
