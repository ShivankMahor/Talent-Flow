import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import CandidateBoardCard from "./CandidateBoardCard";

export default function CandidateCardDraggable({ candidate }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: candidate.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing overflow-hidden"
    >
      <CandidateBoardCard candidate={candidate} />
    </div>
  );
}


// import React, { useEffect } from "react";
// import { useSortable } from "@dnd-kit/sortable";
// import { useDndContext } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
// import CandidateCard from "./CandidateCard";

// export default function CandidateCardDraggable({ candidate, onOverContainer }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//   useSortable({ id: candidate.id.toString() });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="cursor-grab active:cursor-grabbing"
//     >
//       <CandidateCard candidate={candidate} />
//     </div>
//   );
// }
