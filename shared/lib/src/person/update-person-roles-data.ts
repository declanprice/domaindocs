import { IsString } from 'class-validator';

export class UpdatePersonRolesData {
    @IsString({ each: true })
    roleIds: string[];
}
