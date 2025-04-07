import { getMyHabits } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"
import { HabitCard } from "../_components/habit-card"
import Breadcrumbs from "../_components/breadcrumbs"

export default async function HabitsPage() {
  const { data: habits, error } = await tc(getMyHabits())
  if (error) {
    return redirect("/app")
  }

  return (
    <div className="container mx-auto">
      <Breadcrumbs links={[{ label: "Привычки", url: "/app/habits" }]} />
      <div className="w-fit mx-auto">
        {habits.map(h => (
          <HabitCard key={h.id} habit={h} />
        ))}
      </div>
    </div>
  )
}
