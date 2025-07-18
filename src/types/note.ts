// Загальні типи, які використовуються в кількох компонентах
// Створіть та винесіть інтерфейс Note для типізації однієї нотатки
//  у файл src / types / note.ts і використовуйте його у компонентах.

// Загальні інтерфейси, які пов`язані з сутністю нотатків (Note, NoteTag) мають бути у файлі
export interface Note {
  id: string;
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}

export type NoteTag = Note["tag"];
