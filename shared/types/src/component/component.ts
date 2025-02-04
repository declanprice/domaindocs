import { Contact } from '../contacts';
import { Link } from '../links';

export enum ComponentType {
    SERVICE = 'Service',
    LIBRARY = 'Library',
    APPLICATION = 'Application',
    DASHBOARD = 'Dashboard',
    WEBSITE = 'Website',
    OTHER = 'Other',
}

export class ComponentLabel {
    constructor(
        public labelId: string,
        public name: string,
    ) {}
}

export class ComponentOwnerTeam {
    constructor(
        public teamId: string,
        public name: string,
    ) {}
}

export class ComponentSubdomain {
    constructor(
        public subdomainId: string,
        public name: string,
    ) {}
}

export class Component {
    constructor(
        public componentId: string,
        public name: string,
        public type: ComponentType,
        public description: string,
        public dateCreated: string,
    ) {}
}

export class SearchComponent {
    constructor(
        public component: Component,
        public team: ComponentOwnerTeam | null,
        public subdomain: ComponentSubdomain | null,
    ) {}
}

export class DetailedComponent {
    constructor(
        public component: Component,
        public team: ComponentOwnerTeam | null,
        public subdomain: ComponentSubdomain | null,
        public links: Link[],
        public contacts: Contact[],
        public labels: ComponentLabel[],
    ) {}
}
