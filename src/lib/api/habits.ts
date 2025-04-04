"use server"

import { Habit } from "@/types/types"
import { ErrorResponse, getApiRoute } from "."
import { getSessionToken } from "./auth"
import { CreateHabitDto, createHabitSchema } from "../validation/habit"

type CreateDTO = {
  name: string
  description?: string
}

export async function getMyHabits() {
  const token = await getSessionToken()
  if (!token) {
    throw new Error("Unauthorized")
  }

  const route = getApiRoute("/api/habits")
  const response = await fetch(route, {
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  const data: { habits: Habit[] } = await response.json()
  return data.habits
}

export async function createHabit(dto: CreateHabitDto) {
  const token = await getSessionToken()
  if (!token) {
    throw new Error("Unauthorized")
  }

  const { data, error, success } = await createHabitSchema.safeParseAsync(dto)
  if (!success) {
    throw new Error(error.errors[0].message)
  }

  const route = getApiRoute("/api/habits")
  const response = await fetch(route, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  }
  )

  const resData = await response.json()
  if (!response.ok) {
    const err: ErrorResponse = resData;
    const message = err.error ?? "Не удалось добавить привычку."
    throw new Error(message)
  }
}
