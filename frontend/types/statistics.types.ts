export type Statistics = {
  currentMonthData: CurrentMonthData;
  prevMonthData: PrevMonthData;
  totalMembers: number;
};
type CurrentMonthData = {
  revenue: number;
  currentMonth: string;
  revenueIncrease: number;
  memberIncrease: number;
  activeMembers: number;
  newMembers: number;
};

type PrevMonthData = {
  prevMonthMembersCount: number;
  prevMonthRevenue: number;
};
export type RevanueData = {
  totalRevanue: number;
  monthlyRevenues: Revanue[];
};

export type Revanue = {
  month: string;
  revanue: number;
};
