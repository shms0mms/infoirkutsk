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

export function MaterialsList({ materials }: { materials: MaterialSchema[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {materials?.map(material => (
        <MaterialCard key={material.id} {...material} />
      ))}
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
    </div>
  )
}
