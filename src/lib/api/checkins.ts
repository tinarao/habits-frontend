"use server"

import { CheckIn, Habit } from "@/types/types"
import { ErrorResponse, getApiRoute } from "."
import { getSessionToken } from "./auth"
import { revalidateTag } from "next/cache"

const CHECKINS_TAG = "checkins"

export async function createCheckin(habit: Habit) {
  const token = await getSessionToken()
  if (!token) {
    throw new Error("Unauthorized")
  }

  const route = getApiRoute("/api/checkins/" + habit.slug)
  const response = await fetch(route, {
    method: "POST",
    headers: {
      "Cookie": `${token.name}=${token.value}`
    }
  })

  revalidateTag(CHECKINS_TAG)
  const data = await response.json()
  if (!response.ok) {
    const err = data as ErrorResponse
    throw new Error(err.error)
  }
}

export async function getCheckinsByHabit(habit: Habit) {
  const token = await getSessionToken()
  const route = getApiRoute("/api/checkins/habit/" + habit.slug)
  const response = await fetch(route, {
    headers: {
      "Cookie": `${token.name}=${token.value}`
    },
    next: {
      tags: [CHECKINS_TAG]
    }
  })

  const data = await response.json()
  if (!response.ok) {
    const err = data as ErrorResponse
    throw new Error(err.error)
  }

  const { checkins }: { checkins: CheckIn[] } = data;
  return checkins
}

export async function getLatestCheckins() {
  const token = await getSessionToken()
  const route = getApiRoute("/api/checkins/latest")
  const response = await fetch(route, {
    headers: {
      "Cookie": `${token.name}=${token.value}`
    },
    next: {
      tags: [CHECKINS_TAG]
    }

  })

  const data = await response.json()
  if (!response.ok) {
    const err = data as ErrorResponse
    const message = err.error ?? "Не удалось получить последние отметки"
    throw new Error(message)
  }

  const { checkins }: { checkins: CheckIn[] } = data;
  const latest = checkins.slice(0, 5)

  return latest
}
