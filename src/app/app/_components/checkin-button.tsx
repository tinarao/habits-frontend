import { Button } from "@/components/ui/button";
import { createCheckin } from "@/lib/api/checkins";
import { tc } from "@/lib/tc";
import { Habit } from "@/types/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

type CheckInButtonProps = React.PropsWithChildren & {
  afterCheckin?: () => void
  habit: Habit
}

export function CheckInButton({ children, afterCheckin, habit }: CheckInButtonProps) {
  const [isLoading, startTransition] = useTransition()
  const router = useRouter()

  async function handleCheckin() {
    startTransition(async () => {
      const result = await tc(createCheckin(habit))
      if (result.error) {
        toast.error(result.error.message)
        return
      }

      afterCheckin?.()
      router.refresh()
    })
  }

  return (
    <Button onClick={handleCheckin} disabled={isLoading}>
      {children}
    </Button>
  )
}
