import { getMyHabits } from "@/lib/api/habits"
import { tc } from "@/lib/tc"
import { redirect } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckSquare, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function HabitsPage() {
  const { data: habits, error } = await tc(getMyHabits())
  if (error) {
    return redirect("/app")
  }

  return (
    <div className="grid grid-cols-4 container mx-auto gap-3">
      {habits.map(h => {
        const formattedDate = Intl.DateTimeFormat("ru", {
          dateStyle: "medium",
          timeStyle: "medium"
        }).format(new Date(h.createdAt))

        return (
          <Card key={h.id}>
            <CardHeader>
              <CardTitle>{h.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="*:text-sm *:text-muted-foreground *:font-medium">
                <p className="flex items-center gap-x-2"><Clock className="size-4" /> {formattedDate}</p>
                <p className="flex items-center gap-x-2"><CheckSquare className="size-4" /> {h.checkIns.length}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button size="sm" asChild>
                <Link href={"/app/habits/" + h.slug}>
                  <ArrowRight /> Перейти
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
