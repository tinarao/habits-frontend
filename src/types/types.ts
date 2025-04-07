export type Plan = 'free' | 'advanced';

export type Habit = {
  id: number;
  name: string;
  slug: string;
  remind: boolean;
  description: string | null;
  isPinned: boolean;
  checkIns: CheckIn[];
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CheckIn = {
  id: number;
  habit: Habit;
  habitId: number;
  user: User;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export type User = {
  id: number;
  habits: Habit[];
  checkIns: CheckIn[];
  plan: Plan;
  provider: string;
  nickname: string | null;
  name: string | null;
  email: string;
  imageUrl: string | null;
  refreshToken: string | null;
  refreshTokenExpires: Date;
  createdAt: Date;
  updatedAt: Date;
}
