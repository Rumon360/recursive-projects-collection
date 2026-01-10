import { useCallback, useRef, useState, type FormEvent } from "react";
import ShellInput from "./components/input";
import Note from "./components/note";
import type { NoteType } from "./utils/types";
import { useLocalStorage } from "../../hooks/use-local-storage";

const LOCAL_STORAGE_KEY = "sticky_notes_data";

function NoteShell() {
  const [notes, setNotes] = useLocalStorage<NoteType[]>(LOCAL_STORAGE_KEY, []);
  const [value, setValue] = useState<string>("");
  const noteRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const determineNewPosition = useCallback(() => {
    const noteWidth = 384;
    const noteHeight = 160;
    const maxX = Math.max(0, window.innerWidth - noteWidth);
    const maxY = Math.max(0, window.innerHeight - noteHeight);
    return {
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") return;

    const { x, y } = determineNewPosition();

    const newNote: NoteType = {
      id: Date.now(),
      text: value,
      x: x,
      y: y,
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setValue("");
  };

  const handleDelete = useCallback(
    (id: number) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  const checkforOverlap = useCallback((id: number) => {
    const noteElement = noteRefs.current[id];
    if (!noteElement) return false;

    const currentRect = noteElement.getBoundingClientRect();

    return Object.keys(noteRefs.current).some((key) => {
      const otherId = parseInt(key);
      if (otherId === id) return false;
      const otherElement = noteRefs.current[otherId];
      if (!otherElement) return false;

      const otherRect = otherElement.getBoundingClientRect();
      return !(
        currentRect.right < otherRect.left ||
        currentRect.left > otherRect.right ||
        currentRect.bottom < otherRect.top ||
        currentRect.top > otherRect.bottom
      );
    });
  }, []);

  const handleDragStart = useCallback(
    (
      event: React.MouseEvent,
      noteId: number,
      initialPos: { x: number; y: number }
    ) => {
      const noteElement = noteRefs.current[noteId];
      if (!noteElement) return;

      const rect = noteElement.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      const handleMouseMove = (e: MouseEvent) => {
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        noteElement.style.left = `${newX}px`;
        noteElement.style.top = `${newY}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);

        const finalRect = noteElement.getBoundingClientRect();
        const newPos = { x: finalRect.left, y: finalRect.top };

        if (checkforOverlap(noteId)) {
          noteElement.style.left = `${initialPos.x}px`;
          noteElement.style.top = `${initialPos.y}px`;
        } else {
          setNotes((prev) =>
            prev.map((note) =>
              note.id === noteId ? { ...note, ...newPos } : note
            )
          );
        }
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [checkforOverlap, setNotes]
  );

  return (
    <div className="h-screen relative w-full font-terminal overflow-hidden">
      {notes.map((note: NoteType) => (
        <Note
          ref={(el) => {
            if (el) noteRefs.current[note.id] = el;
            else delete noteRefs.current[note.id];
          }}
          key={note.id}
          note={note}
          onDelete={handleDelete}
          onDragStart={handleDragStart}
        />
      ))}
      <ShellInput
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NoteShell;
