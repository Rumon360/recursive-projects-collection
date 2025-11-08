export const randomColor = (): string => {
  const hue = Math.random() * 360;
  return `hsl(${hue}, 70%, 75%)`;
};

let nextId = 0;
export const newId = (): string => `tile-${nextId++}`;
