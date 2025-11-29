import { type DragEvent, memo } from "react";
import type { Card } from "../types";
import DropIndicator from "./drop-indicator";
import { motion } from "motion/react";

type Props = {
  card: Card;
  handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void;
};

function ColumnCard({ card, handleDragStart }: Props) {
  const { id, title, column } = card;

  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) =>
          handleDragStart(e as unknown as DragEvent<HTMLDivElement>, card)
        }
        className="cursor-grab rounded border border-zinc-700 bg-zinc-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm lg:text-base text-zinc-100">{title}</p>
      </motion.div>
    </>
  );
}

export default memo(ColumnCard);
