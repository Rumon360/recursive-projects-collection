import { useEffect, useRef, useState, type FormEvent } from "react";
import { getBrowserInfo } from "../utils";
import { Terminal } from "lucide-react";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function ShellInput({ value, setValue, handleSubmit }: Props) {
  const [browser, setBrowser] = useState("web-shell");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    setBrowser(getBrowserInfo().toLowerCase().replace(/\s+/g, "-"));
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-6 px-4 flex items-end justify-center w-full z-50">
      <form
        onSubmit={handleSubmit}
        className="shell-scroll w-full max-h-64 overflow-y-auto max-w-2xl border border-white/10 bg-zinc-900/90 backdrop-blur-md shadow-2xl px-4 py-3 text-sm"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs mb-2 select-none opacity-70 font-mono">
          <span className="text-emerald-400">user@{browser}</span>
          <span className="text-zinc-500">:</span>
          <span className="text-yellow-300">~/notes</span>
          <span className="text-sky-400">
            (<span className="text-rose-400">main</span>)
          </span>
        </div>

        <div className="flex items-start gap-2">
          <Terminal size={14} className="mt-0.5 text-emerald-400/70 shrink-0" />
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            placeholder="Write a note and press Enter..."
            className="flex-1 text-xs bg-transparent resize-none overflow-hidden outline-none border-none p-0 m-0 leading-relaxed text-zinc-100 placeholder:text-zinc-600 caret-emerald-500"
          />
        </div>
      </form>
    </div>
  );
}

export default ShellInput;
