import { IsString } from 'class-validator';

export class AddSubdomainResourceLinkDto {
  @IsString()
  title: string;

  @IsString()
  subTitle: string;

  @IsString()
  href: string;

  @IsString()
  iconUri?: string;
}
