import { IsString } from 'class-validator';

export class AddSubdomainContactDto {
  @IsString()
  userId: string;
}
