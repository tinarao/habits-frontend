import { getMyHabits } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"
import { HabitCard } from "./_components/habit-card"

export default async function AppHomePage() {
  const habitsResult = await tc(getMyHabits())

  if (habitsResult.error) {
    redirect("/start")
  }

  return (
    <div className="w-fit mx-auto space-y-2">
      <h1 className="text-xl font-medium pb-4">Ваши привычки</h1>
      {habitsResult.data.map(h => (
        <HabitCard habit={h} key={h.id} />
      ))}
    </div>
  )
}
