import { createContext, useContext, useState } from "react"

type BreadcrumbLink = {
  url: string
  label: string
}

interface BreadcrumbsContext {
  links: BreadcrumbLink[]
  set: (links: BreadcrumbLink[]) => void
}
export const BreadcrumbsContext = createContext<BreadcrumbsContext>({ links: [], set: (_links) => { } })

export const BreadcrumbsProvider = ({ children }: React.PropsWithChildren) => {
  const [links, setLinks] = useState<BreadcrumbLink[]>([])

  return (
    <BreadcrumbsContext.Provider value={{ links, set: (l) => setLinks(l) }}>
      {children}
    </BreadcrumbsContext.Provider>
  )
}

export const useBreadcrumbs = () => {
  const ctx = useContext(BreadcrumbsContext)
  if (!ctx) {
    throw new Error("useBreadcrumbs must be used only within BreadcrumbsContext!")
  }

  return ctx
}
