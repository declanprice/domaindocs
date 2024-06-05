import { IsNotEmpty, IsString } from 'class-validator';

export class EditPersonAboutMeData {
    @IsString()
    aboutMe: string;
}
