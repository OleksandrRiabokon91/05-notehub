import css from "./App.module.css";

//? components imports:

import NoteList from "../NoteList/NoteList";
// контейнер додатка
export default function App() {
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        {/* При натисканні на цю кнопку має відкриватись модальне вікно Modal з формою NoteForm
        Компонент Modal має створювати DOM-елемент */}
        <button className={css.button}>Create note +</button>

        {/* NoteList рендерить только если в коллекции хотябы 1 елемент */}
        <NoteList />
        {/* Компонент SearchBox */}
        {/* Пагінація */}
        {/* Кнопка створення нотатки */}
      </header>
    </div>
  );
}
