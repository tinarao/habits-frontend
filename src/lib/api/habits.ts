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

export async function deleteHabit(habit: Habit) {
  const token = await getSessionToken()
  const route = getApiRoute("/api/habits/" + habit.slug)
  const response = await fetch(route, {
    method: "DELETE",
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  if (!response.ok) {
    const resData = await response.json()
    const err: ErrorResponse = resData;
    const message = err.error ?? "Не удалось удалить привычку."
    throw new Error(message)
  }
}

export async function renameHabit(habit: Habit, newName: string) {
  const token = await getSessionToken()
  const route = getApiRoute("/api/habits/rename/" + habit.slug + "/" + newName)
  const response = await fetch(route, {
    method: "PATCH",
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  if (!response.ok) {
    const resData = await response.json()
    const err: ErrorResponse = resData;
    const message = err.error ?? "Не удалось переименовать привычку."
    throw new Error(message)
  }
}

export async function togglePin(habit: Habit) {
  const token = await getSessionToken()
  const route = getApiRoute("/api/habits/pin/" + habit.slug)
  const response = await fetch(route, {
    method: "PATCH",
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  if (!response.ok) {
    const resData = await response.json()
    const err: ErrorResponse = resData
    const message = err.error ?? "Не удалось закрепить привычку."
    throw new Error(message)
  }
}

export async function getPinned() {
  const token = await getSessionToken()
  const route = getApiRoute("/api/habits/pin")
  const response = await fetch(route, {
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  const resData = await response.json()
  if (!response.ok) {
    const err: ErrorResponse = resData;
    const message = err.error ?? "Не удалось получить закреплённые привычки."
    throw new Error(message)
  }

  const { habits }: { habits: Habit[] } = resData;
  return habits
}

export async function getHabitDetails(slug: string) {
  const token = await getSessionToken()
  const route = getApiRoute("/api/habits/slug/" + slug)
  const response = await fetch(route, {
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  const resData = await response.json()
  if (!response.ok) {
    const err: ErrorResponse = resData;
    const message = err.error ?? "Привычка не найдена"
    throw new Error(message)
  }

  const { habit }: { habit: Habit } = resData;
  return habit
}
