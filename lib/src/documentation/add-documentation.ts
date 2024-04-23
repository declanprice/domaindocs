import { IsEnum } from 'class-validator';

import { DocumentationType } from './documentation';

export class AddDocumentation {
    @IsEnum(['FILE', 'FOLDER', 'DOCUMENT'])
    type: DocumentationType;
}
