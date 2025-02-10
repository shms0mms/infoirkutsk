import { useRouter } from "next/router";
import { Header } from "~/components/header";
import { MaterialDetails } from "~/components/pages/article/material-details";
import { ReviewSection } from "~/components/pages/article/reviews-section";

// В реальном приложении эти данные будут загружаться из базы данных
const material = {
  id: "1",
  title: "Интерактивные уроки по алгоритмизации",
  author: "Иванов Иван Иванович",
  school: "Средняя школа №1",
  subject: "Информатика",
  publishedAt: "2023-06-10T22:30:00Z",
  content: "Содержание материала...",
};

export default function MaterialPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <MaterialDetails material={material} />
            <ReviewSection materialId={+id!} />
          </div>
        </div>
      </main>
    </div>
  );
}
