import { useEffect, useRef, useState } from "react";
import { datas } from "./constants";
import { STATUS } from "./types";

type Item = {
  id: string;
  label: string;
  status: STATUS;
  children?: Item[];
};

function Item({
  item,
  handleChange,
}: {
  item: Item;
  handleChange: (id: string) => void;
}) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      if (item.status === STATUS.INDETERMINATE) {
        checkboxRef.current.indeterminate = true;
      } else {
        checkboxRef.current.indeterminate = false;
      }
    }
  }, [item.status]);

  return (
    <div className="my-1.5">
      <div className="flex gap-2">
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={item.status === STATUS.CHECKED}
          onChange={() => handleChange(item.id)}
        />
        <label>{item.label}</label>
      </div>
      <div className="ml-5">
        {item.children &&
          item.children.length > 0 &&
          item.children.map((i) => (
            <Item key={i.id} item={i} handleChange={handleChange} />
          ))}
      </div>
    </div>
  );
}

function Checkbox() {
  const [tree, setTree] = useState(datas);

  const computeStatus = (node: Item) => {
    if (!node.children || !(node.children.length > 0)) {
      return;
    }
    let checked = 0;
    let unchecked = 0;
    let interdeterminate = 0;

    node.children?.map((child) => {
      if (child.status === STATUS.CHECKED) checked++;
      if (child.status === STATUS.UNCHECKED) unchecked++;
      if (child.status === STATUS.INDETERMINATE) interdeterminate++;
    });

    if (checked === node.children.length) {
      node.status = STATUS.CHECKED;
    } else if (unchecked === node.children.length) {
      node.status = STATUS.UNCHECKED;
    } else if (checked > 0 || interdeterminate > 0) {
      node.status = STATUS.INDETERMINATE;
    }
  };

  const traverse = (
    targetId: string,
    node: Item,
    isDescendent?: boolean,
    ancestorStatus?: STATUS
  ) => {
    if (targetId === node.id) {
      if (node.status === STATUS.CHECKED) {
        node.status = STATUS.UNCHECKED;
      } else {
        node.status = STATUS.CHECKED;
      }
    }
    if (isDescendent && ancestorStatus !== undefined) {
      node.status = ancestorStatus;
    }
    node.children?.forEach((child) => {
      traverse(
        targetId,
        child,
        node.id === targetId || isDescendent,
        node.status
      );
    });
    computeStatus(node);
  };

  const handleChange = (id: string) => {
    const clonedTree = JSON.parse(JSON.stringify(tree));

    clonedTree.map((rootNode: Item) => {
      traverse(id, rootNode);
    });

    setTree(clonedTree);
  };

  return (
    <div className="p-8 max-w-md">
      {tree.map((item) => (
        <div key={item.id}>
          <Item key={item.id} item={item} handleChange={handleChange} />
        </div>
      ))}
    </div>
  );
}

export default Checkbox;
