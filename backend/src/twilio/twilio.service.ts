// src/twilio/twilio.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly client: twilio.Twilio;
  private readonly logger = new Logger(TwilioService.name);

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials not found');
    }

    this.client = twilio(accountSid, authToken);
  }

  async sendSMS(to: string, body: string): Promise<boolean> {
    try {
      const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');

      await this.client.messages.create({
        from,
        to,
        body,
      });

      this.logger.log(`SMS sent successfully to ${to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send SMS to ${to}:`, error);
      return false;
    }
  }

  async sendOTP(to: string, otp: string): Promise<boolean> {
    const message = `Your verification code is: ${otp}. This code will expire in 1 minutes.`;
    return this.sendSMS(to, message);
  }
}
