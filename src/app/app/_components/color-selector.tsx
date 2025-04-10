"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"

const COLORS = [
  {
    label: "Розовый",
    hex: "#ff2056"
  },
  {
    label: "Красный",
    hex: "#fb2c36"
  },
  {
    label: "Фиолетовый",
    hex: "#8e51ff"
  },
  {
    label: "Оранжевый",
    hex: "#ff6900"
  },
  {
    label: "Жёлтый",
    hex: "#f0b100"
  },
  {
    label: "Зелёный",
    hex: "#00c951"
  },
  {
    label: "Синий",
    hex: "#2b7fff"
  },
  {
    label: "Фуксия",
    hex: "#e12afb"
  }
]

type CSProps = {
  initialColor: string
  onChange?: (hex: string) => void
}

export default function ColorSelector({ initialColor, onChange }: CSProps) {
  const [color, setColor] = useState(initialColor)
  return (
    <div className='grid grid-cols-8 gap-x-1 h-fit'>
      {COLORS.map((c, i) => (
        <div
          key={i}
          title={c.label}
          style={{ backgroundColor: c.hex }}
          onClick={() => {
            setColor(c.hex)
            onChange?.(c.hex)
          }}
          className={cn('rounded-2xl aspect-square hover:opacity-50 transition',
            color == c.hex ? "border-2 shadow-lg shadow-black/30 border-neutral-500" : ""
          )}
        />
      ))}
    </div>
  )
}

