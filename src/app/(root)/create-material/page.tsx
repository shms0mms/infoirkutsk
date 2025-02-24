import { Suspense } from "react"
import { CreateMaterialForm } from "@/app/@modal/(.)create-material/create-material-form"

export default function CreateMaterial() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateMaterialForm />
    </Suspense>
  )
}
