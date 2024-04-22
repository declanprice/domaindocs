import { IsEnum } from 'class-validator';
import { DocumentationType } from '@domaindocs/lib';

export class AddDocumentation {
  @IsEnum(DocumentationType)
  type: DocumentationType;
}
