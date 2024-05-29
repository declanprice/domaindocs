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

export class WorkItemAttachment {
    constructor(
        public fileId: string,
        public name: string,
        public type: string,
    ) {}
}

export class DetailedWorkItem {
    constructor(
        public id: string,
        public name: string,
        public type: WorkItemType,
        public description: string,
        public reportedBy: WorkAreaPerson,
        public assignees: WorkAreaPerson[],
        public parent: ParentWorkItem | null,
        public attachments: WorkItemAttachment[],
    ) {}
}
