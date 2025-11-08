# 🧩 Recursive Projects Collection

A collection of **recursive React applications** built with **React + TypeScript**, each showcasing recursive data structures and UI interactions.  
Both projects are deployed under the same domain with different routes.

---

## 📂 Projects

### 1. 🪟 Recursive Infinite Window Partitioner

An interactive **recursive layout builder** built with **React + TypeScript**.  
You can split tiles **horizontally** or **vertically**, and each tile keeps its own persistent color.  
Tiles can also be **deleted** dynamically, and the layout tree automatically updates and cleans itself.

#### 🔗 Live Demo

[https://recursive-projects-collection.netlify.app/partitioner](https://recursive-projects-collection.netlify.app/partitioner)

#### ✨ Features

- 🧱 **Recursive layout system** — each tile can be split infinitely into nested containers.
- 🎨 **Persistent random colors** — every new tile gets a unique random color.
- ↔️ **Horizontal or vertical splits** — choose how to divide your layout.
- ❌ **Smart cleanup** — when tiles are deleted, the parent auto-collapses if needed.
- ⚡ **Pure React state** — all layout data is managed via a recursive tree in `useState`.

---

### 2. 📁 Recursive File Structure

A **recursive file explorer** built with **React + TypeScript**, demonstrating tree traversal and nested component rendering.  
You can expand or collapse folders, create new files or directories, and visualize the hierarchical data structure interactively.

#### 🔗 Live Demo

[https://recursive-projects-collection.netlify.app/file-structure](https://recursive-projects-collection.netlify.app/file-structure)

#### ✨ Features

- 🌳 **Recursive tree rendering** — files and folders are rendered from nested data structures.
- 📂 **Expandable/collapsible folders** — intuitive folder navigation.
- ➕ **Dynamic creation** — add files or folders at any depth.
- 🗑️ **Smart deletion** — removing a folder deletes all nested children.
- ⚡ **State-driven architecture** — built entirely with React hooks and local state.

---

## 🛠️ Tech Stack

- ⚛️ **React** + **TypeScript**
- ⚡ **Vite** for fast bundling and hot reload
- 🎨 **TailwindCSS** for styling
- 🧭 **React Router DOM** for multi-page routing
