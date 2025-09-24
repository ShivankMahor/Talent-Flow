import { useDroppable } from "@dnd-kit/core";
import CandidateCardDraggable from "./CandidateCardDraggable";

const stageStyles = {
  applied: {
    container: "bg-gray-50 border-gray-400",
    header: "bg-gray-200 text-gray-800 border-b border-gray-400",
  },
  screen: {
    container: "bg-yellow-50 border-yellow-400",
    header: "bg-yellow-200 text-yellow-800 border-b border-yellow-400",
  },
  tech: {
    container: "bg-purple-50 border-purple-400",
    header: "bg-purple-200 text-purple-800 border-b border-purple-400",
  },
  offer: {
    container: "bg-blue-50 border-blue-400",
    header: "bg-blue-200 text-blue-800 border-b border-blue-400",
  },
  hired: {
    container: "bg-green-50 border-green-400",
    header: "bg-green-200 text-green-800 border-b border-green-400",
  },
  rejected: {
    container: "bg-red-50 border-red-400",
    header: "bg-red-200 text-red-800 border-b border-red-400",
  },
};

export default function StageColumn({ id, candidates, onLastVisible }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const droppableRef = candidates.length === 0 ? setNodeRef : null;
  const stage = stageStyles[id] || {
    container: "bg-white border-gray-300",
    header: "bg-gray-100 text-gray-700 border-b border-gray-300",
  };

  return (
    <div className="flex flex-col rounded shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className={`px-3 py-2 font-semibold capitalize flex justify-between items-center ${stage.header}`}
      >
        <span>{id}</span>
        <span className="text-sm font-medium">{candidates.length}</span>
      </div>

      {/* Body */}
      <div
        ref={droppableRef}
        className={`flex flex-col gap-2 p-3 border-x border-b min-h-[300px] transition-colors
          ${stage.container} ${isOver ? "ring-2 ring-blue-400" : ""}`}
      >
        {candidates.length === 0 ? (
          <div className="text-gray-400 italic">Drop here</div>
        ) : (
          candidates.map((c, idx) => (
            <div
              key={c.id}
              id={idx === candidates.length - 1 ? `${id}-last` : undefined}
            >
              <CandidateCardDraggable candidate={c} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
