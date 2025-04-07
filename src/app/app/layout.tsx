import { Button } from "@/components/ui/button"
import { verify } from "@/lib/api/auth"
import { tc } from "@/lib/tc"
import { PlusIcon, Star } from "lucide-react"
import { redirect } from "next/navigation"
import CreateHabitDialog from "./_components/create-habit-dialog"
import { Planner } from "./_components/planner"
import Link from "next/link"
import AccountDropdown from "./_components/account-dropdown"

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await tc(verify())
  if (session.error) {
    return redirect("/start")
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="container mx-auto py-2">
        <div className="flex items-center justify-between bg-stone-100 rounded-md p-4">
          <Button variant="link" asChild>
            <Link href="/app">
              Мои привычки
            </Link>
          </Button>
          <div className="flex items-center gap-x-2">
            <Planner>
              <Star /> Планировщик
            </Planner>
            <CreateHabitDialog>
              <Button variant="outline" size="sm">
                <PlusIcon /> Добавить
              </Button>
            </CreateHabitDialog>
            <AccountDropdown />
          </div>
        </div>
      </header>
      <main className="flex-1 py-4">
        {children}
      </main>
    </div>
  )
}
