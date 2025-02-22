import { Loader2, Plus } from "lucide-react"
import Link from "next/link"
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle
} from "@/components/ui/glowing-stars"
import { MaterialCard } from "./material-card"
import { glowingStarsOnHover_PLUS } from "@/lib/glowing-stars"
import { MaterialSchema } from "@/lib/schemas"

export function MaterialsList({
  materials,
  tab,
  isLoading
}: {
  materials: MaterialSchema[]
  tab: string
  isLoading: boolean
}) {
  return (
    <>
      {!!materials?.length ? (
        <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-10">
          {materials?.map(material => (
            <MaterialCard key={material.id} {...material} />
          ))}
          {tab === "all" && (
            <Link href={"/create-material"}>
              <GlowingStarsBackgroundCard
                className="w-full"
                glowingStarsOnHover={glowingStarsOnHover_PLUS}
              >
                <GlowingStarsTitle>Создать материал</GlowingStarsTitle>
                <div className="flex items-end justify-between">
                  <GlowingStarsDescription>
                    Поделитесь своими наработками или материалами
                  </GlowingStarsDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]">
                    <Plus />
                  </div>
                </div>
              </GlowingStarsBackgroundCard>
            </Link>
          )}
        </div>
      ) : isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : null}
      {tab !== "all" && !materials?.length && (
        <p className="w-full h-full flex items-center justify-center text-foreground/60 font-semibold">
          Материалов пока нет
        </p>
      )}
    </>
  )
}
