"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";
type Review = Pick<FormSchemaType, "author" | "content"> & {
  createdAt: string;
  id: number;
};
const initialReviews: Review[] = [
  {
    id: 1,
    author: "Петрова Мария Сергеевна",
    content: "Отличный материал! Очень полезен для подготовки к урокам.",
    createdAt: "2023-06-11T10:15:00Z",
  },
  {
    id: 2,
    author: "Сидоров Алексей Петрович",
    content:
      "Интересный подход к объяснению алгоритмов. Буду использовать на своих занятиях.",
    createdAt: "2023-06-12T14:20:00Z",
  },
];

const formSchema = z.object({
  author: z
    .string({ required_error: "Не забудьте подписать вашу рецензию" })
    .max(100),
  content: z.string({
    required_error: "Пожалуйста, введите содержание рецензии",
  }),
  createdAt: z.coerce.date(),
});
type FormSchemaType = z.infer<typeof formSchema>;

export function ReviewSection({ materialId }: { materialId: number }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      author: "",
      content: "",
      createdAt: new Date(),
    },
  });
  function onSubmit(values: FormSchemaType) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Рецензии</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Textarea {...field} placeholder="Ваше имя" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Опубликовать рецензию</Button>
        </form>
      </Form>

      <div className="space-y-4">
        {initialReviews.map((review) => (
          <div key={review.id} className="rounded-lg bg-gray-100 p-4">
            <p className="font-bold">{review.author}</p>
            <p className="mb-2 text-sm text-gray-500">
              {format(new Date(review.createdAt), "dd.MM.yyyy HH:mm")}
            </p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
