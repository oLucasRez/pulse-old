//--------------------------------------------------------------------< hooks >
import { useState } from "react";
//-----------------------------------------------------------------< contexts >
import { createContext } from "react";
//--------------------------------------------------------------------< types >
import { Note } from "../types/Note.type";
import { Vector } from "../types/Vector.type";
import { Text } from "../types/Text.type";
import { ReactNode } from "react";

export interface NotesContextData {
  notes: Note[];
  getNote: (from: Vector) => Note | undefined;
  addNote: (note: Note) => void;
  addAnswer: (from: Vector, answer: Text) => void;
  updateNote: (from: Vector, { arrow, question, answers, fact }: any) => void;
  defineFact: (from: Vector, fact: number) => void;
}

interface Props {
  children: ReactNode;
}
//-------------------------------------------------------------------< global >
export const Notes = createContext({} as NotesContextData);
//========================================================[ < NotesProvider > ]
export function NotesProvider({ children }: Props) {
  //-------------------------------------------------------------< properties >
  const [notes, setNotes] = useState<Note[]>([]);
  //----------------------------------------------------------------< methods >
  function getNote(from: Vector) {
    return notes.find((note) => note.arrow.from === from);
  }

  function addNote(note: Note) {
    if (getNote(note.arrow.from)) return;

    setNotes([...notes, note]);
  }

  function addAnswer(from: Vector, answer: Text) {
    const note = getNote(from);
    if (!note) return;

    updateNote(from, { answer: [...note.answers, answer] });
  }

  function defineFact(from: Vector, fact: number) {
    const note = getNote(from);
    if (!note || fact < 0 || fact >= note.answers.length) return;

    updateNote(note.arrow.from, { fact });
  }

  function updateNote(from: Vector, { arrow, question, answers, fact }: any) {
    const _notes = notes.map((note) => {
      if (note.arrow.from === from)
        return {
          arrow: arrow ?? note.arrow,
          question: question ?? note.question,
          answers: answers ?? note.answers,
          fact: fact ?? note.fact,
        };
      else return note;
    });

    setNotes(_notes);
  }
  //-----------------------------------------------------------------< return >
  console.log("notes-provider rendered");
  return (
    <Notes.Provider
      value={{ notes, getNote, addNote, addAnswer, defineFact, updateNote }}
    >
      {children}
    </Notes.Provider>
  );
}
