import { IsEnum } from 'class-validator';

import { DocumentationType } from './documentation';

export class AddDocumentationData {
    @IsEnum(['FILE', 'FOLDER', 'DOCUMENT'])
    type: DocumentationType;
}
