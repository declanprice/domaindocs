import { ContactType } from '../contacts';

export class Domain {
    constructor(
        public domainId: string,
        public name: string,
        public description: string,
        public dateCreated: string,
    ) {}
}

export class DomainContact {
    constructor(
        public contactId: string,
        public type: ContactType,
        public description: string,
        public href?: string,
    ) {}
}

export class DomainLink {
    constructor(
        public linkId: string,
        public href: string,
        public description: string,
    ) {}
}

export class DetailedDomain {
    constructor(
        public domain: Domain,
        public contacts: DomainContact[],
        public links: DomainLink[],
    ) {}
}
