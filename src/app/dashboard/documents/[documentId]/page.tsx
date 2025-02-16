import { Metadata } from "next"

type MaterialsProps = {
  params: Promise<{ materialId: string }>
}

export async function generateMetadata({
  params
}: MaterialsProps): Promise<Metadata> {
  const { materialId } = await params
  const material = { title: "test" }

  return {
    title: material?.title
  }
}

export default async function ProjectPage({ params }: MaterialsProps) {
  const [{ materialId }] = await Promise.all([params])

  return <></>
}
