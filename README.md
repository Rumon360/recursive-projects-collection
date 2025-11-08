# 🧩 Recursive Infinite Window Partitioner

An interactive **recursive layout builder** built with **React + TypeScript**.  
You can split tiles **horizontally** or **vertically**, and each tile keeps its own persistent color.  
Tiles can also be **deleted** dynamically, and the layout tree automatically updates and cleans itself.

---

## 🚀 Demo

---

## 🎯 Features

- 🧱 **Recursive layout system** — each tile can be split infinitely into nested containers.
- 🎨 **Persistent random colors** — every new tile gets a unique random color.
- ↔️ **Horizontal or vertical splits** — choose how to divide your layout.
- ❌ **Smart cleanup** — when tiles are deleted, the parent auto-collapses if needed.
- ⚡ **Pure React state** — all layout data is managed via a recursive tree in `useState`.
