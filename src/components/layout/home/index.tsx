import type { FC, PropsWithChildren } from "react"
import { Header } from "@/components/layout/home/header"
import { cn } from "@/lib/utils"

type HomeLayoutProps = { className?: string }

const HomeLayout: FC<PropsWithChildren<HomeLayoutProps>> = ({
  children,
  className
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div
        className={cn(
          "[&>div]:min-h-[calc(100vh-var(--dashboard-header-size))] w-full flex-[1_1_auto]",
          className
        )}
      >
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  )
}
export default HomeLayout
