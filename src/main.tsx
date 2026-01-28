import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";

// Routes
import App from "./App";
import Checkbox from "./pages/checkbox";
import Partitioner from "./pages/partitioner";
import FileTree from "./pages/file-tree";
import NestedComments from "./pages/nested-comments";
import KanbanBoard from "./pages/kanban-board";
import ElasticCounter from "./pages/elastic-counter";
import NoteShell from "./pages/note-shell";
import HoldToDelete from "./pages/hold-to-delete";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="partitioner" element={<Partitioner />} />
      <Route path="file-tree" element={<FileTree />} />
      <Route path="checkbox" element={<Checkbox />} />
      <Route path="nested-comments" element={<NestedComments />} />
      <Route path="kanban-board" element={<KanbanBoard />} />
      <Route path="elastic-counter" element={<ElasticCounter />} />
      <Route path="note-shell" element={<NoteShell />} />
      <Route path="hold-to-delete" element={<HoldToDelete />} />
    </Routes>
  </BrowserRouter>
);
