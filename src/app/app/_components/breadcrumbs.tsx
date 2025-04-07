import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { House } from "lucide-react"
import { Fragment } from "react"

type BreadcrumbsProps = {
  links: Array<{ url: string, label: string }>
}

export default function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/app">
            <House className="size-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.length > 0 && (
          links.map((l, i) => (
            <Fragment key={i}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={l.url}>{l.label}</BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          ))
        )}
      </BreadcrumbList>
    </Breadcrumb>

  )
}
