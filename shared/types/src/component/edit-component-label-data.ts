import { IsNotEmpty, IsString } from 'class-validator';

export class EditComponentLabelData {
    @IsString()
    @IsNotEmpty()
    labelId: string;
}
