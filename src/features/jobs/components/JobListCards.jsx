// features/jobs/components/JobsListCards.jsx
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableJobCard from "./SortableJobCard";

export default function JobsListCards({ jobs, onReorder }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
console.log("[JobsListCards] rendering with:", jobs)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const fromJob = jobs.find((job) => job.id === active.id);
    const toJob = jobs.find((job) => job.id === over.id);

    if (!fromJob || !toJob) return;

    // console.log("Dragged:", active.id, "→", over.id);
    // console.log("Orders:", fromJob.order, "→", toJob.order);
    onReorder(active.id, fromJob, toJob);
    
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={jobs.map((job) => job.id)} // numbers
        strategy={verticalListSortingStrategy}
      >
        {jobs.map((job) => (
          <SortableJobCard key={job.id} job={job} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
