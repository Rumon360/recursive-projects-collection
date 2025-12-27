import Counter from "./components/counter";
import "./index.css";

function ElasticCounter() {
  return (
    <div className="h-screen bg-[#2A2A2A] text-zinc-50 grid place-content-center">
      <Counter />
    </div>
  );
}

export default ElasticCounter;
