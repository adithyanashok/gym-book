import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import * as admin from 'firebase-admin';
import { ConfigService } from '@nestjs/config';
import firebaseCred from '../../firebase-cred.json';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
@Module({
  providers: [NotificationService],
  controllers: [NotificationController],
  imports: [TypeOrmModule.forFeature([Notification])],
  exports: [NotificationService, TypeOrmModule],
})
export class NotificationModule {
  constructor(private configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseCred as admin.ServiceAccount),
    });
  }
}
