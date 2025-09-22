import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSwagger } from './config/swagger.config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { awsConfig } from './config/aws.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.enableCors();
  setUpSwagger(app);
  awsConfig(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
