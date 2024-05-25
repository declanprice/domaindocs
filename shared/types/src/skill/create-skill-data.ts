import { IsString } from 'class-validator';

export class CreateSkillData {
    @IsString()
    name: string;
}
