"use client"

import { Button } from "@/components/ui/button"
import { createCheckin } from "@/lib/api/checkins"
import { tc } from "@/lib/tc"
import { Habit } from "@/types/types"
import { PlusIcon } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

export default function UncheckedHabitCard({ habit }: { habit: Habit }) {
  const [isLoading, startTransition] = useTransition()

  const handleCheckIn = async () => {
    startTransition(async () => {
      const result = await tc(createCheckin(habit))
      if (result.error) {
        toast.error(result.error.message)
        return;
      }

      toast.success("Отметка успешно создана!", {
        description: `Вы успешно создали отметку на привычке \"${habit.name}\"`
      })

    })
  }

  return (
    <div className="flex items-center gap-x-2 border rounded-md p-4">
      <Button size="icon" className="size-7" variant="ghost" title="Отметиться" onClick={handleCheckIn} disabled={isLoading}>
        <PlusIcon />
      </Button>
      <h6 className="font-medium">{habit.name}</h6>
    </div>
  )
}
