import { IsString } from 'class-validator';

export class UpdateTeamSummaryData {
    @IsString()
    description: string;
}
