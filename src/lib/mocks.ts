import { Habit } from "@/types/types";

export const mockHabit: Habit = {
  id: 12312,
  slug: '',
  remind: false,
  isPinned: false,
  userId: 1,
  name: 'Daily Exercise',
  description: 'Stay fit and healthy',
  checkinColor: '#4CAF50',
  createdAt: new Date(),
  updatedAt: new Date(),
  checkIns: [
    {
      id: 1,
      habitId: 12312,
      createdAt: new Date(),
      userId: 14,
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 3,
      habitId: 12312,
      createdAt: new Date(),
      userId: 14,
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 4,
      habitId: 12312,
      createdAt: new Date('2024-01-02'),
      userId: 14,
      updatedAt: new Date('2024-01-02'),
    },
  ],
};
