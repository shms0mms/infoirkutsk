import { format } from "date-fns";
import { Book, Calendar, School, User } from "lucide-react";

interface Material {
  title: string;
  author: string;
  school: string;
  subject: string;
  publishedAt: string;
  content: string;
}

export function MaterialDetails({ material }: { material: Material }) {
  return (
    <article className="mb-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">
        {material.title}
      </h1>
      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center">
            <User className="mr-4 h-8 w-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Автор</p>
              <p className="text-lg font-semibold">{material.author}</p>
            </div>
          </div>
          <div className="flex items-center">
            <School className="mr-4 h-8 w-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-500">Школа</p>
              <p className="text-lg font-semibold">{material.school}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Book className="mr-4 h-8 w-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-500">Предмет</p>
              <p className="text-lg font-semibold">{material.subject}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="mr-4 h-8 w-8 text-red-500" />
            <div>
              <p className="text-sm text-gray-500">Дата публикации</p>
              <p className="text-lg font-semibold">
                {format(new Date(material.publishedAt), "dd.MM.yyyy HH:mm")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="prose max-w-none">{material.content}</div>
    </article>
  );
}
