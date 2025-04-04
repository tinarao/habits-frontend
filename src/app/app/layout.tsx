import { Button } from "@/components/ui/button"
import { verify } from "@/lib/api/auth"
import { tc } from "@/lib/tc"
import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"
import CreateHabitDialog from "./_components/create-habit-dialog"

export default async function AppLayout({ children }: React.PropsWithChildren) {
  const session = await tc(verify())
  if (session.error) {
    return redirect("/start")
  }

  return (
    <div>
      <header className="border-b py-2">
        <div>
          <Button>
            Мои привычки
          </Button>
          <CreateHabitDialog>
            <Button>
              <PlusIcon /> Добавить
            </Button>
          </CreateHabitDialog>
        </div>
      </header>
      {children}
    </div>
  )
}
