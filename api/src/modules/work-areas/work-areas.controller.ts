import { WorkAreasService } from './work-areas.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import { CreateWorkAreaData } from '@domaindocs/types';

@Controller('domains/:domainId/work-areas')
@UseGuards(AuthGuard)
export class WorkAreasController {
    constructor(readonly workAreaService: WorkAreasService) {}

    @Get('/')
    async search(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.workAreaService.search(session, domainId);
    }

    @Post('/')
    async create(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateWorkAreaData,
    ) {
        return this.workAreaService.create(session, domainId, data);
    }

    @Get('/:areaId')
    async getArea(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('workAreaId') workAreaId: string,
    ) {
        return this.workAreaService.getArea(session, domainId, workAreaId);
    }

    @Get('/:areaId/board')
    async getBoard(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('workAreaId') workAreaId: string,
    ) {
        return this.workAreaService.getBoard(session, domainId, workAreaId);
    }

    @Get('/:areaId/items')
    async searchItems(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('workAreaId') workAreaId: string,
    ) {
        return this.workAreaService.searchItems(session, domainId, workAreaId);
    }

    @Get('/:areaId/items/:itemId')
    async getItem(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('workAreaId') workAreaId: string,
        @Param('itemId') itemId: string,
    ) {
        return this.workAreaService.getItem(session, domainId, workAreaId, itemId);
    }
}
