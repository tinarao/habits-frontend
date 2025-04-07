"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { verify } from "@/lib/api/auth";
import { User } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountDropdown() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    verify()
      .then(u => setUser(u))
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {user ? (
            <>
              <Image src={user.imageUrl!} alt="Ваша аватарка" width={40} height={40} className="rounded-md" />
            </>
          ) : (
            <>Войти</>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/app">Мои привычки</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/settings">Настройки</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
