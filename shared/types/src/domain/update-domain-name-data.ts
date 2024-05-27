import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateDomainNameData {
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    domainName: string;
}
