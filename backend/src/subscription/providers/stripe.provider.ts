import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeProvider {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY') as string);
  }

  public async createCustomer(email: string, name: string, phone: string, amount: number) {
    const customer = await this.stripe.customers.create({
      email,
      name,
      phone,
    });

    const ephemeralKey = await this.stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2022-08-01' },
    );
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,

      currency: 'inr',
      customer: customer.id,

      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
      publishableKey: this.configService.get<string>('STRIPE_PK') as string,
    };
  }
}
