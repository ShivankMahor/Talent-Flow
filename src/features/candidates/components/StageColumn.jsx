// import React from "react";
// import { useDroppable } from "@dnd-kit/core";
// import CandidateCardDraggable from "./CandidateCardDraggable";

// export default function StageColumn({ id, candidates }) {
//   const { setNodeRef, isOver } = useDroppable({ id });
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;
//   return (
    
//     <div
//       ref={droppableRef}
//       className={`flex flex-col gap-2 p-4 border rounded min-h-[300px] ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <h3 className="font-semibold capitalize mb-2">{id}</h3>
//       {candidates.length === 0 && (
//         <div className="text-gray-400 italic">Drop here</div>
//       )}
//       {candidates.map((c) => (
//         <CandidateCardDraggable key={c.id} candidate={c} />
//       ))}
//     </div>
//   );
// }


// import React from "react";
// import { useDroppable } from "@dnd-kit/core";
// import { List } from "react-window";
// import CandidateCardDraggable from "./CandidateCardDraggable";

// export default function StageColumn({ id, candidates }) {
//   const { setNodeRef, isOver } = useDroppable({ id });
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;
//   return (
//     <div
//       ref={droppableRef}
//       className={`flex flex-col gap-2 p-4 border rounded min-h-[300px] transition-colors ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <h3 className="font-semibold capitalize mb-2">{id}</h3>

//       {candidates.length === 0 ? (
//         <div className="text-gray-400 italic">Drop here</div>
//       ) : (
//         <List
//           height={400} // 👈 you can make this dynamic if you want
//           itemCount={candidates.length}
//           itemSize={100} // 👈 candidate card height (tweak as needed)
//           width="100%"
//           itemData={candidates}
//         >
//           {Row}
//         </List>
//         // <List
//         //   rowComponent={Row}
//         //   rowCount={candidates.length}
//         //   rowHeight={125}
//         //   rowProps={{ candidates, onLastVisible: handleLastVisible }}
//         //   height={600}
//         //   width="100%"
//         // />
//       )}
//     </div>
//   );
// }

// // row renderer for react-window
// function Row({ index, style, data }) {
//   const candidate = data[index];
//   return (
//     <div style={style} className="mb-2">
//       <CandidateCardDraggable candidate={candidate} />
//     </div>
//   );
// }




// import { useEffect, useRef } from "react";
// import { List } from "react-window";
// import CandidateCardDraggable from "../components/CandidateCardDraggable";
// import Loader from "../../../components/Loader";
// import { useDroppable } from "@dnd-kit/core";

// function Row({ index, style, candidates, onLastVisible }) {
//   const isLast = index === candidates.length - 1;
//   const ref = useRef(null);

//   useEffect(() => {
//     if (!isLast) return;
//     const el = ref.current;
//     if (!el) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           onLastVisible();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [isLast, onLastVisible]);

//   const candidate = candidates[index];
//   return (
//     <div style={style} ref={isLast ? ref : null}>
//       <CandidateCardDraggable candidate={candidate} />
//     </div>
//   );
// }

// export default function StageColumn({
//   stage,
//   candidates,
//   loadMore,
//   loading,
//   hasMore,
// }) {
//   const { setNodeRef, isOver } = useDroppable({ id:stage });
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;
//   const handleLastVisible = () => {
//     if (hasMore && !loading) {
//       loadMore(stage); // 👈 fetch next page for this specific stage
//     }
//   };

//   return (
//     <div
//       ref={droppableRef}
//       id={stage}
//       className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-2 flex flex-col"
//     >
//       <h3 className="font-semibold mb-2 capitalize">{stage}</h3>

//       {candidates.length === 0 && !loading ? (
//         <div className="p-4 text-center text-[var(--color-text-muted)] text-sm">
//           No candidates
//         </div>
//       ) : (
//         <List
//           rowComponent={Row}
//           rowCount={candidates.length}
//           rowHeight={125} // 👈 adjust to CandidateCard height
//           rowProps={{ candidates, onLastVisible: handleLastVisible }}
//           height={800} // 👈 column scroll height
//           width="100%"
//         />
//       )}

//       {loading && (
//         <div className="flex justify-center py-2">
//           <Loader size="sm" />
//         </div>
//       )}
//     </div>
//   );
// }


// import { List } from "react-window";
// import { useDroppable } from "@dnd-kit/core";
// import CandidateCardDraggable from "./CandidateCardDraggable";
// import Loader from "../../../components/Loader";
// import { useCandidates } from "../context/CandidatesContext";

// function Row({ index, style, candidates, onLastVisible}) {
//   // const { candidates, onLastVisible } = data;
//   const isLast = index === candidates.length - 1;

//   if (isLast) {
//     return (
//       <div style={style} ref={onLastVisible}>
//         <CandidateCardDraggable candidate={candidates[index]} />
//       </div>
//     );
//   }

//   return (
//     <div style={style}>
//       <CandidateCardDraggable candidate={candidates[index]} />
//     </div>
//   );
// }

// export default function StageColumn({ stage, candidates, loading, hasMore }) {
//   const { setNodeRef, isOver } = useDroppable({ id: stage });
//   const { loadMore } = useCandidates()
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;
//     const handleLastVisible = () => {
//     if (hasMore && !loading) {
//       loadMore(stage); // 👈 fetch next page for this stage
//     }
//   };
//   // Intersection observer handler
//   const lastVisibleRef = (el) => {
//     if (!el || !hasMore || loading) return;
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) loadMore(stage);
//       },
//       { threshold: 1.0 }
//     );
//     observer.observe(el);
//   };
  
//   return (
//     <div
//       ref={droppableRef}
//       id={stage}
//       className={`bg-[var(--color-surface)] border rounded-lg p-2 flex flex-col transition-colors ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-[var(--color-border)]"
//       }`}
//     >
//       <h3 className="font-semibold mb-2 capitalize">{stage}</h3>

//       {candidates.length === 0 && !loading ? (
//         <div className="p-4 text-center text-[var(--color-text-muted)] text-sm">
//           No candidates
//         </div>
//       ) : (
//         <List
//           rowComponent={Row}
//           rowCount={candidates.length}
//           rowHeight={125} // 👈 adjust to CandidateCard height
//           rowProps={{ candidates, onLastVisible: handleLastVisible }}
//           height={800} // 👈 column scroll height
//           width="100%"
//         />
//       )}

//       {loading && (
//         <div className="flex justify-center py-2">
//           <Loader size="sm" />
//         </div>
//       )}
//     </div>
//   );
// }


















// import React, { useCallback, useRef, useEffect } from "react";
// import { useDroppable } from "@dnd-kit/core";
// import { List } from "react-window";
// import CandidateCardDraggable from "./CandidateCardDraggable";
// import { useCandidates } from "../context/CandidatesContext";

// export default function StageColumn({ id, candidates }) {
//   const { setNodeRef, isOver } = useDroppable({ id });
//   const {loadMore} = useCandidates()
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;
//   const observer = useRef(null);
//   function handleLastVisible(){
//     console.log("Last Visible load more ")
//     // loadMore()
//   }
//   // Row renderer for react-window
//   const Row = useCallback(
//     ({ index, style }) => {
//       const candidate = candidates[index];
//       const isLast = index === candidates.length - 1;
//       // console.log(isLast,candidate)
//       const ref = (node) => {
//         if (isLast) {
//           if (observer.current) observer.current.disconnect();
//           observer.current = new IntersectionObserver((entries) => {
//             if (entries[0].isIntersecting) {
//               handleLastVisible?.(); // loadMore from context
//             }
//           });
//           if (node) observer.current.observe(node);
//         }
//       };

//       return (
//         <div style={style} ref={ref}>
//           <CandidateCardDraggable key={candidate.id} candidate={candidate} />
//         </div>
//       );
//     },
//     [candidates]
//   );

//   return (
//     <div
//       ref={droppableRef}
//       className={`flex flex-col gap-2 p-4 border rounded min-h-[300px] ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <h3 className="font-semibold capitalize mb-2">{id}</h3>
//       {candidates.length === 0 ? (
//         <div className="text-gray-400 italic">Drop here</div>
//       ) : (
//         // <List
//         //   height={600}
//         //   itemCount={candidates.length}
//         //   itemSize={125}
//         //   width="100%"
//         // >
//         //   {Row}
//         // </List>
//         <List
//           rowComponent={Row}
//           rowCount={candidates.length}
//           rowHeight={125} // 👈 adjust to CandidateCard height
//           rowProps={{ candidates, handleLastVisible }}
//           height={800} // 👈 column scroll height
//           width="100%"
//         />
//       )}
//     </div>
//   );
// }









// import React, { useCallback, useRef } from "react";
// import { useDroppable } from "@dnd-kit/core";
// import { List } from "react-window";
// import CandidateCardDraggable from "./CandidateCardDraggable";

// export default function StageColumn({ id, candidates, onLastVisible }) {
//   const { setNodeRef, isOver } = useDroppable({ id });
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;
//   const observer = useRef(null);

  // const Row = useCallback(
  //   ({ index, style }) => {
  //     const candidate = candidates[index];
  //     const isLast = index === candidates.length - 1;

  //     const ref = (node) => {
  //       if (isLast) {
  //         if (observer.current) observer.current.disconnect();
  //         observer.current = new IntersectionObserver((entries) => {
  //           if (entries[0].isIntersecting) onLastVisible?.();
  //         });
  //         if (node) observer.current.observe(node);
  //       }
  //     };

  //     return (
  //       <div style={style} ref={ref}>
  //         <CandidateCardDraggable candidate={candidate} />
  //       </div>
  //     );
  //   },
  //   [candidates, onLastVisible]
  // );

// const Row = React.memo(function Row({ index, style, data }) {
//   const candidate = candidates[index];
//   const isLast = index === candidates.length - 1;
//   const { activeId } = data
//   const ref = (node) => {
//     if (isLast) {
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) onLastVisible?.();
//       });
//       if (node) observer.current.observe(node);
//     }
//   };

//   // Skip rendering active row while dragging (perf boost)
//   if (candidate.id.toString() === activeId) {
//     return <div style={style} ref={ref} />;
//   }

//   return (
//     <div style={style} ref={ref}>
//       <CandidateCardDraggable candidate={candidate} />
//     </div>
//   );
// });

//   return (
//     <div
//       ref={droppableRef}
//       className={`flex flex-col gap-2 p-4 border rounded min-h-[300px] ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <h3 className="font-semibold capitalize mb-2">{id}</h3>
//       {candidates.length === 0 ? (
//         <div className="text-gray-400 italic">Drop here</div>
//       ) : (
//         <List
//           rowComponent={Row}
//           rowCount={candidates.length}
//           rowHeight={125} // 👈 adjust to CandidateCard height
//           rowProps={{ candidates }}
//           height={800} // 👈 column scroll height
//           width="100%"
//         />
//       )}
//     </div>
//   );
// }








//pagination
// import React, { useRef, useEffect } from "react";
// import { useDroppable } from "@dnd-kit/core";
// import CandidateCardDraggable from "./CandidateCardDraggable";

// export default function StageColumn({ id, candidates, onLastVisible }) {
//   const { setNodeRef, isOver } = useDroppable({ id });
//   const droppableRef = candidates.length === 0 ? setNodeRef : null;

//   return (
//     <div
//       ref={droppableRef}
//       className={`flex flex-col gap-2 p-4 border rounded min-h-[300px] ${
//         isOver ? "bg-blue-50 border-blue-400" : "border-gray-300"
//       }`}
//     >
//       <h3 className="font-semibold capitalize mb-2">{id}</h3>
//       {candidates.length === 0 ? (
//         <div className="text-gray-400 italic">Drop here</div>
//       ) : (
//         candidates.map((c, idx) => (
//           <div key={c.id} id={idx === candidates.length - 1 ? `${id}-last` : undefined}>
//             <CandidateCardDraggable candidate={c} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import React from "react";
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
