import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config } from 'aws-sdk';

export const awsConfig = (app: INestApplication) => {
  const configService = app.get(ConfigService);

  config.update({
    credentials: {
      accessKeyId: configService.get<string>('appConfig.awsAccessKeyId')!,
      secretAccessKey: configService.get<string>('appConfig.awsSecretAccessKey')!,
    },
    region: configService.get<string>('appConfig.awsRegion')!,
  });
};
