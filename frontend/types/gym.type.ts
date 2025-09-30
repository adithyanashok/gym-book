import { PlanData } from "./plan.type";
import { SubscriptionPlan } from "./subsctiption.type";

export type Gym = {
  id: number;
  username: string;
  user_phone: string;
  user_email: string;
  gym_name: string;
  plans: PlanData[];
  subscriptionPlan: SubscriptionPlan;
};

export type GymData = {
  username: string;
  user_email: string;
  gym_name: string;
  plans: PlanData[];
};
export type VerifyOtpData = {
  otp: number;
  gymId: number;
  fcm_token: string;
};

export type EditGymType = {
  username: string;
  user_email: string;
  gym_name: string;
};
