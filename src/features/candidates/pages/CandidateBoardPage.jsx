// import { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   DragOverlay,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import Navbar from "../../../components/Navbar";
// import StageColumn from "../components/StageColumn";
// import CandidateCardItem from "../components/CandidateCardItem"; // presentational card
// import Pagination from "../../../components/Pagination"; // 👈 your builtin pagination
// import { useBoardCandidates } from "../context/BoardCandidatesContext";
// import Card from "../../../components/Card";
// import CandidatesBoardToolbar from "../components/CandidatesBoardToolbar";

// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export default function CandidateBoardPage() {
//   const { stageCandidates, page, setPage, totalPages, handleStageChange } = useBoardCandidates()
//   const [activeId, setActiveId] = useState(null);
//   console.log(stageCandidates)
//   const sensors = useSensors(useSensor(PointerSensor));

//   // helper: find a candidate by id
//   const findCandidate = (id) => {
//     for (const stage of stages) {
//       const found = stageCandidates[stage].find((c) => c.id.toString() === id);
//       if (found) return found;
//     }
//     return null;
//   };

//   const handleDragStart = ({ active }) => setActiveId(active.id);

//   const handleDragOver = ({ active, over }) => {
//     if (!over) return;
//     const activeCandidate = findCandidate(active.id);
//     if (!activeCandidate) return;

//     const overStage = stages.includes(over.id)
//       ? over.id
//       : stages.find((s) =>
//           stageCandidates[s].some((c) => c.id.toString() === over.id)
//         );

//     if (overStage && overStage !== activeCandidate.stage) {
//       handleStageChange(activeCandidate, overStage);
//     }
//   };

//   const handleDragEnd = () => setActiveId(null);

//   return (
//     <div className="bg-[var(--color-surface-alt)]">
//       <Navbar />
//       <Card className="m-4">
//         <CandidatesBoardToolbar/>
//         <div className="border-b w-full -mx-4 mb-4 -mt-2 border-[var(--color-border)]"></div>

//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragStart={handleDragStart}
//           onDragOver={handleDragOver}
//           onDragEnd={handleDragEnd}
//           onDragCancel={() => setActiveId(null)}
//           >
//           <div className="grid grid-cols-6 gap-4 ">
//             {stages.map((stage) => (
//               <SortableContext
//               key={stage}
//               items={stageCandidates[stage].map((c) => c.id.toString())}
//               strategy={verticalListSortingStrategy}
//               >
//                 <StageColumn id={stage} candidates={stageCandidates[stage]} />
//               </SortableContext>
//             ))}
//           </div>

//           {/* Drag Overlay */}
//           <DragOverlay>
//             {activeId ? (
//               <CandidateCardItem candidate={findCandidate(activeId)} />
//             ) : null}
//           </DragOverlay>
//         </DndContext>
//         <Pagination
//           page={page}
//           totalPages={totalPages}
//           onChange={(newPage) => setPage(newPage)}
//           withJump
//         />
//       </Card>
//     </div>
//   );
// }










import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Navbar from "../../../components/Navbar";
import StageColumn from "../components/StageColumn";
import CandidateCardItem from "../components/CandidateCardItem";
import Pagination from "../../../components/Pagination";
import { useBoardCandidates } from "../context/BoardCandidatesContext";
import Card from "../../../components/Card";
import CandidatesBoardToolbar from "../components/CandidatesBoardToolbar";
import Loader from "../../../components/Loader"; // ✅ import loader

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

export default function CandidateBoardPage() {
  const {
    stageCandidates,
    page,
    setPage,
    totalPages,
    handleStageChange,
    loading, // ✅ use loading from context
  } = useBoardCandidates();

  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  // helper: find a candidate by id
  const findCandidate = (id) => {
    for (const stage of stages) {
      const found = stageCandidates[stage].find((c) => c.id.toString() === id);
      if (found) return found;
    }
    return null;
  };

  const handleDragStart = ({ active }) => setActiveId(active.id);

  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    const activeCandidate = findCandidate(active.id);
    if (!activeCandidate) return;

    const overStage = stages.includes(over.id)
      ? over.id
      : stages.find((s) =>
          stageCandidates[s].some((c) => c.id.toString() === over.id)
        );

    if (overStage && overStage !== activeCandidate.stage) {
      handleStageChange(activeCandidate, overStage);
    }
  };

  const handleDragEnd = () => setActiveId(null);

  return (
    <div className="bg-[var(--color-surface-alt)] min-h-screen">
      <Navbar />
      <Card className="m-4">
        <CandidatesBoardToolbar />
        <div className="border-b w-full -mx-4 mb-4 -mt-2 border-[var(--color-border)]"></div>

        {/* ✅ Conditional loading */}
        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Loader />
          </div>
        ) : (
          <>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={() => setActiveId(null)}
            >
              <div className="grid grid-cols-6 gap-4">
                {stages.map((stage) => (
                  <SortableContext
                    key={stage}
                    items={stageCandidates[stage].map((c) => c.id.toString())}
                    strategy={verticalListSortingStrategy}
                  >
                    <StageColumn id={stage} candidates={stageCandidates[stage]} />
                  </SortableContext>
                ))}
              </div>

              {/* Drag Overlay */}
              <DragOverlay>
                {activeId ? (
                  <CandidateCardItem candidate={findCandidate(activeId)} />
                ) : null}
              </DragOverlay>
            </DndContext>

            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={(newPage) => setPage(newPage)}
              withJump
            />
          </>
        )}
      </Card>
    </div>
  );
}
