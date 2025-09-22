export type Statistics = {
    totalMembers:number,
    revenue: number,
    currentMonth:string
    activeMembers:number,
    newMembers:number,
    revenueIncrease: number,
    memberIncrease: number,
    prevMonthMembersCount: number,
    prevMonthRevenue: number,
}

export type RevanueData = {
    totalRevanue:number,
    monthlyRevenues:Revanue[],
}

export type Revanue = {
    month:string,
    revanue:number,
}