import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DraggableCandidateCard from "./DraggableCandidateCard";

export default function SortableCandidateCard({ candidate }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: candidate.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <DraggableCandidateCard candidate={candidate} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}
