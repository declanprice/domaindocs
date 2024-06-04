import { IsBoolean, isNotEmpty, IsNotEmpty, IsObject, IsString, MinLength, ValidateNested } from 'class-validator';

export class EditPersonRoleData {
    @IsString()
    @IsNotEmpty({ message: 'Role is required' })
    roleId: string;

    @IsBoolean()
    isPrimary: boolean;
}
