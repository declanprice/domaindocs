import { Injectable, NotFoundException } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import {
    CreateComponentData,
    DocumentationType,
    Component,
    SearchComponentsParams,
    EditComponentDescriptionData,
    EditComponentLinkData,
    SearchComponent,
    ComponentType,
    ComponentOwnerTeam,
    ComponentSubdomain,
    DetailedComponent,
    ComponentLink,
    ComponentContact,
    ComponentContactType,
    ComponentLabel,
    EditComponentOwnershipData,
    EditComponentContactData,
} from '@domaindocs/types';
import { v4 } from 'uuid';
import { createSlug } from '../../util/create-slug';
import { PrismaService } from '../../shared/prisma.service';
import { EditComponentSubdomainData } from '../../../../shared/types/src/component/edit-component-subdomain-data';
import { EditComponentLabelData } from '../../../../shared/types/src/component/edit-component-label-data';

@Injectable()
export class ComponentsService {
    constructor(private prisma: PrismaService) {}

    async searchComponents(
        session: UserSession,
        domainId: string,
        params: SearchComponentsParams,
    ): Promise<SearchComponent[]> {
        const results = await this.prisma.component.findMany({
            where: {
                domainId: domainId,
            },
            include: {
                ownerTeam: true,
                subdomain: true,
            },
        });

        return results.map(
            (component) =>
                new SearchComponent(
                    new Component(
                        component.componentId,
                        component.name,
                        component.type as ComponentType,
                        component.description,
                    ),
                    component.ownerTeam
                        ? new ComponentOwnerTeam(component.ownerTeam.teamId, component.ownerTeam.name)
                        : null,
                    component.subdomain
                        ? new ComponentSubdomain(component.subdomain.subdomainId, component.subdomain.name)
                        : null,
                ),
        );
    }

    async getComponent(session: UserSession, domainId: string, componentId: string): Promise<DetailedComponent> {
        const component = await this.prisma.component.findUniqueOrThrow({
            where: {
                componentId,
            },
            include: {
                ownerTeam: true,
                subdomain: true,
                contacts: true,
                links: true,
                labels: {
                    include: {
                        label: true,
                    },
                },
            },
        });

        return new DetailedComponent(
            new Component(
                component.componentId,
                component.name,
                component.type as ComponentType,
                component.description,
            ),
            component.ownerTeam ? new ComponentOwnerTeam(component.ownerTeam.teamId, component.ownerTeam.name) : null,
            component.subdomain
                ? new ComponentSubdomain(component.subdomain.subdomainId, component.subdomain.name)
                : null,
            component.links.map((link) => new ComponentLink(link.linkId, link.href, link.description)),
            component.contacts.map(
                (contact) =>
                    new ComponentContact(
                        contact.contactId,
                        contact.type as ComponentContactType,
                        contact.description,
                        contact.href,
                    ),
            ),
            component.labels.map((label) => new ComponentLabel(label.labelId, label.label.name)),
        );
    }

    async createComponent(session: UserSession, domainId: string, data: CreateComponentData): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            const documentationId = v4();

            const componentId = createSlug(data.name);

            await tx.documentation.create({
                data: {
                    documentationId,
                    name: data.name,
                    domainId,
                    type: DocumentationType.FOLDER,
                    componentId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    createdByUserId: session.userId,
                },
            });

            await tx.component.create({
                data: {
                    componentId,
                    domainId,
                    type: data.type,
                    name: data.name,
                    description: '',
                },
            });
        });
    }

    async updateDescription(
        session: UserSession,
        domainId: string,
        componentId: string,
        dto: EditComponentDescriptionData,
    ) {
        await this.prisma.component.update({
            where: {
                componentId,
            },
            data: {
                description: dto.description,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async updateSubdomain(
        session: UserSession,
        domainId: string,
        componentId: string,
        data: EditComponentSubdomainData,
    ) {
        await this.prisma.component.update({
            where: {
                componentId,
            },
            data: {
                subdomainId: data.subdomainId,
            },
        });
        return this.getComponent(session, domainId, componentId);
    }

    async removeSubdomain(session: UserSession, domainId: string, componentId: string) {
        await this.prisma.component.update({
            where: {
                componentId,
            },
            data: {
                subdomainId: null,
            },
        });
        return this.getComponent(session, domainId, componentId);
    }

    async updateOwnership(
        session: UserSession,
        domainId: string,
        componentId: string,
        data: EditComponentOwnershipData,
    ) {
        await this.prisma.component.update({
            where: {
                componentId,
            },
            data: {
                ownerTeamId: data.teamId,
            },
        });
        return this.getComponent(session, domainId, componentId);
    }

    async removeOwnership(session: UserSession, domainId: string, componentId: string) {
        await this.prisma.component.update({
            where: {
                componentId,
            },
            data: {
                ownerTeamId: null,
            },
        });
        return this.getComponent(session, domainId, componentId);
    }

    async createLink(session: UserSession, domainId: string, componentId: string, data: EditComponentLinkData) {
        await this.prisma.componentLink.create({
            data: {
                domainId,
                componentId,
                linkId: v4(),
                href: data.href,
                description: data.description,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async updateLink(
        session: UserSession,
        domainId: string,
        componentId: string,
        linkId: string,
        data: EditComponentLinkData,
    ) {
        await this.prisma.componentLink.update({
            where: {
                linkId,
            },
            data: {
                href: data.href,
                description: data.description,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async removeLink(session: UserSession, domainId: string, componentId: string, linkId: string) {
        await this.prisma.componentLink.delete({
            where: {
                linkId,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async createContact(session: UserSession, domainId: string, componentId: string, data: EditComponentContactData) {
        await this.prisma.componentContact.create({
            data: {
                domainId,
                componentId,
                contactId: v4(),
                type: data.type,
                href: data.href,
                description: data.description,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async updateContact(
        session: UserSession,
        domainId: string,
        componentId: string,
        contactId: string,
        data: EditComponentContactData,
    ) {
        await this.prisma.componentContact.update({
            where: {
                contactId,
            },
            data: {
                type: data.type,
                href: data.href,
                description: data.description,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async removeContact(session: UserSession, domainId: string, componentId: string, contactId: string) {
        await this.prisma.componentContact.delete({
            where: {
                contactId,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async addLabel(session: UserSession, domainId: string, componentId: string, data: EditComponentLabelData) {
        await this.prisma.componentLabel.create({
            data: {
                domainId,
                componentId,
                labelId: data.labelId,
            },
        });

        return this.getComponent(session, domainId, componentId);
    }

    async removeLabel(session: UserSession, domainId: string, componentId: string, labelId: string) {
        await this.prisma.componentLabel.delete({
            where: {
                labelId_componentId: {
                    componentId,
                    labelId,
                },
            },
        });

        return this.getComponent(session, domainId, componentId);
    }
}
