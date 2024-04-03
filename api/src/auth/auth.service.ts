import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import Passwordless from 'supertokens-node/recipe/passwordless';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { AuthModuleConfig, ConfigInjectionToken } from './auth.config';
import { EmailService } from '../services/email.service'

@Injectable()
export class AuthService {
    constructor(
        @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
        private emailService: EmailService
    ) {
        supertokens.init({
            appInfo: config.appInfo,
            supertokens: {
                connectionURI: config.connectionURI,
                apiKey: config.apiKey,
            },
            recipeList: [
                Passwordless.init({
                    contactMethod: 'EMAIL',
                    flowType: 'MAGIC_LINK',
                    emailDelivery: {
                        override: (originalImplementation) => {
                            return {
                                ...originalImplementation,
                                sendEmail: async ({email, urlWithLinkCode}) => {
                                    await this.emailService.sendMagicLink(email, urlWithLinkCode);
                                }
                            }
                        }
                    }
                }),
                Session.init(),
                Dashboard.init()
            ],
        });
    }

    async getUser(userId: string) {
        return supertokens.getUser(userId);
    }
}
