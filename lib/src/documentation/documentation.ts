export enum DocumentationType {
  FILE = 'File',
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

export class ProjectDocumentation {
  constructor(
    public projectId: string,
    public projectName: string,
    public documentation: Documentation[],
  ) {}
}
