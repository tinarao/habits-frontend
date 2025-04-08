import { verify } from "@/lib/api/auth"
import { User } from "@/types/types"
import { useEffect, useState, useTransition } from "react"

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      verify().then(u => setUser(u))
    })
  }, [])

  return { isLoading, user }
}
