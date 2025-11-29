import { useState, type DragEvent } from "react";
import type { Card } from "../types";
import { Flame, Trash } from "lucide-react";

type Props = {
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
};

function DeleteArea({ setCards }: Props) {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    try {
      const cardId = e.dataTransfer?.getData("cardId");
      setCards((prev) => prev.filter((card) => card.id !== cardId));
      setActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`grid h-56 w-72 shrink-0 rounded border p-4 transition-colors place-content-center ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-zinc-600 bg-zinc-800 text-zinc-500"
      }`}
    >
      {active ? <Flame className="animate-bounce" /> : <Trash />}
    </div>
  );
}

export default DeleteArea;
