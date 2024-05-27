import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { SetupUserData } from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class IntegrationsService {
    constructor(readonly prisma: PrismaService) {}

    async search(session: UserSession) {}
    async create(session: UserSession, data: SetupUserData) {}
}
