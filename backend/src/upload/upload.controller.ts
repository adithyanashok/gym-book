import {
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiHeaders } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('upload')
export class UploadController {
  constructor(
    /**
     * Injecting uploadService
     */
    private readonly uploadService: UploadService,
  ) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiHeaders([{ name: 'Content-Type', description: 'multipart/form-data' }])
  @Patch('/upload-member-image/:id')
  public async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseIntPipe) id: number,
  ) {
    console.log('file', file);
    return await this.uploadService.uploadFile(id, file);
  }
}
