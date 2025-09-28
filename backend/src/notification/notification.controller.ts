import { Body, Controller, Get, Post, Req, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Public } from 'src/common/decorators/public.decorator';
import type { AuthenticatedRequest } from 'src/common/request/request';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // Example endpoint to trigger a notification
  @Public()
  @ApiOperation({ summary: 'Trigger a test notification (manual)' })
  @ApiResponse({ status: 200, description: 'Notification sent' })
  @Post('trigger')
  public async triggerNotification(
    @Body() body: { token: string; title?: string; message?: string },
  ) {
    await this.notificationService.sendPush(
      body.token,
      body.title ?? 'title',
      body.message ?? 'body',
    );
    return { ok: true };
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get notifications for  gym' })
  @ApiResponse({ status: 200, description: 'Notifications fetched successfully' })
  @Get()
  public async getNotifications(@Req() req: AuthenticatedRequest) {
    return this.notificationService.getByGymId(req.user['sub']);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark all notifications as read for gym' })
  @ApiResponse({ status: 200, description: 'Marked as read' })
  @Patch('read')
  public markAllRead(@Req() req: AuthenticatedRequest) {
    return this.notificationService.markAllRead(req.user['sub']);
  }
}
