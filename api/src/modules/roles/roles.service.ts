import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { SearchRolesParams, Role } from '@domaindocs/lib';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    async search(session: UserSession, domainId: string, dto: SearchRolesParams): Promise<Role[]> {
        return [];
    }
}
