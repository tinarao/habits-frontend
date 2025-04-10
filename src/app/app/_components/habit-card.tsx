'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Cog,
  LoaderCircle,
  PenLine,
  Pin,
  Save,
  Star,
  Trash
} from 'lucide-react';
import { toast } from 'sonner';
import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Habit } from '@/types/types';
import { ActivityGrid } from './activity-grid';
import { tc } from '@/lib/tc';
import { changeColor, deleteHabit, renameHabit, togglePin } from '@/lib/api/habits';
import { CheckInButton } from './checkin-button';
import { cn, localizeDate } from '@/lib/utils';
import Link from 'next/link';
import ColorSelector from './color-selector';

interface HabitCardProps {
  habit: Habit;
}

export function HabitCard({ habit }: HabitCardProps) {
  const router = useRouter();
  const [newName, setNewName] = useState(habit.name);
  const [isLoading, startTransition] = useTransition();

  const checkinnedDates = useMemo(
    () =>
      // extra non-null check cuz i don't want this shitfuck to crash the whole app
      (habit.checkIns || []).map((c) => {
        return localizeDate(new Date(c.createdAt));
      }),
    [habit]
  );

  const handlePatchHabit = async () => {
    startTransition(async () => {
      const renameResult = await tc(renameHabit(habit, newName))

      if (renameResult.error) {
        toast.error("Не удалось изменить привычку. Попробуйте снова.")
        return
      }

      toast.success('Привычка успешно изменена!');
      router.refresh();
    });
  };

  const handleChangeColor = async (hex: string) => {
    startTransition(async () => {
      const renameResult = await tc(changeColor(habit, hex))

      if (renameResult.error) {
        toast.error("Не удалось изменить привычку. Попробуйте снова.")
        return
      }

      toast.success('Привычка успешно изменена!');
      router.refresh();
    });
  };

  const handleRemoveHabit = async () => {
    startTransition(async () => {
      const result = await tc(deleteHabit(habit));
      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      toast.success('Привычка переименована!');
      router.refresh();
    });
  };

  const handlePinSwitch = async () => {
    startTransition(async () => {
      const result = await tc(togglePin(habit));
      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      router.refresh();
    });
  };

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link
            href={'/app/habits/' + habit.slug}
            className="hover:text-foreground/70 transition"
          >
            {habit.name}
          </Link>
          <Button
            disabled={isLoading}
            onClick={handlePinSwitch}
            size="icon"
            variant="ghost"
            title={
              habit.isPinned
                ? 'Данная привычка закреплена'
                : 'Нажмите, чтобы закрепить привычку в планировщике'
            }
          >
            {isLoading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Star
                className={cn(
                  'size-4',
                  habit.isPinned
                    ? 'stroke-yellow-400 fill-yellow-400'
                    : 'stroke-stone-300 fill-stone-300'
                )}
              />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityGrid habit={habit} checkedDates={checkinnedDates} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <CheckInButton habit={habit}>Отметиться</CheckInButton>
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Cog />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{habit.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled={isLoading} onClick={handlePinSwitch}>
                <Pin className="size-4" />
                {habit.isPinned ? 'Открепить' : 'Закрепить'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleRemoveHabit}>
                <Trash className="size-4" />
                Удалить
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem>
                  <PenLine /> Редактировать
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать привычку</DialogTitle>
            </DialogHeader>
            <div className="space-y-1">
              <Label>Новое название</Label>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                maxLength={128}
              />
            </div>

            {/* Colors */}
            <div className='space-y-1'>
              <ColorSelector initialColor={habit.checkinsColor} onChange={handleChangeColor} />
            </div>

            <DialogFooter>
              <Button disabled={isLoading} onClick={handlePatchHabit}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Сохраняем...
                  </>
                ) : (
                  <>
                    <Save /> Сохранить
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
