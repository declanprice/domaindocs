import { BadRequestException, Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    CreateWorkAreaData,
    DetailedWorkArea,
    DetailedWorkBoard,
    DetailedWorkItem,
    WorkArea,
    WorkAreaPerson,
    WorkBoardStatus,
    WorkItem,
    WorkItemType,
    UpdateItemParentData,
    UpdateItemTypeData,
    ParentWorkItem,
    UpdateItemAssigneesData,
    UpdateItemReportedByData,
    AddItemAttachmentData,
    WorkItemAttachment,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { v4 } from 'uuid';
import { a } from 'vitest/dist/suite-ynYMzeLu';
import { UpdateItemDescriptionData } from '../../../../shared/types/src/work-area/update-item-description-data';

@Injectable()
export class WorkAreasService {
    constructor(readonly prisma: PrismaService) {}

    async search(session: UserSession, domainId: string) {
        const results = await this.prisma.workArea.findMany({
            where: {
                domainId,
            },
            include: {
                people: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return results.map(
            (a) =>
                new DetailedWorkArea(
                    new WorkArea(a.areaId, a.name),
                    a.people.map(
                        (p) => new WorkAreaPerson(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri),
                    ),
                ),
        );
    }

    async getArea(session: UserSession, domainId: string, areaId: string) {
        const result = await this.prisma.workArea.findFirstOrThrow({
            where: {
                domainId,
                areaId,
            },
            include: {
                people: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        return new DetailedWorkArea(
            new WorkArea(result.areaId, result.name),
            result.people.map(
                (p) => new WorkAreaPerson(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri),
            ),
        );
    }

    async searchAreaPeople(session: UserSession, domainId: string, areaId: string) {
        const results = await this.prisma.workAreaPerson.findMany({
            where: {
                domainId,
                areaId,
            },
            include: {
                user: true,
            },
        });

        return results.map((p) => new WorkAreaPerson(p.userId, p.user.firstName, p.user.lastName, p.user.iconUri));
    }

    async getBoard(session: UserSession, domainId: string, areaId: string) {
        const result = await this.prisma.workArea.findFirstOrThrow({
            where: {
                domainId,
                areaId,
            },
            include: {
                people: {
                    include: {
                        user: true,
                    },
                },
                itemStatuses: {
                    include: {
                        items: {
                            include: {
                                parent: true,
                                assignees: {
                                    include: {
                                        user: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        return new DetailedWorkBoard(
            new WorkArea(result.areaId, result.name),
            result.people.map(
                (p) => new WorkAreaPerson(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri),
            ),
            result.itemStatuses.map(
                (s) =>
                    new WorkBoardStatus(
                        s.statusId,
                        s.name,
                        s.items.map(
                            (i) =>
                                new WorkItem(
                                    i.itemId,
                                    i.name,
                                    i.type as WorkItemType,
                                    i.assignees.map(
                                        (a) =>
                                            new WorkAreaPerson(
                                                a.user.userId,
                                                a.user.firstName,
                                                a.user.lastName,
                                                a.user.iconUri,
                                            ),
                                    ),
                                    i.parent
                                        ? new ParentWorkItem(
                                              i.parent.parentId,
                                              i.parent.name,
                                              i.parent.type as WorkItemType,
                                          )
                                        : null,
                                ),
                        ),
                    ),
            ),
        );
    }

    async create(session: UserSession, domainId: string, data: CreateWorkAreaData) {
        await this.prisma.workArea.create({
            data: {
                domainId,
                areaId: v4(),
                name: data.name,
            },
        });
    }

    async searchItems(session: UserSession, domainId: string, areaId: string) {
        const results = await this.prisma.workItem.findMany({
            where: {
                areaId,
            },
            include: {
                assignees: {
                    include: {
                        user: true,
                    },
                },
                parent: true,
            },
        });

        return results.map(
            (i) =>
                new WorkItem(
                    i.itemId,
                    i.name,
                    i.type as WorkItemType,
                    i.assignees.map(
                        (a) => new WorkAreaPerson(a.user.userId, a.user.firstName, a.user.lastName, a.user.iconUri),
                    ),
                    i.parent
                        ? new ParentWorkItem(i.parent.parentId, i.parent.name, i.parent.type as WorkItemType)
                        : null,
                ),
        );
    }

    async getItem(session: UserSession, domainId: string, areaId: string, itemId: string) {
        const result = await this.prisma.workItem.findUniqueOrThrow({
            where: {
                itemId,
            },
            include: {
                reportedByUser: true,
                assignees: {
                    include: {
                        user: true,
                    },
                },
                parent: true,
                attachments: {
                    include: {
                        file: true,
                    },
                },
            },
        });

        return new DetailedWorkItem(
            result.itemId,
            result.name,
            result.type as WorkItemType,
            result.description,
            new WorkAreaPerson(
                result.reportedByUser.userId,
                result.reportedByUser.firstName,
                result.reportedByUser.lastName,
                result.reportedByUser.iconUri,
            ),
            result.assignees.map(
                (a) => new WorkAreaPerson(a.user.userId, a.user.firstName, a.user.lastName, a.user.iconUri),
            ),
            result.parent
                ? new ParentWorkItem(result.parent.parentId, result.parent.name, result.parent.type as WorkItemType)
                : null,
            result.attachments.map((a) => new WorkItemAttachment(a.file.fileId, a.file.name, a.file.type)),
        );
    }

    async getAvailableParents(session: UserSession, domainId: string, areaId: string, itemId: string) {
        const item = await this.prisma.workItem.findUniqueOrThrow({
            where: {
                itemId,
            },
        });

        if (item.type === WorkItemType.EPIC) {
            throw new Error('EPIC cannot have a parent item');
        }

        if (item.type === WorkItemType.SUB_TASK) {
            const results = await this.prisma.workItem.findMany({
                where: {
                    areaId,
                    type: {
                        in: [WorkItemType.STORY, WorkItemType.TASK, WorkItemType.BUG],
                    },
                },
            });

            return results.map((r) => new ParentWorkItem(r.itemId, r.name, r.type as WorkItemType));
        }

        const results = await this.prisma.workItem.findMany({
            where: {
                areaId,
                type: {
                    in: [WorkItemType.EPIC],
                },
            },
        });

        return results.map((r) => new ParentWorkItem(r.itemId, r.name, r.type as WorkItemType));
    }

    async updateParent(
        session: UserSession,
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemParentData,
    ): Promise<DetailedWorkItem> {
        const item = await this.prisma.workItem.findUniqueOrThrow({
            where: {
                itemId,
            },
        });

        const parentItem = await this.prisma.workItem.findUniqueOrThrow({
            where: {
                itemId: data.itemId,
            },
        });

        if (parentItem.type === WorkItemType.EPIC) {
            if (![WorkItemType.STORY, WorkItemType.TASK, WorkItemType.BUG].includes(item.type as WorkItemType)) {
                throw new Error('Epic children can only be a Story, Task or Bug');
            }
        }

        if (parentItem.type === WorkItemType.SUB_TASK) {
            throw new BadRequestException('Subtask item cannot have children');
        }

        await this.prisma.workItem.update({
            where: {
                itemId,
            },
            data: {
                parentId: parentItem.itemId,
            },
        });

        return this.getItem(session, domainId, areaId, itemId);
    }

    async updateType(session: UserSession, domainId: string, areaId: string, itemId: string, data: UpdateItemTypeData) {
        const item = await this.prisma.workItem.findUniqueOrThrow({
            where: {
                itemId,
            },
        });

        if (item.type === WorkItemType.EPIC) {
            throw new BadRequestException('Cannot change Epic item type');
        }

        if (item.type === WorkItemType.SUB_TASK) {
            throw new BadRequestException('Cannot change Subtask item type');
        }

        await this.prisma.workItem.update({
            where: {
                itemId,
            },
            data: {
                type: data.type,
            },
        });

        return this.getItem(session, domainId, areaId, itemId);
    }

    async updateReportedBy(
        session: UserSession,
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemReportedByData,
    ) {
        await this.prisma.workItem.update({
            where: {
                itemId,
            },
            data: {
                reportedByUserId: data.userId,
            },
        });

        return this.getItem(session, domainId, areaId, itemId);
    }

    async updateAssignees(
        session: UserSession,
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemAssigneesData,
    ) {
        await this.prisma.$transaction(async (tx) => {
            await tx.workItemAssigne.deleteMany({
                where: {
                    itemId,
                },
            });

            for (const userId of data.userIds) {
                await tx.workItemAssigne.create({
                    data: {
                        domainId,
                        itemId,
                        userId,
                    },
                });
            }
        });

        return this.getItem(session, domainId, areaId, itemId);
    }

    async updateDescription(
        session: UserSession,
        domainId: string,
        areaId: string,
        itemId: string,
        data: UpdateItemDescriptionData,
    ) {
        await this.prisma.workItem.update({
            where: {
                itemId,
            },
            data: {
                description: data.description,
            },
        });

        return this.getItem(session, domainId, areaId, itemId);
    }

    async addAttachment(
        session: UserSession,
        domainId: string,
        areaId: string,
        itemId: string,
        data: AddItemAttachmentData,
    ) {
        await this.prisma.workItemAttachment.createMany({
            data: {
                fileId: data.fileId,
                itemId,
                domainId,
            },
        });

        return this.getItem(session, domainId, areaId, itemId);
    }

    async removeAttachment(session: UserSession, domainId: string, areaId: string, itemId: string, fileId: string) {
        await this.prisma.workItemAttachment.delete({
            where: {
                itemId_fileId: {
                    fileId,
                    itemId,
                },
            },
        });

        return this.getItem(session, domainId, areaId, itemId);
    }
}
