// fetchNotes :

// має виконувати запит для отримання колекції нотатків із сервера.
//  Повинна підтримувати пагінацію (через параметр сторінки) та фільтрацію за ключовим словом (пошук);

// createNote:

// має виконувати запит для створення нової нотатки на сервері. Приймає
//  вміст нової нотатки та повертає створену нотатку у відповіді;

// deleteNote:

// має виконувати запит для видалення нотатки за заданим ідентифікатором.
//  Приймає ID нотатки та повертає інформацію про видалену нотатку у відповіді.

// !До http-запиту потрібно додати параметри page та perPage. Наприклад:
// !GET https://notehub-public.goit.study/api/notes?page=1&perPage=12
// !Додайте умову, щоб компонент Pagination рендерився лише в тому випадку, якщо кількість сторінок колекції нотатків більше 1.

// ? код к этому заданию

import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

export interface NotesResponse {
  results: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

interface NotesParams {
  search?: string;
  tag?: NoteTag;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}

export default async function fetchNotes({
  search = "",
  tag,
  page = 1,
  perPage = 12,
  sortBy = "created",
}: NotesParams = {}): Promise<NotesResponse> {
  const url = `${BASE_URL}/notes`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  const params: Record<string, string | number> = {
    page,
    perPage,
    sortBy,
  };

  if (search) params.search = search;
  if (tag) params.tag = tag;

  const res = await axios.get<NotesResponse>(url, {
    headers,
    params,
  });

  return res.data;
}
