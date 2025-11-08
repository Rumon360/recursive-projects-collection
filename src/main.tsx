import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Partitioner from "./pages/partitioner";
import "./index.css";
import FileTree from "./pages/file-tree";

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="partitioner" element={<Partitioner />} />
      <Route path="file-tree" element={<FileTree />} />
    </Routes>
  </BrowserRouter>
);
