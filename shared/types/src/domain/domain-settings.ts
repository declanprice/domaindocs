import { Domain } from './domain';

export class DomainSettingsPerson {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public email: string,
        public pending: boolean,
        public iconUri?: string,
    ) {}
}

export class DomainSettings {
    constructor(
        public domain: Domain,
        public people: DomainSettingsPerson[],
    ) {}
}
