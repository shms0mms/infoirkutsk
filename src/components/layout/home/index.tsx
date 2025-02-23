import type { FC, PropsWithChildren } from "react"
import { Header } from "@/components/layout/home/header"
import { cn } from "@/lib/utils"

type HomeLayoutProps = { className?: string }

const HomeLayout: FC<PropsWithChildren<HomeLayoutProps>> = ({
  children,
  className
}) => {
  return (
    <>
      <Header />
      <div
        className={cn(
          "[&>div]:min-h-[calc(100vh-var(--dashboard-header-size))] w-full",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
export default HomeLayout
