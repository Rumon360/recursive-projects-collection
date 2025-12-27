import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

function Counter() {
  const [count, setCount] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [positionX, setPositionX] = useState<number>(0);
  const [rotation, setRotation] = useState<number>(0);

  const ACTIVATION_THRESHOLD = 60;

  function handlePointerDown(ev: React.PointerEvent<HTMLDivElement>) {
    setIsDragging(true);
    ev.currentTarget.setPointerCapture(ev.pointerId);
  }

  function handlePointerMove(ev: React.PointerEvent<HTMLDivElement>) {
    if (!isDragging || !wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distance = ev.clientX - centerX;

    const dampenedX =
      Math.sign(distance) * Math.pow(Math.abs(distance), 0.85) * 1.5;

    const maxRotation = 4;
    const nextRotation = (dampenedX / rect.width) * maxRotation;

    setPositionX(dampenedX);
    setRotation(nextRotation);
  }

  function handlePointerUp(ev: React.PointerEvent<HTMLDivElement>) {
    if (positionX >= ACTIVATION_THRESHOLD) {
      setCount((prev) => prev + 1);
    } else if (positionX <= -ACTIVATION_THRESHOLD) {
      setCount((prev) => prev - 1);
    }

    setIsDragging(false);
    ev.currentTarget.releasePointerCapture(ev.pointerId);
    setPositionX(0);
    setRotation(0);
  }

  return (
    <div
      ref={wrapperRef}
      style={{
        transform: `translateX(${rotation * 3}px) rotate(${rotation}deg)`,
        transition: isDragging
          ? "none"
          : "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
      className="relative w-48 h-20 py-2 px-6 flex items-center justify-between rounded-full counter-bs bg-linear-to-b from-[#2a2a2a] to-[#3a3a3a]"
    >
      <Minus
        style={{
          opacity: positionX <= -ACTIVATION_THRESHOLD ? 1 : 0.4,
          transition: "opacity 0.15s ease",
        }}
        className="icon text-white"
      />

      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        style={{
          transform: `translate(calc(-50% + ${positionX}px), -50%)`,
          cursor: isDragging ? "grabbing" : "grab",
          transition: isDragging
            ? "none"
            : "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        className="absolute left-1/2 top-1/2 z-10 counter-value-wrapper touch-none"
      >
        <span className="text-2xl font-medium text-white pointer-events-none select-none">
          {count}
        </span>
      </div>

      <Plus
        style={{
          opacity: positionX >= ACTIVATION_THRESHOLD ? 1 : 0.4,
          transition: "opacity 0.15s ease",
        }}
        className="icon text-white"
      />
    </div>
  );
}

export default Counter;
