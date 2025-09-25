// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   useDroppable,
// } from "@dnd-kit/core";
// import {
//   horizontalListSortingStrategy,
//   rectSwappingStrategy,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";

// export default function Test() {
//   const [containers, setContainers] = useState({
//     A: ["a1", "a2", "a3"],
//     B: ["b1", "b2"],
//   });
//   const [activeId, setActiveId] = useState(null);
//   const sensors = useSensors(useSensor(PointerSensor));

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragStart={({ active }) => setActiveId(active.id)}
//       onDragOver={handleDragOver}
//       onDragEnd={handleDragEnd}
//       onDragCancel={() => setActiveId(null)}
//     >
//       <div className="flex gap-6 p-6">
//         {Object.keys(containers).map((containerId) => (
//           <SortableContext
//             key={containerId}
//             items={containers[containerId]}
//             strategy={verticalListSortingStrategy}
//           >
//             <Column id={containerId} items={containers[containerId]} />
//           </SortableContext>
//         ))}
//       </div>
//     </DndContext>
//   );

//   function handleDragOver(event) {
//     const { active, over } = event;
//     if (!over) return;

//     const from = findContainerContaining(active.id);
//     const to = findContainerForDroppable(over.id);

//     if (!from || !to || from === to) return;

//     setContainers((prev) => {
//       const itemIndex = prev[from].indexOf(active.id);
//       if (itemIndex === -1) return prev;

//       const next = { ...prev };
//       next[from] = prev[from].filter((id) => id !== active.id);
//       next[to] = [...prev[to], active.id]; // append at end
//       return next;
//     });
//   }

//   function handleDragEnd(event) {
//     const { active, over } = event;
//     setActiveId(null);
//     if (!over) return;

//     const from = findContainerContaining(active.id);
//     const to = findContainerContaining(over.id);

//     if (from && to && from === to) {
//       setContainers((prev) => {
//         const items = Array.from(prev[from]);
//         const oldIndex = items.indexOf(active.id);
//         const newIndex = items.indexOf(over.id);
//         items.splice(oldIndex, 1);
//         items.splice(newIndex, 0, active.id);
//         return { ...prev, [from]: items };
//       });
//     }
//     // cross-column moves are already handled in onDragOver
//   }

//   function findContainerContaining(id) {
//     return Object.keys(containers).find((key) =>
//       containers[key].includes(id)
//     );
//   }

//   function findContainerForDroppable(overId) {
//     return Object.keys(containers).includes(overId)
//       ? overId
//       : findContainerContaining(overId);
//   }
// }

// // function Column({
// //   id,
// //   items,
// // }){
// //   return (
// //     <div className="flex flex-col gap-2 p-4 border rounded w-48 min-h-[200px]">
// //       <h2 className="font-bold mb-2">Column {id}</h2>
      
// //       {items.map((item) => (
// //         <SortableItem key={item} id={item} />
// //       ))}
// //     </div>
// //   );
// // }
// function Column({
//   id,
//   items,
// }){
//   const {setNodeRef, isOver} = useDroppable({
//     id
//   })
//   return (
//     <div>
//       <h2 className="font-bold mb-2">Column {id}</h2>
//       {items.length === 0 ? 
//       <div
//         ref={setNodeRef}
//         className={`flex flex-col gap-2 p-4 border-2 rounded w-48 min-h-[200px] ${
//             isOver && items.length === 0
//               ? "bg-blue-50 border-blue-400"
//               : "border-gray-300"
//           }`}
          
//       >
        
//         {items.length === 0 && (
//             <div className="text-gray-400 italic">Drop here</div>
//           )}
//         {items.map((item) => (
//           <SortableItem key={item} id={item} />
//         ))}
//       </div>
//       :
//       <div
//         className={`flex flex-col gap-2 p-4 border-2 rounded w-48 min-h-[200px]`}
//       >
//         {items.map((item) => (
//           <SortableItem key={item} id={item} />
//         ))}
//       </div>
//       }
//     </div>
//   )
// }
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";
//  function SortableItem({ id }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });

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
//       className="p-2 border rounded bg-gray-100 cursor-grab"
//     >
//       {id}
//     </div>
//   );
// }
















// import React, { useState } from "react";
// import {
//   DndContext,
//   closestCenter,
//   PointerSensor,
//   useSensor,
//   useSensors,
//   useDroppable,
// } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// export default function Test() {
//   const [containers, setContainers] = useState({
//     A: ["a1", "a2", "a3"],
//     B: ["b1", "b2"],
//   });
//   const [activeId, setActiveId] = useState(null);
//   const sensors = useSensors(useSensor(PointerSensor));

//   return (
//     <DndContext
//       sensors={sensors}
//       collisionDetection={closestCenter}
//       onDragStart={({ active }) => setActiveId(active.id)}
//       onDragOver={handleDragOver}
//       onDragEnd={handleDragEnd}
//       onDragCancel={() => setActiveId(null)}
//     >
//       <div className="flex gap-6 p-6">
//         {Object.keys(containers).map((containerId) => (
//           <SortableContext
//             key={containerId}
//             items={containers[containerId]}
//             strategy={verticalListSortingStrategy}
//           >
//             <Column id={containerId} items={containers[containerId]} />
//           </SortableContext>
//         ))}
//       </div>
//     </DndContext>
//   );

//   function handleDragOver(event) {
//     const { active, over } = event;
//     if (!over) return;

//     const from = findContainerContaining(active.id);
//     const to = findContainerForDroppable(over.id);

//     if (!from || !to || from === to) return;

//     setContainers((prev) => {
//       const itemIndex = prev[from].indexOf(active.id);
//       if (itemIndex === -1) return prev;

//       const next = { ...prev };
//       next[from] = prev[from].filter((id) => id !== active.id);
//       next[to] = [...prev[to], active.id]; // append at end
//       return next;
//     });
//   }

  // function handleDragEnd(event) {
  //   const { active, over } = event;
  //   setActiveId(null);
  //   if (!over) return;

  //   const from = findContainerContaining(active.id);
  //   const to = findContainerContaining(over.id);

  //   if (from && to && from === to) {
  //     setContainers((prev) => {
  //       const items = Array.from(prev[from]);
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);
  //       items.splice(oldIndex, 1);
  //       items.splice(newIndex, 0, active.id);
  //       return { ...prev, [from]: items };
  //     });
  //   }
  //   // cross-column moves already handled in onDragOver
  // }

//   function findContainerContaining(id) {
//     return Object.keys(containers).find((key) =>
//       containers[key].includes(id)
//     );
//   }

//   function findContainerForDroppable(overId) {
//     return Object.keys(containers).includes(overId)
//       ? overId
//       : findContainerContaining(overId);
//   }
// }

// function Column({ id, items }) {
//   const { setNodeRef, isOver } = useDroppable({
//     id, // 👈 make whole column a droppable target
//   });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`flex flex-col gap-2 p-4 border rounded w-48 min-h-[200px] ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <h2 className="font-bold mb-2">Column {id}</h2>
//       {items.length === 0 && (
//         <div className="text-gray-400 italic">Drop here</div>
//       )}
//       {items.map((item) => (
//         <SortableItem key={item} id={item} />
//       ))}
//     </div>
//   );
// }

// function SortableItem({ id }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id });

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
//       className="p-2 border rounded bg-gray-100 cursor-grab"
//     >
//       {id}
//     </div>
//   );
// }





import React, {useState} from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

/* Simple presentational item (ref-forwarding pattern recommended for overlays) */
const Item = React.forwardRef(({id, style, listeners, attributes}, ref) => (
  <div ref={ref} style={{padding: 8, border: '1px solid #ddd', marginBottom: 8, background: '#fff', ...style}} {...listeners} {...attributes}>
    {id}
  </div>
));

function SortableItem({id}) {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return <Item ref={setNodeRef} id={id} style={style} listeners={listeners} attributes={attributes} />;
}

export default function MultiContainerVirtualExample() {
  const sensors = useSensors(useSensor(PointerSensor));
  const [activeId, setActiveId] = useState(null);

  // two containers with arrays of ids
  const [containers, setContainers] = useState({
    left: ['L-1', 'L-2', 'L-3'],
    right: ['R-1', 'R-2', 'R-3'],
  });

  function findContainer(id) {
    return Object.keys(containers).find(key => containers[key].includes(id));
  }

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const {active, over} = event;
    setActiveId(null);

    if (!over) return;

    const fromId = findContainer(active.id);
    const toId = findContainer(over.id);

    if (fromId == null || toId == null) return;

    // if same container -> reorder
    if (fromId === toId) {
      setContainers(prev => ({
        ...prev,
        [fromId]: arrayMove(prev[fromId], prev[fromId].indexOf(active.id), prev[fromId].indexOf(over.id)),
      }));
      return;
    }

    // move between containers
    setContainers(prev => {
      const from = [...prev[fromId]];
      const to = [...prev[toId]];
      from.splice(from.indexOf(active.id), 1);
      const insertAt = to.indexOf(over.id);
      to.splice(insertAt === -1 ? to.length : insertAt, 0, active.id);
      return {...prev, [fromId]: from, [toId]: to};
    });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{display: 'flex', gap: 16}}>
        {/* Left container */}
        <SortableContext items={containers.left} strategy={verticalListSortingStrategy}>
          <div style={{width: 200, padding: 8, background: '#f6f6f6'}}>
            {containers.left.map(id => <SortableItem key={id} id={id} />)}
          </div>
        </SortableContext>

        {/* Right container */}
        <SortableContext items={containers.right} strategy={verticalListSortingStrategy}>
          <div style={{width: 200, padding: 8, background: '#f6f6f6'}}>
            {containers.right.map(id => <SortableItem key={id} id={id} />)}
          </div>
        </SortableContext>
      </div>

      {/* Always-mounted overlay. Render a presentational Item for the active id. */}
      <DragOverlay>
        {activeId ? <Item id={activeId} style={{boxShadow: '0 4px 12px rgba(0,0,0,0.15)'}} /> : null}
      </DragOverlay>
    </DndContext>
  );
}