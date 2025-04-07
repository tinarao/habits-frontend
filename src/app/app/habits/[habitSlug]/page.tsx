import { getHabitDetails } from "@/lib/api/habits";
import { tc } from "@/lib/tc";
import { redirect } from "next/navigation";
import { HabitCard } from "../../_components/habit-card";
import Breadcrumbs from "../../_components/breadcrumbs";

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
      <Breadcrumbs links={[{ label: "Привычки", url: "/app/habits" }, { url: `/app/habits/${habit.slug}`, label: habit.name }]} />
      <HabitCard habit={habit} />
    </div>
  )
}
