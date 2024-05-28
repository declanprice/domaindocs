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

    @Get('/:areaId/board')
    async getBoard(@AuthSession() session: UserSession, @Param('domainId') domainId: string) {
        return this.workAreaService.getBoard(session, domainId);
    }

    @Post('/')
    async create(
        @AuthSession() session: UserSession,
        @Param('domainId') domainId: string,
        @Body() data: CreateWorkAreaData,
    ) {
        return this.workAreaService.create(session, domainId, data);
    }

    @Post('/:areaId')
    async createColumn(@AuthSession() session: UserSession, @Body() data: any) {}

    @Post('/:areaId')
    async createItem(@AuthSession() session: UserSession, @Body() data: any) {}

    @Post('/:areaId/:itemId/move')
    async moveColumn(@AuthSession() session: UserSession, @Body() data: any) {}

    @Post('/:areaId/:itemId/description')
    async updateItemDescription(@AuthSession() session: UserSession, @Body() data: any) {}

    @Post('/:areaId/:itemId/assignees')
    async updateAssignees(@AuthSession() session: UserSession, @Body() data: any) {}

    @Post('/:areaId/:itemId/type')
    async updateType(@AuthSession() session: UserSession, @Body() data: any) {}

    @Delete('/:areaId/:itemId')
    async deleteItem(@AuthSession() session: UserSession, @Body() data: any) {}
}
