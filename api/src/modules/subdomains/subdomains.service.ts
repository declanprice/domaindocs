import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateSubdomainData, SearchSubdomainsParams, Subdomain } from '@domaindocs/types';
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

        return subdomains.map((subdomain) => new Subdomain(subdomain.domainId, subdomain.subdomainId, subdomain.name));
    }

    async get(session: UserSession, domainId: string, subdomainId: string): Promise<Subdomain> {
        const subdomain = await this.prisma.subdomain.findUnique({
            where: { domainId: domainId, subdomainId: subdomainId },
        });
        return new Subdomain(subdomain.domainId, subdomain.subdomainId, subdomain.name);
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
                subdomainId: v4(),
                domainId: domainId,
                name: dto.name,
            },
        });

        return new Subdomain(subdomain.domainId, subdomain.subdomainId, subdomain.name);
    }
}
