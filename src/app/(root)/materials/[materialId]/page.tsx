import { redirect } from "next/navigation"
import { Footer } from "@/components/layout/home/footer"
import { CommentForm } from "@/components/materials/comment-form"
import { MaterialDetails } from "@/components/materials/materials-details"
import { api } from "@/trpc/server"

export default async function MaterialPage({
  params
}: {
  params: Promise<{ materialId: string }>
}) {
  const { materialId } = await params
  if (!materialId) return redirect("/404")
  const material = await api.material.getById({ id: materialId })!
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-2/3">
            <MaterialDetails {...material!} />
          </div>
          <div className="w-full lg:w-1/3">
            <h2 className="text-2xl font-bold mb-4">Оставить комментарий</h2>
            <CommentForm materialId={material?.id} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
