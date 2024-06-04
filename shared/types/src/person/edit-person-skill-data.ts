import { IsNotEmpty, IsString } from 'class-validator';

export class EditPersonSkillData {
    @IsString()
    @IsNotEmpty({ message: 'Skill is required' })
    skillId: string;
}
