export enum DocumentationType {
    DOMAIN_ROOT_FOLDER = 'Domain Folder',
    PROJECT_ROOT_FOLDER = 'Project Folder',
    TEAM_ROOT_FOLDER = 'Team Folder',
    FOLDER = 'Folder',
    FILE = 'File',
    DOCUMENT = 'Document',
}

export class Documentation {
    constructor(
        public documentationId: string,
        public name: string,
        public type: DocumentationType,
        public documentation: Documentation[] | null,
    ) {}
}

export class DetailedDocumentation {
    constructor(
        public documentationId: string,
        public name: string,
        public type: DocumentationType,
        public createdAt: string,
        public updatedAt: string,
        public createdBy: {
            firstName: string;
            lastName: string;
            iconUri?: string;
        },
    ) {}
}

export class DocumentationFile {
    constructor(
        public documentationId: string,
        public name: string,
        public type: string | undefined,
        public key: string | undefined,
    ) {}
}

export class DocumentationDocument {
    constructor(
        public documentationId: string,

        public name: string,
        public data: string | undefined,
    ) {}
}
