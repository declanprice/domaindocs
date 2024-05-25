import { IsString } from 'class-validator';

export class CreateRoleData {
    @IsString()
    name: string;
}
