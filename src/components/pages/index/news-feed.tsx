import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Новый курс по Python для начинающих",
    date: "2023-06-01",
    description:
      "Открыта регистрация на бесплатный онлайн-курс по Python для начинающих учителей информатики.",
    url: "https://example.com/python-course",
  },
  {
    id: 2,
    title: "Обновление стандартов по информатике",
    date: "2023-05-28",
    description:
      "Министерство образования анонсировало обновление образовательных стандартов по информатике.",
    url: "https://example.com/it-standards-update",
  },
  {
    id: 3,
    title: "Конференция 'IT в образовании 2023'",
    date: "2023-05-25",
    description:
      "Ежегодная конференция для учителей информатики пройдет в онлайн формате 15-17 августа.",
    url: "https://example.com/it-edu-conference",
  },
];

export function NewsFeed() {
  return (
    <section id="news" className="mb-12">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Последние новости
      </h2>
      <ul className="space-y-6">
        {newsItems.map((item) => (
          <li key={item.id} className="border-b pb-4 last:border-b-0">
            <h3 className="text-xl font-semibold text-blue-600">
              {item.title}
            </h3>
            <p className="mb-2 text-sm text-gray-600">
              Дата публикации: {item.date}
            </p>
            <p className="mb-2 text-gray-700">{item.description}</p>
            <Link href={item.url} className="text-blue-500 hover:underline">
              Читать подробнее
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
