import { WorkAreaPerson } from './work-area-person';

export class WorkArea {
    constructor(
        public id: string,
        public name: string,
    ) {}
}

export class DetailedWorkArea {
    constructor(
        public area: WorkArea,
        public people: WorkAreaPerson[],
    ) {}
}
