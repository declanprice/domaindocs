import { WorkAreaPerson } from './work-area-person';

export enum WorkItemType {
    EPIC = 'Epic',
    STORY = 'Story',
    TASK = 'Task',
    BUG = 'Bug',
    SUB_TASK = 'Subtask',
}

export class ParentWorkItem {
    constructor(
        public id: string,
        public name: string,
        public type: WorkItemType,
    ) {}
}

export class WorkItem {
    constructor(
        public id: string,
        public name: string,
        public type: WorkItemType,
        public assignees: WorkAreaPerson[],
        public parent: ParentWorkItem | null,
    ) {}
}

export class DetailedWorkItem {
    constructor(
        public id: string,
        public name: string,
        public type: WorkItemType,
        public description: string,
        public createdBy: WorkAreaPerson,
        public assignees: WorkAreaPerson[],
        public parent: ParentWorkItem | null,
    ) {}
}
