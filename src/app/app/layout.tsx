import { Button } from "@/components/ui/button"
import { verify } from "@/lib/api/auth"
import { tc } from "@/lib/tc"
import { Star } from "lucide-react"
import { redirect } from "next/navigation"
import { Planner } from "./_components/planner"
import Link from "next/link"
import AccountDropdown from "./_components/account-dropdown"

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await tc(verify())
  if (session.error || !session.data) {
    return redirect("/start")
  }

  return (
    <div className="flex flex-col h-screen">
      <header className="container mx-auto py-2">
        <div className="flex items-center justify-between bg-neutral-50 rounded-md p-4">
          <Button variant="link" asChild>
            <Link href="/app">
              Мои привычки
            </Link>
          </Button>
          <div className="flex items-center gap-x-2">
            {session && (
              <Planner>
                <Button title="Нажмите, чтобы посмотреть на закреплённые привычки" size="icon" variant="outline">
                  <Star />
                </Button>
              </Planner>
            )}
            {session && (
              <AccountDropdown />
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 py-4">
        {session && children}
      </main>
    </div>
  )
}
