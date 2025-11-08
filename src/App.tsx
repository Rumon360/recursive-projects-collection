import { Link } from "react-router";

function App() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
          Recursive Projects Collection
        </h1>

        <p className="text-lg text-neutral-500 leading-relaxed">
          A collection of minimal, interactive React + TypeScript experiments
          exploring recursion in UI and data structures.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/partitioner"
            className="px-6 py-3 border border-neutral-300 rounded-lg transition-all duration-200"
          >
            🪟 Recursive Window Partitioner
          </Link>

          <Link
            to="/file-tree"
            className="px-6 py-3 border border-neutral-300 rounded-lg transition-all duration-200"
          >
            📁 Recursive File Structure
          </Link>
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
