export enum DocumentationType {
    DOMAIN_ROOT_FOLDER = 'Domain',
    PROJECT_ROOT_FOLDER = 'Project',
    TEAM_ROOT_FOLDER = 'Team',
    FILE = 'File',
    DOCUMENT = 'Document',
    FOLDER = 'Folder',
}

export class Documentation {
    constructor(
        public documentationId: string,
        public name: string,
        public type: DocumentationType,
        public documentation: Documentation[] | null,
    ) {}
}

export class FileDocumentation {
    constructor(
        public documentationId: string,
        public name: string,
        public type: DocumentationType.FILE,
        public file: {
            fileId: string;
            fileName: string;
        },
    ) {}
}

export class DocumentDocumentation {
    constructor(
        public documentationId: string,
        public name: string,
        public type: DocumentationType.DOCUMENT,
        public document: {
            documentId: string;
            documentName: string;
        },
    ) {}
}

export type ViewDocumentation = FileDocumentation | DocumentDocumentation;
