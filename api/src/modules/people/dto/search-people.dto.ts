import { IsString } from 'class-validator';

export class SearchPeopleDto {
  @IsString()
  name: string;
}
