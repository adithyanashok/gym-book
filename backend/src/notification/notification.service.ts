import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import * as admin from 'firebase-admin';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { ApiResponse } from 'src/common/dtos/api-response.dto';

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);
  private static readonly MAX_TIMEOUT_MS = 2147483647; // ~24.8 days

  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  public async sendPush(
    token: string,
    title: string,
    body: string,
    options?: { gymId?: number; memberId?: number; type?: string; persist?: boolean },
  ) {
    try {
      if (!token) {
        this.logger.warn('No FCM token provided for push notification');
        return;
      }

      const response = await admin.messaging().send({
        token,
        android: {
          notification: {
            title,
            body,
            sound: 'default',
            color: '#0000FF',
            channelId: 'default',
          },
        },
      });
      this.logger.log(`FCM sent: ${response}`);
      if (options?.persist && options?.gymId) {
        const record: Notification = this.notificationRepository.create({
          title,
          body,
          gym: { id: options.gymId } as unknown as Notification['gym'],
          member: options.memberId
            ? ({ id: options.memberId } as unknown as Notification['member'])
            : null,
          sentAt: new Date(),
          type: options.type ?? 'membership_expired',
        });
        await this.notificationRepository.save(record);
      }
    } catch (error) {
      this.logger.error('Failed to send push', error as Error);
      throw error;
    }
  }

  public scheduleOneTimeNotification(
    name: string,
    when: Date,
    token: string,
    title: string,
    body: string,
    options?: { gymId?: number; memberId?: number },
  ) {
    try {
      const targetMs = new Date(when).getTime();
      const delayMs = targetMs - Date.now();

      if (isNaN(delayMs) || delayMs <= 0) {
        this.logger.warn(`Skip scheduling '${name}' because time is in the past`);
        return;
      }

      // If an existing timeout with the same name exists, remove it first
      this.cancelScheduled(name);

      const scheduleChunk = (remainingMs: number) => {
        const chunk = Math.min(remainingMs, NotificationService.MAX_TIMEOUT_MS);
        const timeout = setTimeout(() => {
          const newRemaining = targetMs - Date.now();
          if (newRemaining > 0) {
            // Re-schedule next chunk
            this.schedulerRegistry.deleteTimeout(name);
            scheduleChunk(newRemaining);
            return;
          }
          // Final fire
          this.sendPush(token, title, body, {
            gymId: options?.gymId,
            memberId: options?.memberId,
            type: 'membership_expired',
            persist: true,
          })
            .catch((err: unknown) => this.logger.error('Scheduled push failed', err as Error))
            .finally(() => this.cancelScheduled(name));
        }, chunk);

        this.schedulerRegistry.addTimeout(name, timeout);
        this.logger.log(
          `Scheduled '${name}' in ${Math.round(chunk / 1000)}s (remaining ~${Math.max(0, Math.round((remainingMs - chunk) / 1000))}s)`,
        );
      };

      scheduleChunk(delayMs);
    } catch (error) {
      this.logger.error('Failed to schedule notification', error as Error);
      throw error;
    }
  }

  public cancelScheduled(name: string) {
    try {
      const exists = this.schedulerRegistry.doesExist('timeout', name);
      if (exists) {
        const handle = this.schedulerRegistry.getTimeout(name) as unknown as NodeJS.Timeout;
        clearTimeout(handle);
        this.schedulerRegistry.deleteTimeout(name);
        this.logger.log(`Cancelled scheduled timeout '${name}'`);
      }
    } catch {
      // ignore if not found
    }
  }

  public async getByGymId(gymId: number) {
    try {
      const items = await this.notificationRepository.find({
        where: { gym: { id: gymId } },
        order: { createdAt: 'DESC' },
      });
      return new ApiResponse(true, 'Notifications fetched successfully!', items);
    } catch (error) {
      this.logger.error('Failed to fetch notifications', error as Error);
      throw error;
    }
  }

  public async markAllRead(gymId: number) {
    try {
      await this.notificationRepository
        .createQueryBuilder()
        .update(Notification)
        .set({ readAt: () => 'CURRENT_TIMESTAMP' })
        .where('"gymId" = :gymId AND readAt IS NULL', { gymId })
        .execute();
      return new ApiResponse(true, 'Notifications marked as read!', null);
    } catch (error) {
      this.logger.error('Failed to mark notifications as read', error as Error);
      throw error;
    }
  }
}
