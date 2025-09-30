import { CreateMemberDto } from './create-member.dto';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateMemberDto extends PartialType(OmitType(CreateMemberDto, ['planId'])) {}
