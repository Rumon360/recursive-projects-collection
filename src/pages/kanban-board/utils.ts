import type { DragEvent } from "react";
import type { CardColumn } from "./types";

export const getIndicators = (
  column: CardColumn,
  scope: HTMLElement | Document = document
) => {
  return Array.from(
    scope.querySelectorAll(`[data-column="${column}"]`)
  ) as HTMLElement[];
};

export const getNearestIndicator = (
  e: DragEvent<HTMLDivElement>,
  indicators: HTMLElement[]
) => {
  const DISTANCE_OFFSET = 50;

  const el = indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return {
          offset,
          element: child,
        };
      }

      return closest;
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );

  return el;
};

export const clearHighlights = (column: CardColumn, els?: HTMLElement[]) => {
  const indicators = els || getIndicators(column);

  indicators.forEach((el) => {
    el.style.opacity = "0";
  });
};
