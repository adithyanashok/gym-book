import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './members/members.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import { PlanModule } from './plans/plan.module';
import { AmountsModule } from './amounts/amounts.module';
import { RevanueModule } from './revanue/revanue.module';
import { AuthModule } from './auth/auth.module';
import { StaffsModule } from './staffs/staffs.module';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { StatisticsModule } from './statistics/statistics.module';
import { RedisModule } from './redis/redis.module';
import { UploadModule } from './upload/upload.module';
import { GymModule } from './gym/gym.module';
import { Gym } from './gym/entities/gym.entity';
import { Plan } from './plans/entities/plan.entity';
import { Member } from './members/entities/member.entity';
import { MembershipController } from './membership/membership.controller';
import { MembershipModule } from './membership/membership.module';
import { Membership } from './membership/entities/membership.entity';
import { NotificationModule } from './notification/notification.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Notification } from './notification/entities/notification.entity';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionPlan } from './subscription/entities/subscription-plans';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
    }),

    ScheduleModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [Gym, Plan, Member, Membership, Notification, SubscriptionPlan],
        // autoLoadEntities: configService.get('database.autoLoadEntities'),
        synchronize: configService.get('database.synchronize'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.name'),
      }),
    }),
    MembersModule,
    PlanModule,
    AmountsModule,
    RevanueModule,
    AuthModule,
    StaffsModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    StatisticsModule,
    RedisModule,
    UploadModule,
    GymModule,
    MembershipModule,
    NotificationModule,
    SubscriptionModule,
  ],
  controllers: [AppController, MembershipController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
