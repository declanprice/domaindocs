import { Contact } from '../contacts';
import { Link } from '../links';

export class Domain {
    constructor(
        public domainId: string,
        public name: string,
        public description: string,
        public dateCreated: string,
    ) {}
}

export class DetailedDomain {
    constructor(
        public domain: Domain,
        public contacts: Contact[],
        public links: Link[],
    ) {}
}
