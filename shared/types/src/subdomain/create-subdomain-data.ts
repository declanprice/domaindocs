import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubdomainData {
    @IsString()
    @IsNotEmpty()
    name: string;
}
