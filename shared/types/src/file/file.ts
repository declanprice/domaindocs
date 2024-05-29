export class File {
    constructor(
        public fileId: string,
        public name: string,
        public type: string,
    ) {}
}

export class FileWithSignedUrl {
    constructor(
        public fileId: string,
        public name: string,
        public type: string,
        public url: string,
    ) {}
}
