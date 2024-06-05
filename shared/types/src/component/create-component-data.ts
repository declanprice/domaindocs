import { IsNotEmpty, IsString, MinLength } from 'class-validator';

import { ComponentType } from './component';

export class CreateComponentData {
    @IsString()
    @MinLength(3, { message: 'Component name must be at least 3 characters' })
    name: string;

    @IsString()
    @IsNotEmpty()
    type: ComponentType;
}
