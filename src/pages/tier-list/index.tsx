import { useState } from "react";
import { pokemons } from "./data";
import Draggable from "./components/draggable";
import type { DraggableType } from "./types";
import { usePreloadImages } from "../../hooks/use-preload-images";
import { Loader2 } from "lucide-react";
import { DndContext } from "@dnd-kit/core";

function TierList() {
  const [draggables, setDraggables] = useState<DraggableType[]>(pokemons);

  const imageUrls = draggables.map((d) => `/images/pokemon/${d.src}`);
  const { loaded } = usePreloadImages(imageUrls);

  if (!loaded) {
    return (
      <div className="h-screen w-screen grid place-content-center">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen w-screen grid place-content-center px-6">
      <DndContext>
        <div className="flex gap-2 flex-wrap">
          {draggables.map((draggable) => (
            <Draggable key={draggable.id} draggable={draggable} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default TierList;
