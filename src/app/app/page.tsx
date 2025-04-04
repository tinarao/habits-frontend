import { getMyHabits } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"

export default async function AppHomePage() {
  const { data: habits, error } = await tc(getMyHabits())
  if (error) {
    console.warn(error)
    return redirect("/start")
  }

  console.log(habits)

  return (
    <div className="bg-red-200">
      {habits.map(h => (
        <div key={h.id}>{h.name}</div>
      ))}
    </div>
  )
}
