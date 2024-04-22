import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class SearchDocumentation {
  @IsString()
  @IsOptional()
  projectId?: string;

  @IsBoolean()
  @IsOptional()
  relevant?: boolean;
}
