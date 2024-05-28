import { WorkArea, WorkAreaPerson, WorkItemStatus, WorkItem, WorkItemAssigne } from '@prisma/client';
import { ros } from './domain';
import { benUser, declanUser, natashaUser } from './users';
import { WorkItemType } from '../../types/src';

const workAreaId = 'workarea1';

export const workAreas = (): WorkArea[] => {
    return [
        {
            domainId: ros().domainId,
            workAreaId,
            name: 'Team Orion',
        },
        {
            domainId: ros().domainId,
            workAreaId: 'workarea2',
            name: 'Team Keplar',
        },
    ];
};

export const workAreaPeople = (): WorkAreaPerson[] => {
    return [
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            workAreaId,
        },
        {
            userId: benUser().userId,
            domainId: ros().domainId,
            workAreaId,
        },
        {
            userId: natashaUser().userId,
            domainId: ros().domainId,
            workAreaId,
        },
        {
            userId: declanUser().userId,
            domainId: ros().domainId,
            workAreaId: 'workarea2',
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
            workAreaId,
            domainId: ros().domainId,
        },
        {
            statusId: 'doing',
            name: 'Doing',
            isToDoStatus: false,
            isDoneStatus: false,
            workAreaId,
            domainId: ros().domainId,
        },
        {
            statusId: 'done',
            name: 'Done',
            isToDoStatus: false,
            isDoneStatus: true,
            workAreaId,
            domainId: ros().domainId,
        },
    ];
};

export const workItems = (): WorkItem[] => {
    return [
        {
            workAreaId,
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
            workAreaId,
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
