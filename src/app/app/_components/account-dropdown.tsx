"use client"

import { Button } from "@/components/ui/button";
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
        <Button size="lg">
          {user ? (
            <>
              <Image src={user.imageUrl!} alt="Ваша аватарка" width={25} height={25} className="rounded-md" />
              {user?.name ?? user?.nickname ?? user?.email}
            </>
          ) : (
            <>Войти</>
          )}
        </Button>
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
