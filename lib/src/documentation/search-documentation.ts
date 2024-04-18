import { IsString } from 'class-validator';

export class SearchDocumentation {
  @IsString()
  projectId?: string;
}
