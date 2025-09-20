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

export default function JobsListCards({ jobs, onReorder}) {
  console.log(jobs)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromJob = jobs.find((job) => job.id === active.id);
    const toJob = jobs.find((job) => job.id === over.id);
    if (!fromJob || !toJob) return;
    onReorder(active.id, fromJob, toJob);
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="p-6 text-center text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-lg">
        <p className="text-lg font-medium">No jobs found</p>
        <p className="text-sm">Try adjusting your filters or create a new job.</p>
      </div>
    );
  }
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
          <SortableJobCard key={job.id} job={job}/>
        ))}
      </SortableContext>
    </DndContext>
  );
}
