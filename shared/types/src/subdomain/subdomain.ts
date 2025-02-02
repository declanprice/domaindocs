import { Contact } from '../contacts';
import { Link } from '../links';

export class Subdomain {
    constructor(
        public domainId: string,
        public subdomainId: string,
        public name: string,
        public description: string,
        public dateCreated: string,
    ) {}
}

export class DetailedSubdomain {
    constructor(
        public subdomain: Subdomain,
        public contacts: Contact[],
        public links: Link[],
    ) {}
}
