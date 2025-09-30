export interface SubscriptionState {
  plans: SubscriptionPlan[];
  currentPlan: string | null;
  loading: boolean;
  selectedPlan: string | null;
}

export type Payment = {
  date: Date;
  amount: number;
  plan: string;
  id: number;
};

export type PaymentData = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  publishableKey: string;
};

export type SubscriptionPlan = {
  id: number;
  name: string;
  price: number;
  billingCycle: string;
  maxMembers: string;
  workoutPlans: number;
  isActive: boolean;
};
