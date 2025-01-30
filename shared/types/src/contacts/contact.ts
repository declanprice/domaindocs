import { ContactType } from './contact-type';

export class Contact {
    constructor(
        public contactId: string,
        public type: ContactType,
        public description: string,
        public href?: string,
    ) {}
}
