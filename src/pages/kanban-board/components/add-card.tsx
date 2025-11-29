import React, { useState } from "react";
import type { Card, CardColumn } from "../types";

import { motion } from "motion/react";

import { Plus } from "lucide-react";

type Props = {
  column: CardColumn;
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

function AddCard({ column, setCards }: Props) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      id: crypto.randomUUID(),
      title: text.trim(),
      column,
    };

    setCards((prev) => [...prev, newCard]);
    setText("");
    setAdding(false);
  }

  function handleBlur() {
    setTimeout(() => setAdding(false), 150);
  }

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-zinc-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="cursor-pointer px-3 py-1.5 text-sm hover:bg-zinc-800 rounded text-zinc-400 transition-colors hover:text-zinc-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="cursor-pointer flex items-center gap-1.5 rounded bg-zinc-50 px-3 py-1.5 text-sm text-zinc-900 transition-colors hover:bg-zinc-300"
            >
              <span>Add</span>
              <Plus size={14} />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 p-3 text-sm rounded border border-zinc-700 bg-zinc-800 text-zinc-400 transition-colors hover:text-zinc-50"
        >
          <span>Add card</span>
          <Plus size={14} />
        </motion.button>
      )}
    </>
  );
}

export default AddCard;
