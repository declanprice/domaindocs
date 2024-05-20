import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { createSlug } from '../../util/create-slug';
import { SetupDomainData } from '@domaindocs/lib';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class DomainsService {
    constructor(private prisma: PrismaService) {}

    async setupDomain(session: UserSession, dto: SetupDomainData) {
        await this.prisma.$transaction(async (tx) => {
            const domainId = createSlug(dto.domainName);

            await tx.domain.create({
                data: {
                    domainId,
                    name: dto.domainName,
                },
            });

            await tx.person.create({
                data: {
                    domainId,
                    userId: session.userId,
                },
            });
        });
    }
}
