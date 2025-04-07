import { getHabitsWithoutTodayCheckin } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"
import UncheckedHabitCard from "./unchecked-habit-card"
import CheckCircle from "@/assets/check-circle.svg"
import Image from "next/image"

export default async function TodayHabitsBlock() {
  const { data: habits, error } = await tc(getHabitsWithoutTodayCheckin())
  if (error) {
    console.warn(error)
    redirect("/start")
  }

  return (
    <div className="bg-neutral-50 rounded-md h-fit p-4">
      <div>
        <h2 className="text-xl font-medium">Задачи на сегодня</h2>
        <p className="text-sm font-medium text-muted-foreground">
          Отметьтесь сегодня, чтобы не потерять прогресс
        </p>
      </div>
      {habits.slice(0, 3).length > 0 ? (
        <div className="space-y-2 pt-2">
          {habits.map(h => (
            <UncheckedHabitCard key={h.id} habit={h} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center pt-4">
          <Image src={CheckCircle} alt="Сегодня Вы отметились на всех привычках!" width={75} />
          <h6 className="font-medium text-muted-foreground">Тут пусто!</h6>
        </div>
      )}
    </div>
  )
}
