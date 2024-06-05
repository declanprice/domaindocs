export enum ComponentType {
    SERVICE = 'Service',
    LIBRARY = 'Library',
    APPLICATION = 'Application',
    DASHBOARD = 'Dashboard',
    WEBSITE = 'Website',
    OTHER = 'Other',
}

export enum ComponentContactType {
    EMAIL = 'Email',
    MOBILE = 'Mobile',
    LINK = 'Link',
}

export class ComponentContact {
    constructor(
        public contactId: string,
        public type: ComponentContactType,
        public description: string,
        public href?: string,
    ) {}
}

export class ComponentLink {
    constructor(
        public linkId: string,
        public href: string,
        public description: string,
    ) {}
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
        public links: ComponentLink[],
        public contacts: ComponentContact[],
        public labels: ComponentLabel[],
    ) {}
}
