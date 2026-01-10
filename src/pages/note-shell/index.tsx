import { useState, type FormEvent } from "react";
import ShellInput from "./components/input";

function NoteShell() {
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim() === "") return;
    setValue("");
  };

  return (
    <div className="h-screen w-full font-terminal overflow-hidden">
      <ShellInput
        value={value}
        setValue={setValue}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default NoteShell;
