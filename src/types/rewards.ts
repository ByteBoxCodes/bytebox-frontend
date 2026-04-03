export interface IUserReward {
  id: string;
  name: string;
  type: "XP" | "TITLE" | "AVATAR" | "CARD" | string;
  value: string;
  conditionType: string;
  conditionValue: number;
  conditionType2?: string;
  conditionValue2?: number;
  eligible: boolean;
  claimed: boolean;
  equipped: boolean;
}
