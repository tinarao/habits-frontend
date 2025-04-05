import { getMyHabits } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"
import { HabitCard } from "./_components/habit-card"

export default async function AppHomePage() {
  const { data: habits, error } = await tc(getMyHabits())
  if (error) {
    console.warn(error)
    return redirect("/start")
  }

  return (
    <div className="w-fit mx-auto space-y-2">
      {habits.map(h => (
        <HabitCard key={h.id} habit={h} />
      ))}
    </div>
  )
}
