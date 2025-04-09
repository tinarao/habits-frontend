"use client"

import { Grid } from "@/lib/grid"
import { cn } from "@/lib/utils"
import { Habit } from "@/types/types"
import { memo, useMemo } from "react"

type CICProps = {
  date: Date
  isCheckedIn: boolean
  color: string
}

type AGProps = {
  habit: Habit
  checkedDates: Date[]
}

const CheckInCell = memo(
  function Cell({ date, isCheckedIn, color }: CICProps) {
    const title = Intl.DateTimeFormat('ru', {
      dateStyle: "long"
    }).format(date)

    return (
      <div style={{ backgroundColor: isCheckedIn ? color : "#d6d3d1" }} title={title} className={cn(
        isCheckedIn ? "bg-green-500" : "bg-stone-300",
        'size-3 rounded-xs transition-transform hover:scale-125 cursor-pointer'
      )} />
    )
  }
)

export function ActivityGrid({ habit, checkedDates }: AGProps) {
  const grid = useMemo(() => Grid.init(habit.createdAt), [habit])

  const checkedDatesSet = useMemo(() => {
    return new Set(
      checkedDates.map((date) => date.toISOString().split('T')[0])
    );
  }, [checkedDates]);

  return (
    <div className="grid grid-cols-52 gap-1">
      {grid.map(day => {
        const isCheckedIn = checkedDatesSet.has(
          day.date.toISOString().split('T')[0]
        )

        return (
          <CheckInCell color={habit.checkinColor} key={day.date.toISOString()} date={day.date} isCheckedIn={isCheckedIn} />
        )
      })}
    </div>
  )
}
