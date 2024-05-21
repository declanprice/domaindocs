import { Injectable } from '@nestjs/common';
import { UserSession } from '../../auth/auth-session';
import { SearchRolesParams, Role, CreateRoleData } from '@domaindocs/lib';
import { PrismaService } from '../../shared/prisma.service';
import { createSlug } from '../../util/create-slug';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    async search(session: UserSession, domainId: string, params: SearchRolesParams): Promise<Role[]> {
        const results = await this.prisma.role.findMany({
            where: {
                domainId: domainId,
                name: params.name
                    ? {
                          contains: params.name,
                      }
                    : undefined,
            },
        });

        return results.map((s) => new Role(s.roleId, s.name));
    }

    async create(session: UserSession, domainId: string, dto: CreateRoleData): Promise<Role> {
        const result = await this.prisma.role.create({
            data: {
                roleId: createSlug(dto.name),
                name: dto.name,
                domainId,
            },
        });

        return new Role(result.roleId, result.name);
    }
}
