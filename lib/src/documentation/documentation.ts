export enum DocumentationType {
  FILE = 'File',
}

export enum DocumentationCategory {
  PROJECT = 'Project',
}

export class Documentation {
  constructor(
    public documentationId: string,
    public name: string,
    public type: DocumentationType,
    public isFolder: boolean,
    public category: DocumentationCategory | null,
    public documentation: Documentation[],
  ) {}
}
