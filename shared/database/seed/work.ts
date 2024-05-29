import { WorkArea, WorkAreaPerson, WorkItemStatus, WorkItem, WorkItemAssigne } from '@prisma/client';
import { ros } from './domain';
import { benUser, declanUser, natashaUser } from './users';
import { WorkItemType } from '../../types/src';

const areaId = 'workarea1';

export const workAreas = (): WorkArea[] => {
    return [
        {
            domainId: ros().domainId,
            areaId,
            name: 'Team Orion',
        },
        {
            domainId: ros().domainId,
            areaId: 'workarea2',
            name: 'Team Keplar',
        },
    ];
};

export const workAreaPeople = (): WorkAreaPerson[] => {
    return [
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            areaId,
        },
        {
            userId: benUser().userId,
            domainId: ros().domainId,
            areaId,
        },
        {
            userId: natashaUser().userId,
            domainId: ros().domainId,
            areaId,
        },
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            areaId: 'workarea2',
        },
    ];
};

export const workItemStatuses = (): WorkItemStatus[] => {
    return [
        {
            statusId: 'todo',
            name: 'To Do',
            isToDoStatus: true,
            isDoneStatus: false,
            areaId,
            domainId: ros().domainId,
        },
        {
            statusId: 'doing',
            name: 'Doing',
            isToDoStatus: false,
            isDoneStatus: false,
            areaId,
            domainId: ros().domainId,
        },
        {
            statusId: 'done',
            name: 'Done',
            isToDoStatus: false,
            isDoneStatus: true,
            areaId,
            domainId: ros().domainId,
        },
    ];
};

export const workItems = (): WorkItem[] => {
    return [
        {
            areaId,
            domainId: ros().domainId,
            statusId: 'todo',
            itemId: 'item1',
            name: 'Item 1',
            type: WorkItemType.STORY,
            description: 'story description',
            parentId: null,
            createdByUserId: declanUser().userId,
        },
        {
            areaId,
            domainId: ros().domainId,
            statusId: 'todo',
            itemId: 'item2',
            name: 'Item 2',
            type: WorkItemType.STORY,
            description: 'story description',
            parentId: null,
            createdByUserId: declanUser().userId,
        },
    ];
};

export const workItemAssignees = (): WorkItemAssigne[] => {
    return [
        {
            domainId: ros().domainId,
            userId: declanUser().userId,
            itemId: 'item1',
        },
        {
            domainId: ros().domainId,
            userId: benUser().userId,
            itemId: 'item1',
        },
    ];
};
