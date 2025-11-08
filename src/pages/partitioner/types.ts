type LeafNode = {
  type: "leaf";
  id: string;
  color: string;
};

type SplitNode = {
  type: "split";
  id: string;
  direction: "h" | "v";
  children: [TileNode, TileNode];
};

export type TileNode = LeafNode | SplitNode;
