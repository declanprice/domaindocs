export class FileProject {
  constructor(public projectId: string, public projectName: string, public subdomainName: string) {
  }
}

export class File {
  constructor(public fileId: string, public name: string, public type: string, public uri: string, public project: FileProject) {
  }
}
