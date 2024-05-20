import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { SearchSkillsParams, Skill } from '@domaindocs/lib';
import { PrismaService } from '../../shared/prisma.service';

@Injectable()
export class SkillsService {
    constructor(private prisma: PrismaService) {}

    async searchSkills(session: UserSession, domainId: string, dto: SearchSkillsParams): Promise<Skill[]> {
        return [];
    }
}
