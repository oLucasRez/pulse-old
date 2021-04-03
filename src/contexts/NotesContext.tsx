//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { ReactNode } from "react";
import { INote } from "../types/INote";
import { IText } from "../types/IText";
import { IVector } from "../types/IVector";
export interface INotesContext {
  notes: INote[];
  addNote: (note: INote) => void;
  getNote: (from: IVector) => INote | undefined;
  addAnswer: (from: IVector, answer: IText) => void;
  defineFact: (from: IVector, fact: number) => void;
}
interface IProps {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const NotesContext = createContext({} as INotesContext);
//========================================================[ < NotesProvider > ]
export function NotesProvider({ children }: IProps) {
  //-------------------------------------------------------------< properties >
  const [notes, setNotes] = useState<INote[]>([]);
  //----------------------------------------------------------------< methods >
  function addNote(note: INote) {
    if (getNote(note.arrow.from)) return;

    setNotes([...notes, note]);
  }

  function getNote(from: IVector) {
    return notes.find((note) => note.arrow.from === from);
  }

  function addAnswer(from: IVector, answer: IText) {
    const note = getNote(from);
    if (!note) return;

    updateNote(from, { answer: [...note.answers, answer] });
  }

  function defineFact(from: IVector, fact: number) {
    const note = getNote(from);
    if (!note || fact < 0 || fact >= note.answers.length) return;

    updateNote(note.arrow.from, { fact });
  }

  function updateNote(from: IVector, whatToUpdate: any) {
    const _notes = notes.map((note) => {
      if (note.arrow.from === from)
        return {
          arrow: whatToUpdate.arrow ?? note.arrow,
          question: whatToUpdate.question ?? note.question,
          answers: whatToUpdate.answers ?? note.answers,
          fact: whatToUpdate.fact ?? note.fact,
        };
      else return note;
    });

    setNotes(_notes);
  }
  //-----------------------------------------------------------------< return >
  console.log("notes-provider rendered");
  return (
    <NotesContext.Provider
      value={{ notes, addNote, getNote, addAnswer, defineFact }}
    >
      {children}
    </NotesContext.Provider>
  );
}
