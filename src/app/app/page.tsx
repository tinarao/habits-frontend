import { getMostCheckedHabits } from '@/lib/api/habits';
import { tc } from '@/lib/tc';
import { redirect } from 'next/navigation';
import { HabitCard } from './_components/habit-card';
import TodayHabitsBlock from './_components/today-habits-block';
import { Button } from '@/components/ui/button';
import { List, PlusCircle, PlusIcon } from 'lucide-react';
import CreateHabitDialog from './_components/create-habit-dialog';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export const metadata = {
  "title": "Панель управления"
}

export default async function AppHomePage() {
  const habitsResult = await tc(getMostCheckedHabits());
  if (habitsResult.error) {
    redirect('/start');
  }

  return (
    <div className="grid grid-cols-4 container mx-auto">
      <div className="col-span-3 w-fit">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium pb-4">Ваши любимые привычки</h1>
          {habitsResult.data.length > 0 && (
            <CreateHabitDialog>
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                title="Нажмите, чтобы добавить новую привычку"
              >
                <PlusIcon />
              </Button>
            </CreateHabitDialog>
          )}
        </div>
        <div className="space-y-2">
          {habitsResult.data.length > 0 ? (
            <>
              {habitsResult.data.slice(0, 3).map((h) => (
                <HabitCard habit={h} key={h.id} />
              ))}
              <div className="flex items-center justify-center w-full py-2">
                <Button asChild>
                  <Link href="/app/habits">
                    <List /> Посмотреть все
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <Card className="w-md mx-auto border-dashed">
              <CardHeader className="flex flex-col items-center gap-2 pt-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <PlusCircle className="h-10 w-10 text-muted-foreground/60" />
                </div>
                <CardTitle className="text-xl">Тут пусто!</CardTitle>
                <CardDescription className="text-center">
                  Вы пока не создали ни одной привычки
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center pb-2">
                <div className="h-[1px] w-full bg-border my-2" />
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <CreateHabitDialog>
                  <Button>
                    Добавить первую привычку
                    <PlusCircle className="mr-2 h-4 w-4" />
                  </Button>
                </CreateHabitDialog>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <TodayHabitsBlock />
    </div >
  );
}
