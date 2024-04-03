import { Injectable } from '@nestjs/common'
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {

    readonly client = new SESClient();

    readonly source: string;

    constructor(readonly config: ConfigService) {
        this.source = config.get('SES_SOURCE');
    }

    async sendMagicLink(to: string, link: string): Promise<any> {

        const command = new SendEmailCommand({
            Source: this.source,
            Destination: {
                ToAddresses: [to],
                CcAddresses: [],
                BccAddresses: []
            },
            Message: {
                Subject: {
                    Data: 'Magic sign in link',
                },
                Body: {
                    Text: {
                        Data: link,
                    },
                   Html: {
                        Data: link,
                   }
                }
            }
        });

        return this.client.send(command)
    }
}