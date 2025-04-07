import { getMyHabits } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"
import { HabitCard } from "./_components/habit-card"
import TodayHabitsBlock from "./_components/today-habits-block"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import CreateHabitDialog from "./_components/create-habit-dialog"

export default async function AppHomePage() {
  const habitsResult = await tc(getMyHabits())

  if (habitsResult.error) {
    redirect("/start")
  }

  return (
    <div className="grid grid-cols-4 container mx-auto">
      <div className="col-span-3 w-fit">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium pb-4">Ваши привычки</h1>
          <CreateHabitDialog>
            <Button variant="ghost" size="icon" className="size-6" title="Нажмите, чтобы добавить новую привычку">
              <PlusIcon />
            </Button>
          </CreateHabitDialog>
        </div>
        <div className="space-y-2">
          {habitsResult.data.slice(0, 3).map(h => (
            <HabitCard habit={h} key={h.id} />
          ))}
        </div>
      </div>
      <TodayHabitsBlock />
    </div>
  )
}
