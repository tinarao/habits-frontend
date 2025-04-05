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
  Save,
  Trash,
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
import { deleteHabit, renameHabit } from '@/lib/api/habits';
import { CheckInButton } from './checkin-button';

interface HabitCardProps {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  const router = useRouter();
  const [newName, setNewName] = useState(habit.name);
  const [isLoading, startTransition] = useTransition();

  const checkinnedDates = useMemo(() => habit.checkIns.map((c) => new Date(c.createdAt)), [habit])

  const handleRenameHabit = async () => {
    startTransition(async () => {
      const result = await tc(renameHabit(habit, newName));
      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      toast.success("Привычка переименована!");
      router.refresh();
    });
  };

  const handleRemoveHabit = async () => {
    startTransition(async () => {
      const result = await tc(deleteHabit(habit));
      if (result.error) {
        toast.error(result.error.message)
        return
      }

      toast.success("Привычка переименована!")
      router.refresh();
    });
  };

  // const handlePinSwitch = async () => {
  //   startTransition(async () => {
  //     const result = await switchHabitPin(habit.id);
  //     if (!result.ok) {
  //       toast.error(result.message);
  //       return;
  //     }
  //
  //     toast.success(result.message);
  //     router.refresh();
  //   });
  // };

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {habit.name}
          {/*   <Button */}
          {/*     disabled={isLoading} */}
          {/*     onClick={handlePinSwitch} */}
          {/*     size="icon" */}
          {/*     variant="ghost" */}
          {/*     title={ */}
          {/*       habit.isPinned */}
          {/*         ? 'Данная привычка закреплена' */}
          {/*         : 'Нажмите, чтобы закрепить привычку в планировщике' */}
          {/*     } */}
          {/*   > */}
          {/*     {isLoading ? ( */}
          {/*       <LoaderCircle className="size-4 animate-spin" /> */}
          {/*     ) : ( */}
          {/*       <Star */}
          {/*         className={cn( */}
          {/*           'size-4', */}
          {/*           habit.isPinned */}
          {/*             ? 'stroke-yellow-400 fill-yellow-400' */}
          {/*             : 'stroke-stone-300 fill-stone-300' */}
          {/*         )} */}
          {/*       /> */}
          {/*     )} */}
          {/*   </Button> */}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityGrid habit={habit} checkedDates={checkinnedDates} />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <CheckInButton habit={habit}>
          Отметиться
        </CheckInButton>
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
              {/* <DropdownMenuItem disabled={isLoading} onClick={handlePinSwitch}> */}
              {/*   <Pin className="size-4" /> */}
              {/*   {habit.isPinned ? 'Открепить' : 'Закрепить'} */}
              {/* </DropdownMenuItem> */}
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
            <DialogFooter>
              <Button disabled={isLoading} onClick={handleRenameHabit}>
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
