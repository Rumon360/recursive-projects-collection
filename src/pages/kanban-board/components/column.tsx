import {
  useState,
  useMemo,
  useCallback,
  useRef,
  type DragEvent,
  type SetStateAction,
  memo,
} from "react";
import type { Card, CardColumn, Card as CardType } from "../types";
import ColumnCard from "./card";
import DropIndicator from "./drop-indicator";
import AddCard from "./add-card";
import { clearHighlights, getIndicators, getNearestIndicator } from "../utils";

type Props = {
  title: string;
  headingColor: string;
  column: CardColumn;
  cards: CardType[];
  setCards: React.Dispatch<SetStateAction<CardType[]>>;
};

function Column({ title, headingColor, column, cards, setCards }: Props) {
  const [active, setActive] = useState(false);

  const draggingIdRef = useRef<string | null>(null);

  const filteredCards = useMemo(
    () => cards.filter((card) => card.column === column),
    [cards, column]
  );

  const handleDragStart = useCallback(
    (e: DragEvent<HTMLDivElement>, card: Card) => {
      e.dataTransfer.setData("cardId", card.id);
      draggingIdRef.current = card.id;
    },
    []
  );

  const highlightIndicator = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      const indicators = getIndicators(column, e.currentTarget);
      clearHighlights(column, indicators);

      const nearest = getNearestIndicator(e, indicators);
      if (nearest?.element) nearest.element.style.opacity = "1";
    },
    [column]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      const targetCardId = (e.target as HTMLElement)?.dataset?.cardId;
      if (targetCardId && targetCardId === draggingIdRef.current) {
        return;
      }

      if (!active) {
        setActive(true);
      }

      highlightIndicator(e);
    },
    [active, highlightIndicator]
  );

  const handleDragLeave = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      setActive(false);
      clearHighlights(column, getIndicators(column, e.currentTarget));
    },
    [column]
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setActive(false);
      clearHighlights(column);

      const cardId = e.dataTransfer.getData("cardId");
      if (!cardId) return;

      draggingIdRef.current = null;

      const indicators = getIndicators(column, e.currentTarget);
      const nearest = getNearestIndicator(e, indicators);
      if (!nearest?.element) return;

      const beforeId = nearest.element.dataset.before ?? "-1";

      if (beforeId === cardId) return;

      setCards((prev) => {
        const updated = [...prev];
        const dragged = updated.find((c) => c.id === cardId);
        if (!dragged) return prev;

        const newCard = { ...dragged, column };

        const withoutOld = updated.filter((c) => c.id !== cardId);

        if (beforeId === "-1") return [...withoutOld, newCard];

        const insertIndex = withoutOld.findIndex((c) => c.id === beforeId);
        if (insertIndex === -1) return prev;

        withoutOld.splice(insertIndex, 0, newCard);
        return withoutOld;
      });
    },
    [column, setCards]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-72 h-full shrink-0 rounded border p-4 ${
        active ? "border-dashed border-violet-400" : "border-zinc-600"
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>

      <div
        className={`h-[calc(100%-2rem)] w-full transition-colors overflow-y-auto overflow-x-hidden ${
          active ? "bg-zinc-800/50" : "bg-zinc-900"
        }  [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden`}
      >
        {filteredCards.map((card) => (
          <ColumnCard
            key={card.id}
            card={card}
            handleDragStart={handleDragStart}
          />
        ))}

        <DropIndicator beforeId="-1" column={column} />

        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}

export default memo(Column);
