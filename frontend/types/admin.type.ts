export type Admin = {
  accessToken: string;
  refreshToken: string;
  userId: number;
  isDetailComplete: boolean;
};

export type GymCredential = {
  accessToken: string;
  refreshToken: string;
  gymId: number;
  isDetailComplete: boolean;
};

export type LoginOtpResponse = {
  staffId: number;
};
