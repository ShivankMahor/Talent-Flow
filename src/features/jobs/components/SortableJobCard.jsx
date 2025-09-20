// // features/jobs/components/SortableJobCard.jsx
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
// import JobCard from "./JobCard";

// export default function SortableJobCard({ job, onEdit, onArchive }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: job.id });
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     cursor: "grab",
//   };

//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       <JobCard job={job} onEdit={() => onEdit(job)} onArchive={() => onArchive(job)} />
//     </div>
//   );
// }

// SortableJobCard.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import JobCard from "./JobCard";

export default function SortableJobCard({ job }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Pass listeners only to a handle */}
      <JobCard
        job={job}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
