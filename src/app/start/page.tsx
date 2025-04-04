import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function StartPage() {
  return (
    <Button asChild>
      <Link href="/api/auth/login/yandex">Yandex</Link>
    </Button>
  )
}
