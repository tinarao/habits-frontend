'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { createHabit } from '@/lib/api/habits';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { tc } from '@/lib/tc';

const CreateHabitDialog = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitDescription, setNewHabitDescription] = useState('');

  const handleAddHabit = () => {
    startTransition(async () => {
      try {
        if (newHabitName.trim()) {
          const result = await tc(createHabit({
            name: newHabitName,
            description: newHabitDescription
          }))
          if (result.error) {
            toast.error(result.error.message)
            return;
          }

          toast.success("Привычка успешно создана!")
          router.refresh()
          return
        }
      } finally {
        setNewHabitName('');
        setNewHabitDescription('');
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Новая привычка</DialogTitle>
          <DialogDescription>
            Начните отслеживать свои привычки с наглядным визуальным графиком
            активности
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div>
            <Label>
              Название<span className="text-red-500 font-bold">*</span>
            </Label>
            <Input
              required
              maxLength={100}
              placeholder="Название привычки"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
            />
          </div>
          <div>
            <Label>Описание</Label>
            <Input
              maxLength={300}
              placeholder="Описание (необязательно)"
              value={newHabitDescription}
              onChange={(e) => setNewHabitDescription(e.target.value)}
            />
          </div>
        </div>
        <Button disabled={isLoading} onClick={handleAddHabit}>
          Добавить
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHabitDialog;
