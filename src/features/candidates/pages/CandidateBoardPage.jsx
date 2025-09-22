// import {
//   DndContext,
//   closestCorners,
//   useSensor,
//   useSensors,
//   PointerSensor,
// } from "@dnd-kit/core";
// import {
//   arrayMove,
//   SortableContext,
//   rectSortingStrategy,
// } from "@dnd-kit/sortable";
// import { useCandidates } from "../context/CandidatesContext";
// import CandidateCard from "../components/CandidateCard";
// import { toast } from "react-toastify";


// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export default function CandidatesBoard() {
//   const { optimisticCandidates, handleStageChange } = useCandidates();

//   const sensors = useSensors(
//     useSensor(PointerSensor, {
//       activationConstraint: { distance: 5 },
//     })
//   );

//   const onDragEnd = (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const candidateId = active.id;
//     const newStage = over.id;

//     const candidate = optimisticCandidates.find((c) => c.id === candidateId);
//     if (!candidate || candidate.stage === newStage) return;

//     // Optimistic update
//     handleStageChange(candidate, newStage)
//       .then(() => {
//         toast.success(`Moved ${candidate.name} → ${newStage} ✅`);
//       })
//       .catch(() => {
//         toast.error(`Failed to move ${candidate.name} ❌`);
//       });
//   };

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCorners}
//       onDragEnd={onDragEnd}
//     >
//       <div className="grid grid-cols-6 gap-4">
//         {stages.map((stage) => (
//           <div
//             key={stage}
//             id={stage}
//             className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-2"
//           >
//             <h3 className="font-semibold mb-2 capitalize">{stage}</h3>
//             <SortableContext items={optimisticCandidates.filter(c => c.stage === stage).map(c => c.id)} strategy={rectSortingStrategy}>
//               <div className="space-y-2">
//                 {optimisticCandidates
//                   .filter((c) => c.stage === stage)
//                   .map((candidate) => (
//                     <CandidateCard key={candidate.id} candidate={candidate} />
//                   ))}
//               </div>
//             </SortableContext>
//           </div>
//         ))}
//       </div>
//     </DndContext>
//   );
// }










// import {
//   DndContext,
//   closestCorners,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import {
//   rectSortingStrategy,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { useCandidates } from "../context/CandidatesContext";
// import SortableCandidateCard from "../components/SortableCandidateCard";
// import { toast } from "react-toastify";
// import Navbar from "../../../components/Navbar";

// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export default function CandidateBoard() {
//   const { optimisticCandidates, handleStageChange } = useCandidates();

//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = async (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const candidateId = active.id;
//     const newStage = over.id; // 👈 column id = stage

//     const candidate = optimisticCandidates.find((c) => c.id === candidateId);
//     if (!candidate || candidate.stage === newStage) return;

//     try {
//       await handleStageChange(candidate, newStage); // 👈 optimistic update inside context
//       toast.success(`Moved ${candidate.name} → ${newStage} ✅`);
//     } catch {
//       toast.error(`Failed to move ${candidate.name} ❌`);
//     }
//   };

//   return (
//     <div>
//       <Navbar/>
//       <DndContext
//         sensors={sensors}
//         collisionDetection={closestCorners}
//         onDragEnd={handleDragEnd}
//       >
//         <div className="grid grid-cols-6 gap-4 m-2">
//           {stages.map((stage) => (
//             <div
//               key={stage}
//               id={stage}
//               className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 flex flex-col"
//             >
//               <h3 className="font-semibold mb-2 capitalize">{stage}</h3>
//               <SortableContext
//                 items={optimisticCandidates
//                   .filter((c) => c.stage === stage)
//                   .map((c) => c.id)}
//                 strategy={rectSortingStrategy}
//               >
//                 <div className="flex flex-col gap-2">
//                   {optimisticCandidates
//                     .filter((c) => c.stage === stage)
//                     .map((candidate) => (
//                       <SortableCandidateCard key={candidate.id} candidate={candidate} />
//                     ))}
//                 </div>
//               </SortableContext>
//             </div>
//           ))}
//         </div>
//       </DndContext>
//     </div>
//   );
// }



// import {
//   DndContext,
//   closestCorners,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { useCandidates } from "../context/CandidatesContext";
// import VirtualizedColumn from "../components/VirtualizedColumn";
// import Navbar from "../../../components/Navbar";
// import { toast } from "react-toastify";

// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export default function CandidateBoard() {
//   const { optimisticCandidates, handleStageChange, loadMore, loading, hasMore } =
//     useCandidates();

//   const sensors = useSensors(useSensor(PointerSensor));

//   const handleDragEnd = async (event) => {
//     const { active, over } = event;
//     if (!over) return;

//     const candidateId = active.id;
//     const newStage = over.id;

//     const candidate = optimisticCandidates.find((c) => c.id === candidateId);
//     if (!candidate || candidate.stage === newStage) return;

//     try {
//       await handleStageChange(candidate, newStage);
//       toast.success(`Moved ${candidate.name} → ${newStage} ✅`);
//     } catch {
//       toast.error(`Failed to move ${candidate.name} ❌`);
//     }
//   };

//   return (
//     <div className="h-screen bg-[var(--color-background)]">
//       <Navbar />
//       <div className="grid grid-cols-6 gap-4 p-4">
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCorners}
//           onDragEnd={handleDragEnd}
//         >
//           {stages.map((stage) => (
//             <VirtualizedColumn
//               key={stage}
//               stage={stage}
//               candidates={optimisticCandidates.filter((c) => c.stage === stage)}
//               loadMore={loadMore}
//               loading={loading}
//               hasMore={hasMore}
//             />
//           ))}
//         </DndContext>
//       </div>
//     </div>
//   );
// }



// import React from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { useCandidates } from "../context/CandidatesContext";
// import CandidateCard from "./CandidateCard";

// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export default function CandidateBoard() {
//   const { optimisticCandidates, handleStageChange } = useCandidates();

//   // Group candidates by stage
//   const grouped = stages.reduce((acc, stage) => {
//     acc[stage] = optimisticCandidates.filter((c) => c.stage === stage);
//     return acc;
//   }, {});

//   const onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;

//     if (!destination) return;

//     // no movement
//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const candidateId = draggableId;
//     const candidate = optimisticCandidates.find((c) => c.id.toString() === candidateId);

//     if (candidate && candidate.stage !== destination.droppableId) {
//       // update candidate stage in context
//       handleStageChange(candidate, destination.droppableId);
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <div className="grid grid-cols-6 gap-4 p-4">
//         {stages.map((stage) => (
//           <Droppable droppableId={stage} key={stage}>
//             {(provided, snapshot) => (
//               <div
//                 ref={provided.innerRef}
//                 {...provided.droppableProps}
//                 className={`rounded-lg p-3 border bg-[var(--color-surface)] ${
//                   snapshot.isDraggingOver ? "bg-[var(--color-surface-alt)]" : ""
//                 }`}
//               >
//                 <h3 className="font-semibold capitalize mb-2">{stage}</h3>
//                 {grouped[stage].map((candidate, index) => (
//                   <Draggable
//                     draggableId={candidate.id.toString()}
//                     index={index}
//                     key={candidate.id}
//                   >
//                     {(provided, snapshot) => (
//                       <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         className={`mb-2 ${
//                           snapshot.isDragging ? "opacity-75" : ""
//                         }`}
//                       >
//                         <CandidateCard candidate={candidate} />
//                       </div>
//                     )}
//                   </Draggable>
//                 ))}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropContext>
//   );
// }

// import Navbar from "../../../components/Navbar"
// import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
// import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

// export default function CandidateBoardPage(){
//   const screen = [
//     {id:'1', name:"job 1"},
//     {id:'4', name:"job 4"},
//     {id:'9', name:"job 9"},
//   ]
//   const applied = [
//     {id:'2', name:"job 2"},
//     {id:'3', name:"job 3"},
//     {id:'7', name:"job 7"},
//   ]
//   const tech = [
//     {id:'5', name:"job 5"},
//     {id:'6', name:"job 6"},
//     {id:'8', name:"job 8"},
//   ]
//   const sensors = useSensors(
//     useSensor(PointerSensor),
//     useSensor(KeyboardSensor, {
//       coordinateGetter: sortableKeyboardCoordinates,
//     })
//   );

//   function handleDragEnd(data){
//     console.log(data.over.id,data.active.data.current,); 
//   }
//   // function handleDragOver(data){
//   //   console.log("Darg over: ",data);
//   // }
//   return(
//     <div>
//       <Navbar/>
//       <div>
//         <DndContext 
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragEnd={handleDragEnd}
//           // onDragOver={handleDragOver}
//         >
//           <div className="flex gap-3">
//             <Droppable stage={'applied'} data={applied}></Droppable>
//             <Droppable stage={'screen'} data={screen}></Droppable>
//             <Droppable stage={'tech'} data={tech}></Droppable>
//           </div>
          
//         </DndContext>
//       </div>
//     </div>
//   )
// }

// import {CSS} from '@dnd-kit/utilities';



// function Droppable({stage,data}) {
//   const {setNodeRef} = useDroppable({
//     id: stage,
//   });
//   const idSet = data.map(job => job.id)
//   console.log(idSet)
//   return (
//     <div className="flex flex-col gap-3" ref={setNodeRef}>
//       <h1>{stage}</h1>
//       <SortableContext 
//         items={idSet}
//         strategy={verticalListSortingStrategy}
//         >
//         {data.map(job => <SortableItem key={job.id} job={job} />)}
//       </SortableContext>
//     </div>
//   )
// }
// export function SortableItem(props) {
//   console.log("Props",props)
//   const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id: props.id});
//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };
  
//   return (
//     <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
//       {props.job.name}
//     </div>
//   );


  // function Draggable({data,stage,idx}) {
  //   // console.log(data)
  //   const {attributes, listeners, setNodeRef, transform} = useDraggable({
  //     id: data.id,
  //     data:{
  //       index:idx
  //     }
  //   })
  //   const style = {
  //     transform: CSS.Translate.toString(transform),
  //   }
  //   return (
  //     <div className="p-2 border" ref={setNodeRef} style={style} {...listeners} {...attributes}>
  //       {data.name} {stage}
  //     </div>
  //   );
  // }
// }



//mostly working
// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
// import { useCandidates } from "../context/CandidatesContext";
// import StageColumn from "../components/StageColumn";
// import Navbar from '../../../components/Navbar'
// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export default function CandidateBoard() {
//   const { optimisticCandidates, handleStageChange } = useCandidates();
//   const [activeId, setActiveId] = useState(null);

//   const sensors = useSensors(useSensor(PointerSensor));

//   // group candidates by stage
//   const grouped = stages.reduce((acc, stage) => {
//     acc[stage] = optimisticCandidates.filter((c) => c.stage === stage);
//     return acc;
//   }, {});

//   const findContainer = (id) =>
//     stages.find((stage) => grouped[stage].some((c) => c.id.toString() === id)) || null;

//   const handleDragOver = ({ active, over }) => {
//     if (!over) return;

//     const from = findContainer(active.id);
//     const to = stages.includes(over.id) ? over.id : findContainer(over.id);
//     if (!from || !to || from === to) return;

//     // candidate moved to new stage
//     const candidate = optimisticCandidates.find((c) => c.id.toString() === active.id);
//     if (candidate) {
//       handleStageChange(candidate, to);
//     }
//   };

//   const handleDragEnd = ({ active, over }) => {
//     setActiveId(null);
//     if (!over) return;

//     const from = findContainer(active.id);
//     const to = findContainer(over.id);
//     if (from && to && from === to) {
//       // reordering inside same stage
//       // (optional, you can update context order here if server supports it)
//     }
//   };

//   return (
//     <div>
//       <Navbar/>
//         <DndContext
//           sensors={sensors}
//           collisionDetection={closestCenter}
//           onDragStart={({ active }) => setActiveId(active.id)}
//           onDragOver={handleDragOver}
//           onDragEnd={handleDragEnd}
//           onDragCancel={() => setActiveId(null)}
//           >
//           <div className="grid grid-cols-6 gap-4 p-6">
//             {stages.map((stage) => (
//               <SortableContext
//               key={stage}
//               items={grouped[stage].map((c) => c.id.toString())}
//               strategy={verticalListSortingStrategy}
//               >
//                 <StageColumn id={stage} candidates={grouped[stage]} />
//               </SortableContext>
//             ))}
//           </div>
//         </DndContext>
//     </div>
//   );
// }








import React, { useState } from "react";
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
import CandidateCardItem from "../components/CandidateCardItem"; // presentational card
import Pagination from "../../../components/Pagination"; // 👈 your builtin pagination
import { useBoardCandidates } from "../context/BoardCandidatesContext";

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

export default function CandidateBoardPage() {
  const { stageCandidates, page, setPage, totalPages, handleStageChange } = useBoardCandidates()
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
    <div>
      <Navbar />

      {/* Pagination bar */}
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(newPage) => setPage(newPage)}
        withJump
      />

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveId(null)}
      >
        <div className="grid grid-cols-6 gap-4 p-6">
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
    </div>
  );
}
