import { IsString } from 'class-validator';

export class UpdatePersonSkillsData {
    @IsString({ each: true })
    skillIds: string[];
}
