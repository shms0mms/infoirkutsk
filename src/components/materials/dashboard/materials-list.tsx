import { Plus } from "lucide-react"
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
  tab
}: {
  materials: MaterialSchema[]
  tab: string
}) {
  return (
    <>
      <div className="grid grid-cols-1 w-full lg:grid-cols-2 gap-10">
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
      {tab !== "all" && !materials?.length && (
        <p className="text-center text-foreground/60 font-semibold">
          Материалов пока нет
        </p>
      )}
    </>
  )
}
