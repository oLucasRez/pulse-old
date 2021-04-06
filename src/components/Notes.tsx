//---------------------------------------------------------------< components >
import { Note } from "./Note";
//--------------------------------------------------------------------< hooks >
import { useContext } from "react";
//-----------------------------------------------------------------< contexts >
import { NotesContext } from "../contexts/NotesContext";
//================================================================[ < Notes > ]
export function Notes() {
  //-------------------------------------------------------------< properties >
  const { notes } = useContext(NotesContext);
  //-----------------------------------------------------------------< return >
  return (
    <>
      {notes.map((note, index) => (
        <Note key={index} {...note} />
      ))}
    </>
  );
}
