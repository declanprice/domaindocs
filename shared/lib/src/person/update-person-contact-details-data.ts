import { IsString } from 'class-validator';

export class UpdatePersonContactDetailsData {
    @IsString()
    workMobile: string;

    @IsString()
    workEmail: string;

    @IsString()
    personalEmail: string;

    @IsString()
    personalMobile: string;
}
