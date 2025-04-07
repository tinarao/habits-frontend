import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getPinned } from "@/lib/api/habits";
import { tc } from "@/lib/tc";
import Link from "next/link";

export async function Planner({ children }: React.PropsWithChildren) {
  const { data: pinned, error } = await tc(getPinned())
  if (error) {
    return
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>
              Закреплённые привычки
            </Label>
            {pinned.map((habit) => (
              <Button
                asChild
                key={habit.id}
                className="w-full justify-start"
                variant="outline"
                size="lg"
              >
                <Link href={"/app/habit/" + habit.slug}>
                  {habit.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
