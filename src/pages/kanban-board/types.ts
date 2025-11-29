export type CardColumn = "backlog" | "todo" | "in_progress" | "done";

export interface Card {
  id: string;
  title: string;
  column: CardColumn;
}
