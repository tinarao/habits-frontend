"use client"

import { Grid } from "@/lib/grid"
import { cn } from "@/lib/utils"
import { Habit } from "@/types/types"
import { useMemo } from "react"

type CICProps = {
  date: Date
  isCheckedIn: boolean
}

type AGProps = {
  habit: Habit
  checkedDates: Date[]
}

function CheckInCell({ date, isCheckedIn }: CICProps) {
  const title = Intl.DateTimeFormat('ru', {
    dateStyle: "long"
  }).format(date)

  return (
    <div title={title} className={cn(
      isCheckedIn ? "bg-green-500" : "bg-stone-300",
      'size-3 transition-transform hover:scale-125 cursor-pointer'
    )} />
  )
}

export function ActivityGrid({ habit, checkedDates }: AGProps) {
  const grid = useMemo(() => Grid.init(new Date()), [habit])

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
          <CheckInCell key={day.date.toISOString()} date={day.date} isCheckedIn={isCheckedIn} />
        )
      })}
    </div>
  )
}
