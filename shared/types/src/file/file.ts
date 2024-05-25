export class FileTeam {
    constructor(
        public teamId: string,
        public teamName: string,
        public teamIconUri: string,
    ) {}
}

export class FileProject {
    constructor(
        public projectId: string,
        public projectName: string,
    ) {}
}

export class File {
    constructor(
        public fileId: string,
        public name: string,
        public type: string,
    ) {}
}

export class DetailedFile {
    constructor(
        public file: File,
        public project: FileProject | undefined,
        public team: FileTeam | undefined,
    ) {}
}
