import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    CreateWorkAreaData,
    DetailedWorkArea,
    DetailedWorkBoard,
    DetailedWorkItem,
    SetupUserData,
    WorkArea,
    WorkAreaPerson,
    WorkBoardStatus,
    WorkItem,
    WorkItemType,
} from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { v4 } from 'uuid';

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
                    new WorkArea(a.workAreaId, a.name),
                    a.people.map(
                        (p) => new WorkAreaPerson(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri),
                    ),
                ),
        );
    }

    async getArea(session: UserSession, domainId: string, workAreaId: string) {
        const result = await this.prisma.workArea.findFirstOrThrow({
            where: {
                domainId,
                workAreaId,
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
            new WorkArea(result.workAreaId, result.name),
            result.people.map(
                (p) => new WorkAreaPerson(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri),
            ),
        );
    }

    async getBoard(session: UserSession, domainId: string, workAreaId: string) {
        const result = await this.prisma.workArea.findFirstOrThrow({
            where: {
                domainId,
                workAreaId,
            },
            include: {
                people: {
                    include: {
                        user: true,
                    },
                },
                itemStatuses: {
                    include: {
                        items: true,
                    },
                },
            },
        });

        return new DetailedWorkBoard(
            new WorkArea(result.workAreaId, result.name),
            result.people.map(
                (p) => new WorkAreaPerson(p.user.userId, p.user.firstName, p.user.lastName, p.user.iconUri),
            ),
            result.itemStatuses.map(
                (s) =>
                    new WorkBoardStatus(
                        s.statusId,
                        s.name,
                        s.items.map((i) => new WorkItem(i.itemId, i.name, i.type as WorkItemType)),
                    ),
            ),
        );
    }

    async create(session: UserSession, domainId: string, data: CreateWorkAreaData) {
        await this.prisma.workArea.create({
            data: {
                domainId,
                workAreaId: v4(),
                name: data.name,
            },
        });
    }

    async searchItems(session: UserSession, domainId: string, workAreaId: string) {
        const results = await this.prisma.workItem.findMany({
            where: {
                workAreaId,
            },
        });

        return results.map((i) => new WorkItem(i.itemId, i.name, i.type as WorkItemType));
    }

    async getItem(session: UserSession, domainId: string, workAreaId: string, itemId: string) {
        const results = await this.prisma.workItem.findUniqueOrThrow({
            where: {
                itemId,
            },
        });

        return new DetailedWorkItem(results.itemId, results.name, results.type as WorkItemType, results.description);
    }
}
