import { IsNotEmpty, IsString } from 'class-validator';

export class EditComponentSubdomainData {
    @IsString()
    @IsNotEmpty()
    subdomainId: string;
}
