import { IsString } from 'class-validator';

export class AddSubdomainContactsDto {
  @IsString({ each: true })
  personIds: string[];
}
