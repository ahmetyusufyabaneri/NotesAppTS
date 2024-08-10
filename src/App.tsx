import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import EditPage from "./pages/EditPage";
import { useLocalStorage } from "@uidotdev/usehooks";
import { INote, INoteData, ITag } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<INote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<ITag[]>("tags", []);

  const createNewTag = (tag: ITag): void => {
    setTags((prev) => [...prev, tag]);
  };

  const createNewNote = (noteData: INoteData): void => {
    const newNote: INote = {
      id: v4(),
      ...noteData,
    };

    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const editNote = (id: string, updatedData: INoteData) => {
    const updated = notes.map((note) =>
      note.id == id ? { id, ...updatedData } : note
    );

    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage notes={notes} availableTags={tags} />}
        />
        <Route
          path="/new"
          element={
            <CreatePage
              handleSubmit={createNewNote}
              createTag={createNewTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={notes} />}>
          <Route index element={<DetailPage deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <EditPage
                availableTags={tags}
                createNewTag={createNewTag}
                onSubmit={editNote}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
