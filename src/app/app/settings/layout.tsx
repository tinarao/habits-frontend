import { Button } from "@/components/ui/button"
import { Cog } from "lucide-react"
import Link from "next/link"

const links = [
  {
    url: "/app/settings",
    label: "Основные",
    icon: Cog
  }
]

export default async function SettingsLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-5 h-full container mx-auto gap-x-6">
      <div className="p-4 bg-neutral-100 rounded-md space-y-2">
        {links.map((l, i) => (
          <Button key={i} asChild size="lg" variant="outline" className="w-full">
            <Link className="justify-start" href={l.url}>
              <l.icon />
              {l.label}
            </Link>
          </Button>
        ))}
      </div>
      <div className="col-span-4">
        {children}
      </div>
    </div>
  )
}
