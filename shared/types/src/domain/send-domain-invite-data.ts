import { IsEmail } from 'class-validator';

export class SendDomainInviteData {
    @IsEmail()
    email: string;
}
