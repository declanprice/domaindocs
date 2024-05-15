import { IsString, MaxLength, MinLength } from 'class-validator';

export class SetupDomainData {
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    domainName: string;
}
