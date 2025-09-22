import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MembersModule } from 'src/members/members.module';

@Module({
  imports: [MembersModule],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
