import { WorkAreasService } from './work-areas.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';
import {
    CreateWorkAreaData,
    UpdateItemAssigneesData,
    UpdateItemParentData,
    UpdateItemTypeData,
} from '@domaindocs/types';

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
        @Param('areaId') areaId: string,
    ) {
        return this.workAreaService.getArea(session, domainId, areaId);
    }

    @Get('/:areaId/people')
    async searchAreaPeople(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
    ) {
        return this.workAreaService.searchAreaPeople(session, domainId, areaId);
    }

    @Get('/:areaId/board')
    async getBoard(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
    ) {
        return this.workAreaService.getBoard(session, domainId, areaId);
    }

    @Get('/:areaId/items')
    async searchItems(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
    ) {
        return this.workAreaService.searchItems(session, domainId, areaId);
    }

    @Get('/:areaId/items/:itemId')
    async getItem(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
        @Param('itemId') itemId: string,
    ) {
        return this.workAreaService.getItem(session, domainId, areaId, itemId);
    }

    @Get('/:areaId/items/:itemId/available-parents')
    async getItemParents(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
        @Param('itemId') itemId: string,
    ) {
        return this.workAreaService.getAvailableParents(session, domainId, areaId, itemId);
    }

    @Post('/:areaId/items/:itemId/assignees')
    async updateAssignees(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
        @Param('itemId') itemId: string,
        @Body() data: UpdateItemAssigneesData,
    ) {
        return this.workAreaService.updateAssignees(session, domainId, areaId, itemId, data);
    }

    @Post('/:areaId/items/:itemId/parent')
    async updateParent(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
        @Param('itemId') itemId: string,
        @Body() data: UpdateItemParentData,
    ) {
        return this.workAreaService.updateParent(session, domainId, areaId, itemId, data);
    }

    @Post('/:areaId/items/:itemId/type')
    async updateType(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Param('areaId') areaId: string,
        @Param('itemId') itemId: string,
        @Body() data: UpdateItemTypeData,
    ) {
        return this.workAreaService.updateType(session, domainId, areaId, itemId, data);
    }
}
