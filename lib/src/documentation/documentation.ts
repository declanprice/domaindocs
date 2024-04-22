export enum DocumentationType {
  FILE = 'File',
  FOLDER = 'Folder',
  PROJECT = 'Project',
}

export class Documentation {
  constructor(
    public documentationId: string,
    public name: string,
    public type: DocumentationType,
    public documentation: Documentation[] | null,
  ) {}
}
