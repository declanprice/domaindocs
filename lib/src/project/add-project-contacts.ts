import { IsString } from 'class-validator';

export class AddProjectContacts {
  @IsString({ each: true })
  personIds: string[];
}
