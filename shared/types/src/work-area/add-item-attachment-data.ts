import { IsString } from 'class-validator';

export class AddItemAttachmentData {
    @IsString()
    fileId: string;
}
