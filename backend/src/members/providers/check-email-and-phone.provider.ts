import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Member } from '../entities/member.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CheckEmailAndPhoneProvider {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}
  async emailExists(email: string): Promise<boolean> {
    const count = await this.memberRepository.count({
      where: { email },
    });
    return count > 0;
  }

  async phoneExists(phone: string): Promise<boolean> {
    const count = await this.memberRepository.count({
      where: { phone },
    });
    return count > 0;
  }
}
