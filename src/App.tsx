import React, { useState } from "react";
import type { TileNode } from "./types";
import { newId, randomColor } from "./utils";

const Tile: React.FC<{
  node: TileNode;
  onUpdate: (id: string, newNode: TileNode | null) => void;
}> = ({ node, onUpdate }) => {
  const split = (dir: "h" | "v") => {
    onUpdate(node.id, {
      type: "split",
      id: newId(),
      direction: dir,
      children: [node, { type: "leaf", id: newId(), color: randomColor() }],
    });
  };

  const remove = () => onUpdate(node.id, null);

  // Render split container
  if (node.type === "split") {
    return (
      <div
        className={`flex ${
          node.direction === "h" ? "flex-row" : "flex-col"
        } w-full h-full`}
      >
        {node.children.map((child) => (
          <div key={child.id} className="flex-1">
            <Tile node={child} onUpdate={onUpdate} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full border border-black/10"
      style={{ backgroundColor: node.color }}
    >
      <div className={`absolute top-2 right-2 flex gap-1 transition-opacity`}>
        <button
          onClick={() => split("h")}
          className="w-8 h-8 bg-blue-500 text-white rounded font-bold hover:bg-blue-600"
        >
          H
        </button>
        <button
          onClick={() => split("v")}
          className="w-8 h-8 bg-green-500 text-white rounded font-bold hover:bg-green-600"
        >
          V
        </button>
        <button
          onClick={remove}
          className="w-8 h-8 bg-red-500 text-white rounded font-bold hover:bg-red-600"
        >
          D
        </button>
      </div>
      <div className="absolute bottom-2 left-2 text-xs text-black/40 font-mono">
        {node.id}
      </div>
    </div>
  );
};

export default function App() {
  const [root, setRoot] = useState<TileNode>({
    type: "leaf",
    id: newId(),
    color: randomColor(),
  });

  // Update tree recursively
  const update = (targetId: string, replacement: TileNode | null) => {
    function applyUpdate(node: TileNode): TileNode | null {
      // If this is the node we want to update
      if (node.id === targetId) return replacement;

      //  If this node is split, update its children recursively
      if (node.type === "split") {
        const updatedChildren = node.children
          .map(applyUpdate) // recursively update each child
          .filter(Boolean) as TileNode[]; // remove deleted ones

        // Clean up the structure if children were removed
        if (updatedChildren.length === 0) return null; // both deleted → remove this split
        if (updatedChildren.length === 1) return updatedChildren[0]; // only one left → collapse

        // Otherwise, keep this split with updated children
        return { ...node, children: updatedChildren as [TileNode, TileNode] };
      }

      // Leaf node that doesn't match target → no change
      return node;
    }

    const updatedRoot = applyUpdate(root);
    if (updatedRoot) setRoot(updatedRoot);
  };

  return (
    <div className="w-screen h-screen">
      <Tile node={root} onUpdate={update} />
    </div>
  );
}
