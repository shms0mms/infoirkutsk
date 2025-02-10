import Link from "next/link";

const materials = [
  {
    id: 1,
    title: "Интерактивные уроки по алгоритмизации",
    description:
      "Набор интерактивных уроков для обучения основам алгоритмизации в средней школе.",
    type: "HTML",
    url: "/materials/interactive-algorithms.html",
  },
  {
    id: 2,
    title: "Сборник задач по программированию",
    description:
      "Подборка задач разной сложности для подготовки к олимпиадам по программированию.",
    type: "PDF",
    url: "/materials/programming-problems.pdf",
  },
  {
    id: 3,
    title: "Методика преподавания ООП",
    description:
      "Методические рекомендации по преподаванию объектно-ориентированного программирования в старших классах.",
    type: "DOCX",
    url: "/materials/oop-teaching-methodology.docx",
  },
];

export function MethodicalMaterials() {
  return (
    <section id="materials" className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Последние методические материалы
      </h2>
      <ul className="space-y-6">
        {materials.map((material) => (
          <li key={material.id} className="border-b pb-4 last:border-b-0">
            <h3 className="text-xl font-semibold text-blue-600">
              {material.title}
            </h3>
            <p className="mb-2 text-gray-700">{material.description}</p>
            <p className="mb-2 text-sm text-gray-600">
              Тип файла: {material.type}
            </p>
            <Link
              href={material.url}
              className="text-blue-500 hover:underline"
              download
            >
              Скачать материал
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
