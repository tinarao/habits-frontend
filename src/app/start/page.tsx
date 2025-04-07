import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function StartPage() {
  return (
    <main className="grid grid-cols-4 h-screen">
      <div className="flex items-center justify-center">
        <form action={async () => {
          "use server"

          return redirect("/api/auth/login/yandex")
        }}>
          <Button>
            Войти через Яндекс
          </Button>
        </form>
      </div>
      <div className="col-span-3 bg-orange-400"></div>
    </main>
  )
}
