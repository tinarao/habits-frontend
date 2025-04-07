import { getHabitDetails } from "@/lib/api/habits";
import { tc } from "@/lib/tc";
import { redirect } from "next/navigation";
import { HabitCard } from "../../_components/habit-card";

type HPProps = {
  params: Promise<{
    habitSlug: string
  }
  >
}
export default async function HabitPage({ params }: HPProps) {
  const { habitSlug } = await params;
  const { data: habit, error } = await tc(getHabitDetails(habitSlug))
  if (error) {
    redirect("/app")
  }

  return (
    <div className="container mx-auto">
      <HabitCard habit={habit} />
    </div>
  )
}
