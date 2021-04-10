//---------------------------------------------------------------< components >
import { Note } from "../views/Note.view";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { Notes as NotesCRUD } from "../cruds/Notes.crud";
//================================================================[ < Notes > ]
export function Notes() {
  //-------------------------------------------------------------< properties >
  const { notes } = useContext(NotesCRUD);
  //-----------------------------------------------------------------< return >
  return (
    <>
      {notes.map((note, index) => (
        <Note key={index} {...note} />
      ))}
    </>
  );
}
