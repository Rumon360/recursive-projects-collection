import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";

import "./index.css";

import Checkbox from "./pages/checkbox";
import Partitioner from "./pages/partitioner";
import FileTree from "./pages/file-tree";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="partitioner" element={<Partitioner />} />
      <Route path="file-tree" element={<FileTree />} />
      <Route path="checkbox" element={<Checkbox />} />
    </Routes>
  </BrowserRouter>
);
