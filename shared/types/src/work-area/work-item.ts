export enum WorkItemType {
    EPIC = 'Epic',
    STORY = 'Story',
    TASK = 'Task',
    BUG = 'Bug',
    SUB_TASK = 'Subtask',
}

export class WorkItem {
    constructor(
        public id: string,
        public name: string,
        public type: WorkItemType,
    ) {}
}

export class DetailedWorkItem {
    constructor(
        public id: string,
        public name: string,
        public type: WorkItemType,
        public description: string,
    ) {}
}
