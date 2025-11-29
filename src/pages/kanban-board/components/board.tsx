import { useState, memo } from "react";
import Column from "./column";
import { DEFAULT_CARDS } from "../data";
import type { Card } from "../types";
import DeleteArea from "./delete-area";

const HEIGHT_OFFSET = "4rem";

function Board() {
  const [cards, setCards] = useState<Card[]>(DEFAULT_CARDS);

  return (
    <div
      className={`flex h-[calc(100%-${HEIGHT_OFFSET})] relative w-full gap-3 overflow-x-auto`}
    >
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="TODO"
        column="todo"
        headingColor="text-yellow-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In progress"
        column="in_progress"
        headingColor="text-blue-200"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Complete"
        column="done"
        headingColor="text-emerald-200"
        cards={cards}
        setCards={setCards}
      />
      <DeleteArea setCards={setCards} />
    </div>
  );
}

export default memo(Board);
