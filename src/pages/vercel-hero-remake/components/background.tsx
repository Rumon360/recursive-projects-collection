import { type CSSProperties } from "react";
import "../styles.css";
import BackgoundLines from "./bg-lines";

function Background() {
  return (
    <>
      <div
        style={
          {
            "--angle": "180deg",
            "--offset": "70%",
          } as CSSProperties
        }
        className="bg-conic-gradient absolute size-full"
      />
      <div
        className="absolute mt-16 size-full scale-150 md:mt-0 md:scale-100"
        style={{
          background:
            "radial-gradient(150% 150% at 50% 140%, transparent 0, transparent 50%, #000 75%)",
        }}
      />
      <BackgoundLines />
    </>
  );
}

export default Background;
