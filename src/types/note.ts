export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type NoteTag = Note["tag"];

export interface NewNote {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export const tagOptions: NoteTag[] = [
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
