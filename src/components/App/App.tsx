import css from "./App.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

//? Компоненты
import fetchNotes, { deleteNote } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";
import SearchBox from "../SearchBox/SearchBox";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

//? Хук задержки поиска
import { useDebounce } from "use-debounce";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 800);

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", currentPage, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search: debouncedSearchQuery,
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: (noteId: number) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDelete = (noteId: number) => {
    deleteMutation.mutate(noteId);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <div className={css.left}>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className={css.center}>
          {data && data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>

        <div className={css.right}>
          <button className={css.button} onClick={() => setIsModalOpen(true)}>
            Create note +
          </button>
        </div>

        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onSuccess={() => setIsModalOpen(false)} />
          </Modal>
        )}
      </header>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <ErrorMessage message={(error as Error).message} />
      ) : data && data.notes.length > 0 ? (
        <>
          <NoteList notes={data.notes} onDelete={handleDelete} />
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      ) : (
        <p>No notes found</p>
      )}
    </div>
  );
}
