export class SecretProject {
    constructor(
        public projectId: string,
        public projectName: string,
        public subdomainName: string,
    ) {}
}

export class Secret {
    constructor(
        public secretId: string,
        public name: string,
        public uri: string,
        public project: SecretProject,
    ) {}
}
