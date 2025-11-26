import { Link } from "react-router";

const projects = [
  {
    name: "🪟 Recursive Window Partitioner",
    link: "/partitioner",
  },
  {
    name: "📁 Recursive File Structure",
    link: "/file-tree",
  },
  {
    name: "✅ Checkbox Planner Tree",
    link: "checkbox",
  },
  {
    name: "🪹 Nested Comments",
    link: "nested-comments",
  },
];

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="max-w-xl mx-auto text-4xl sm:text-5xl font-bold tracking-tight">
          Recursive Projects Collection
        </h1>

        <p className="text-lg text-neutral-500 leading-relaxed">
          A collection of minimal, interactive React + TypeScript experiments
          exploring recursion in UI and data structures.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 pt-4">
          {projects.map((project) => (
            <Link
              key={project.link}
              to={project.link}
              className="px-6 py-3 border border-neutral-300 rounded-lg transition-all duration-200"
            >
              {project.name}
            </Link>
          ))}
        </div>
        <p className="text-sm text-neutral-400">
          Built with React, TypeScript & TailwindCSS
        </p>
        <footer className="pt-12 text-sm text-neutral-400">
          Built with <span className="text-red-500">❤️</span> by{" "}
          <a
            href="https://hmk360.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
          >
            Hasin Mahtub Khan
          </a>
        </footer>
      </div>
    </main>
  );
}

export default App;
