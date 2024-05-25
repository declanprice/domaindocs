import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { CreateSkillData, SearchSkillsParams, Skill } from '@domaindocs/types';
import { PrismaService } from '../../shared/prisma.service';
import { createSlug } from '../../util/create-slug';

@Injectable()
export class SkillsService {
    constructor(private prisma: PrismaService) {}

    async search(session: UserSession, domainId: string, params: SearchSkillsParams): Promise<Skill[]> {
        const results = await this.prisma.skill.findMany({
            where: {
                domainId: domainId,
                name: params.name
                    ? {
                          contains: params.name,
                      }
                    : undefined,
            },
        });

        return results.map((s) => new Skill(s.skillId, s.name));
    }

    async create(session: UserSession, domainId: string, dto: CreateSkillData): Promise<Skill> {
        const result = await this.prisma.skill.create({
            data: {
                skillId: createSlug(dto.name),
                name: dto.name,
                domainId,
            },
        });

        return new Skill(result.skillId, result.name);
    }
}
