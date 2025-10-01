import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import * as path from 'path';
import { MembersService } from 'src/members/members.service';
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class UploadService {
  constructor(
    /**
     * Injecting dataSource
     */
    private readonly memberService: MembersService,
    private readonly configService: ConfigService,
  ) {}

  public async uploadFile(id: number, file: Express.Multer.File) {
    if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
      throw new BadRequestException('Only jpeg, jpg and png supported');
    }
    const s3 = new S3();

    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName')!,
          Body: file.buffer,
          Key: this.generateFileName(file.originalname),
          ContentType: file.mimetype,
        })
        .promise();

      const response = await this.memberService.updateById(id, { image: uploadResult.Location });

      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public generateFileName(originalName: string): string {
    const name: string = originalName.split('.')[0];

    name.replace(/\s/g, '');

    const extension = path.extname(originalName);

    const timestamp = new Date().getTime().toString().trim();

    return `${name}-${timestamp}-${uuid4()}-${extension}`;
  }
}
