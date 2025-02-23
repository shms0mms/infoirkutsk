import { Loader2, Plus } from "lucide-react"
import Link from "next/link"
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle
} from "@/components/ui/glowing-stars"
import { DocumentCard } from "./document-card"
import { glowingStarsOnHover_PLUS } from "@/lib/glowing-stars"
import { DocumentSchema } from "@/lib/schemas"

export function DocumentsList({
  documents,
  isLoading
}: {
  documents: DocumentSchema[]
  isLoading: boolean
}) {
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-10">
            {!!documents?.length
              ? documents?.map(material => (
                  <DocumentCard key={material.id} {...material} />
                ))
              : null}
            <Link href={"/create-document"}>
              <GlowingStarsBackgroundCard
                className="w-full"
                glowingStarsOnHover={glowingStarsOnHover_PLUS}
              >
                <GlowingStarsTitle>Создать документ</GlowingStarsTitle>
                <div className="flex items-end justify-between">
                  <GlowingStarsDescription>
                    поделитесь документами с другими участниками
                  </GlowingStarsDescription>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[hsla(0,0%,100%,.1)]">
                    <Plus />
                  </div>
                </div>
              </GlowingStarsBackgroundCard>
            </Link>
          </div>
        </>
      )}
    </>
  )
}
