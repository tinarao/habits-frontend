import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getPinned } from "@/lib/api/habits";
import { tc } from "@/lib/tc";

export async function Planner({ children }: React.PropsWithChildren) {
  const { data: pinned, error } = await tc(getPinned())
  if (error) {
    console.warn(error)
    return
  }


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          {children}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="space-y-4">
          <div className="space-y-2">
            {pinned.map((habit) => (
              <Button
                key={habit.id}
                className="w-full justify-start"
                variant="outline"
                size="lg"
              >
                {habit.name}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
