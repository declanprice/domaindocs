import { IsNotEmpty, IsString } from 'class-validator';

export class EditComponentOwnershipData {
    @IsString()
    @IsNotEmpty()
    teamId: string;
}
