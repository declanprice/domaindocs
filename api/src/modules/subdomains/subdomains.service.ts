import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import {
    Contact,
    ContactType,
    CreateSubdomainData,
    DetailedSubdomain,
    EditContactData,
    EditDescriptionData,
    Link,
    SearchSubdomainsParams,
    UpdateNameData,
    Subdomain,
    EditLinkData,
} from '@domaindocs/types';
import { UserSession } from '../../auth/auth-session';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class SubdomainsService {
    constructor(private prisma: PrismaService) {}

    async search(session: UserSession, domainId: string, params: SearchSubdomainsParams): Promise<Subdomain[]> {
        const query: any = {
            domainId,
        };

        if (params.name != '') {
            query.name = { contains: params.name };
        }

        const subdomains = await this.prisma.subdomain.findMany({
            where: query,
        });

        return subdomains.map(
            (subdomain) =>
                new Subdomain(
                    subdomain.domainId,
                    subdomain.subdomainId,
                    subdomain.name,
                    subdomain.description,
                    subdomain.dateCreated.toISOString(),
                ),
        );
    }

    async get(session: UserSession, domainId: string, subdomainId: string): Promise<DetailedSubdomain> {
        const subdomain = await this.prisma.subdomain.findUnique({
            where: { domainId: domainId, subdomainId: subdomainId },
            include: {
                contacts: true,
                links: true,
            },
        });

        return new DetailedSubdomain(
            new Subdomain(
                subdomain.domainId,
                subdomain.subdomainId,
                subdomain.name,
                subdomain.description,
                subdomain.dateCreated.toISOString(),
            ),
            subdomain.contacts.map(
                (c) => new Contact(c.contactId, c.type as ContactType, c.description, c.reason, c.href),
            ),
            subdomain.links.map((l) => new Link(l.linkId, l.href, l.description)),
        );
    }

    async updateName(
        session: UserSession,
        domainId: string,
        subdomainId: string,
        data: UpdateNameData,
    ): Promise<DetailedSubdomain> {
        await this.prisma.subdomain.update({
            where: {
                domainId,
                subdomainId,
            },
            data: {
                name: data.name,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async delete(session: UserSession, domainId: string, subdomainId: string): Promise<void> {
        const subdomain = await this.prisma.subdomain.findUnique({
            where: { domainId: domainId, subdomainId: subdomainId },
        });

        if (!subdomain) {
            throw new BadRequestException('subdomain does not exist');
        }

        await this.prisma.subdomain.delete({
            where: {
                subdomainId: subdomainId,
            },
        });
    }

    async create(session: UserSession, domainId: string, dto: CreateSubdomainData): Promise<Subdomain> {
        const subdomain = await this.prisma.subdomain.create({
            data: {
                domainId: domainId,
                subdomainId: v4(),
                name: dto.name,
                description: '',
            },
        });

        return new Subdomain(
            subdomain.domainId,
            subdomain.subdomainId,
            subdomain.name,
            subdomain.description,
            subdomain.dateCreated.toISOString(),
        );
    }

    async updateDescription(session: UserSession, domainId: string, subdomainId: string, data: EditDescriptionData) {
        await this.prisma.subdomain.update({
            where: {
                domainId,
                subdomainId,
            },
            data: {
                description: data.description,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async addContact(session: UserSession, domainId: string, subdomainId: string, data: EditContactData) {
        await this.prisma.subdomainContact.create({
            data: {
                domainId,
                subdomainId,
                contactId: v4(),
                type: data.type,
                href: data.href,
                reason: data.reason,
                description: data.description,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async updateContact(
        session: UserSession,
        domainId: string,
        subdomainId: string,
        contactId: string,
        data: EditContactData,
    ) {
        await this.prisma.subdomainContact.update({
            where: {
                domainId,
                subdomainId,
                contactId,
            },
            data: {
                type: data.type,
                href: data.href,
                reason: data.reason,
                description: data.description,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async removeContact(session: UserSession, domainId: string, subdomainId: string, contactId: string) {
        await this.prisma.subdomainContact.delete({
            where: {
                domainId,
                subdomainId,
                contactId,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async addLink(session: UserSession, domainId: string, subdomainId: string, data: EditLinkData) {
        await this.prisma.subdomainLink.create({
            data: {
                domainId,
                subdomainId,
                linkId: v4(),
                href: data.href,
                description: data.description,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async updateLink(session: UserSession, domainId: string, subdomainId: string, linkId: string, data: EditLinkData) {
        await this.prisma.subdomainLink.update({
            where: {
                domainId,
                subdomainId,
                linkId,
            },
            data: {
                href: data.href,
                description: data.description,
            },
        });

        return this.get(session, domainId, subdomainId);
    }

    async removeLink(session: UserSession, domainId: string, subdomainId: string, linkId: string) {
        await this.prisma.subdomainLink.delete({
            where: {
                domainId,
                subdomainId,
                linkId,
            },
        });

        return this.get(session, domainId, subdomainId);
    }
}
