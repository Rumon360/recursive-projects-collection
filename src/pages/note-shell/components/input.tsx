import { useEffect, useRef, useState, type FormEvent } from "react";
import { getBrowserInfo } from "../utils";

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function ShellInput({ value, setValue, handleSubmit }: Props) {
  const [browser, setBrowser] = useState("Detecting...");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  useEffect(() => {
    setBrowser(getBrowserInfo());
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <div className="fixed inset-0 flex items-end justify-center p-4 bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-md shadow-xl px-4 py-3 text-sm"
      >
        <div className="flex flex-wrap items-center gap-2 text-xs mb-2 select-none opacity-80">
          <span className="text-emerald-400 font-medium">user@{browser}</span>
          <span className="text-yellow-300 font-medium">~/notes</span>
          <span className="text-sky-400">
            (<span className="text-rose-400">main</span>)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-semibold text-xs">$</span>
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            placeholder="add a note…"
            className="flex-1 text-xs bg-transparent resize-none overflow-hidden outline-none border-none p-0 m-0 leading-relaxed text-neutral-100 placeholder:text-neutral-500 caret-emerald-400"
          />
        </div>
      </form>
    </div>
  );
}

export default ShellInput;
