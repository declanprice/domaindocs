import { WorkAreasService } from './work-areas.service';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthSession, UserSession } from '../../auth/auth-session';

@Controller('work-areas')
@UseGuards(AuthGuard)
export class WorkAreasController {
    constructor(readonly workAreaService: WorkAreasService) {}

    @Get('/')
    async search(@AuthSession() session: UserSession) {}

    @Post('/')
    async create(@AuthSession() session: UserSession, @Body() data: any) {}

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
