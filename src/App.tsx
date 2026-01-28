import { Link } from "react-router";
import {
  LayoutGrid,
  FolderTree,
  CheckSquare,
  MessageSquare,
  Columns,
  Timer,
  Terminal,
  Heart,
  ChevronRight,
  Trash,
  ListChevronsUpDown,
} from "lucide-react";

const projects = [
  {
    name: "Recursive Window Partitioner",
    icon: <LayoutGrid size={18} strokeWidth={2.5} />,
    link: "/partitioner",
    slug: "recursive-window-partitioner",
  },
  {
    name: "Recursive File Structure",
    icon: <FolderTree size={18} strokeWidth={2.5} />,
    link: "/file-tree",
    slug: "recursive-file-structure",
  },
  {
    name: "Checkbox Planner Tree",
    icon: <CheckSquare size={18} strokeWidth={2.5} />,
    link: "checkbox",
    slug: "checkbox-planner-tree",
  },
  {
    name: "Nested Comments",
    icon: <MessageSquare size={18} strokeWidth={2.5} />,
    link: "nested-comments",
    slug: "nested-comments-thread",
  },
  {
    name: "Kanban Board",
    icon: <Columns size={18} strokeWidth={2.5} />,
    link: "kanban-board",
    slug: "kanban-board-ui",
  },
  {
    name: "Elastic Counter",
    icon: <Timer size={18} strokeWidth={2.5} />,
    link: "/elastic-counter",
    slug: "elastic-counter-motion",
  },
  {
    name: "NoteShell",
    icon: <Terminal size={18} strokeWidth={2.5} />,
    link: "/note-shell",
    slug: "noteshell-terminal",
  },
  {
    name: "Hold To Delete",
    icon: <Trash size={18} strokeWidth={2.5} />,
    link: "/hold-to-delete",
    slug: "hold-to-delete",
  },
  {
    name: "Tier List",
    icon: <ListChevronsUpDown size={18} strokeWidth={2.5} />,
    link: "/tier-list",
    slug: "tier-list",
  },
];

function App() {
  return (
    <main className="min-h-screen  selection:bg-zinc-700">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <header className="mb-14">
          <h1 className="text-4xl font-bold tracking-tighter mb-4 text-white">
            React Projects Collection
          </h1>
          <p className="max-w-2xl text-zinc-400 text-base md:text-lg leading-relaxed">
            A curated gallery of functional components and interactive
            interfaces exploring the power of React, TypeScript, and elegant
            data structures.
          </p>
        </header>

        <div className="border border-zinc-800 overflow-hidden">
          {projects.map((project, index) => (
            <Link
              key={project.link}
              to={project.link}
              className={`group flex items-center justify-between p-5 transition-all duration-150 hover:bg-zinc-800/40 ${
                index !== projects.length - 1
                  ? "border-b border-zinc-800/50"
                  : ""
              }`}
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center border border-zinc-800 bg-zinc-800 text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-100 transition-all">
                  {project.icon}
                </div>

                <div className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-bold tracking-tight text-zinc-200 group-hover:text-white transition-colors">
                    {project.name}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest opacity-80">
                    {project.slug}
                  </span>
                </div>
              </div>

              <ChevronRight
                size={20}
                className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all duration-200"
              />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="pt-10 border-t border-zinc-900 mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-sm">
              <a
                href="https://hmk360.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white font-semibold transition-colors"
              >
                Hasin Mahtub Khan
              </a>

              <span className="hidden md:block text-zinc-800">|</span>

              <div className="flex items-center font-medium gap-2 text-zinc-500 cursor-default group">
                <span>Built with</span>
                <Heart
                  size={14}
                  className="text-red-600 fill-red-600 transition-transform group-hover:scale-125"
                />
              </div>
            </div>

            <p className="text-xs text-zinc-500">
              React // TypeScript // TailwindCSS
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default App;
