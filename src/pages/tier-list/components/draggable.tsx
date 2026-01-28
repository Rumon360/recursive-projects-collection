import { useDraggable } from "@dnd-kit/core";
import type { DraggableType } from "../types";

type Props = {
  draggable: DraggableType;
};

function Draggable({ draggable }: Props) {
  const { id, src } = draggable;
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-pointer"
    >
      <img
        src={`/images/pokemon/${src}`}
        alt={src}
        className="aspect-[5/7] w-16 sm:w-20 lg:w-24 xl:w-32 object-cover"
      />
    </button>
  );
}

export default Draggable;
