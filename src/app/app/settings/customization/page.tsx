'use client';

import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { HabitCard } from '../../_components/habit-card';
import { mockHabit } from '@/lib/mocks';
import { Habit } from '@/types/types';

export default function CustomizationPage() {
  const [color, setColor] = useState('#aabbcc');

  return (
    <div>
      <HabitCard habit={mockHabit} />
      <HexColorPicker color={color} onChange={setColor} />
    </div>
  );
}
