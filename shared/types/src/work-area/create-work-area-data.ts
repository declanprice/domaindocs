import { IsString } from 'class-validator';

export class CreateWorkAreaData {
    @IsString()
    name: string;
}
