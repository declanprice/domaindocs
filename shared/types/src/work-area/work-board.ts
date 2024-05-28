import { WorkAreaPerson } from './work-area-person';
import { WorkArea } from './work-area';
import { WorkItem } from './work-item';

export class WorkBoardStatus {
    constructor(
        public id: string,
        public name: string,
        public items: WorkItem[],
    ) {}
}

export class DetailedWorkBoard {
    constructor(
        public area: WorkArea,
        public people: WorkAreaPerson[],
        public statuses: WorkBoardStatus[],
    ) {}
}
