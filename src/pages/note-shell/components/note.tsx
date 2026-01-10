import { memo } from "react";
import { X, Hash, Terminal } from "lucide-react";
import type { NoteType } from "../utils/types";

type NoteProps = {
  note: NoteType;
  onDelete: (id: number) => void;
  ref: React.Ref<HTMLDivElement>;
  onDragStart: (
    event: React.MouseEvent,
    id: number,
    pos: { x: number; y: number }
  ) => void;
};

const Note = memo(({ note, onDelete, ref, onDragStart }: NoteProps) => {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${note.x}px`,
        top: `${note.y}px`,
        transform: "translate3d(0,0,0)",
      }}
      onMouseDown={(e) => onDragStart(e, note.id, { x: note.x, y: note.y })}
      className="group relative w-full max-w-sm select-none border border-white/10 bg-zinc-900/80 backdrop-blur-sm"
    >
      <div className="flex cursor-move items-center justify-between border-b border-white/5 bg-white/[0.02] px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-mono text-zinc-500 uppercase tracking-tight">
            <Hash size={10} />
            <span>{note.id.toString().slice(-4)}</span>
          </div>
        </div>
        <button
          onClick={() => onDelete(note.id)}
          className="rounded-md text-zinc-400 hover:text-rose-400 transition-colors"
          aria-label="Delete note"
        >
          <X size={14} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3">
          <Terminal size={14} className="mt-1 text-emerald-400/70 shrink-0" />
          <div className="flex-1 min-w-0">
            <pre className="whitespace-pre-wrap break-words font-mono text-sm leading-relaxed tracking-tight text-zinc-200">
              {note.text}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
});

Note.displayName = "Note";
export default Note;
