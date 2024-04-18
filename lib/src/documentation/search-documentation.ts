import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchDocumentation {
  @IsString()
  projectId?: string;

  @IsBoolean()
  @IsOptional()
  relevant?: boolean;
}
