import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
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
}: NotesParams = {}): Promise<FetchNotesResponse> {
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

  const res = await axios.get<FetchNotesResponse>(url, {
    headers,
    params,
  });

  return res.data;
}

interface CreateNotePayload {
  title: string;
  content?: string;
  tag: NoteTag;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const url = `${BASE_URL}/notes`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };

  const res = await axios.post<Note>(url, payload, { headers });

  return res.data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const url = `${BASE_URL}/notes/${noteId}`;

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  };

  const res = await axios.delete<Note>(url, { headers });

  return res.data;
}
