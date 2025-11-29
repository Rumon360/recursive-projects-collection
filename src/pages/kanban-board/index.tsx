import Board from "./components/board";

function KanbarBoard() {
  return (
    <div className="h-screen w-full p-8">
      <div className="h-16">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight text-balance">
          Kanban Board
        </h1>
      </div>
      <Board />
    </div>
  );
}

export default KanbarBoard;
