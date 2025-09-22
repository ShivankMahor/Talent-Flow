// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   startTransition,
// } from "react";
// import { toast } from "react-toastify";
// import { getCandidates, updateCandidate } from "../services/candidates.api";

// const BoardCandidatesContext = createContext(null);

// export function BoardCandidatesProvider({ children }) {
//   const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

//   // stage → candidate[] mapping
//   const [stagePages, setStagePages] = useState(
//     stages.reduce((acc, s) => ({ ...acc, [s]: [] }), {})
//   );

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [loading, setLoading] = useState(false);

//   // fetch one "page" (all stages)
//   async function fetchCandidates(page) {
//     setLoading(true);
//     try {
//       const res = await getCandidates({ page, pageSize: 10 }); 
//       // 👆 server should return { data: { applied:[], screen:[], ... }, meta: { totalPages } }

//       setStagePages((prev) => {
//         const updated = { ...prev };
//         for (const stage of stages) {
//           updated[stage] = [...prev[stage], ...(res.data[stage] || [])];
//         }
//         return updated;
//       });

//       setHasMore(page < res.meta.totalPages);
//     } catch (err) {
//       toast.error("Failed to load candidates ❌");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // first load + subsequent pages
//   useEffect(() => {
//     fetchCandidates(page);
//   }, [page]);

//   const loadMore = () => {
//     if (!loading && hasMore) {
//       setPage((p) => p + 1);
//     }
//   };

//   // move candidate between stages
//   const handleStageChange = async (candidate, newStage) => {
//     const oldStage = candidate.stage;

//     // optimistic update
//     setStagePages((prev) => {
//       const updated = { ...prev };
//       updated[oldStage] = updated[oldStage].filter((c) => c.id !== candidate.id);
//       updated[newStage] = [...updated[newStage], { ...candidate, stage: newStage }];
//       return updated;
//     });

//     startTransition(async () => {
//       try {
//         await updateCandidate(candidate.id, { stage: newStage });
//       } catch (err) {
//         // rollback on failure
//         setStagePages((prev) => {
//           const updated = { ...prev };
//           updated[newStage] = updated[newStage].filter((c) => c.id !== candidate.id);
//           updated[oldStage] = [...updated[oldStage], candidate];
//           return updated;
//         });
//         toast.error("Failed to update stage ❌");
//       }
//     });
//   };

//   return (
//     <BoardCandidatesContext.Provider
//       value={{
//         stagePages,   // { applied:[], screen:[], ... }
//         loadMore,
//         hasMore,
//         loading,
//         handleStageChange,
//       }}
//     >
//       {children}
//     </BoardCandidatesContext.Provider>
//   );
// }

// export function useBoardCandidates() {
//   return useContext(BoardCandidatesContext);
// }







import {
  createContext,
  useContext,
  useEffect,
  useState,
  startTransition,
} from "react";
import { toast } from "react-toastify";
import { getCandidatesPage, updateCandidate } from "../services/candidates.api";
import { useOptimisticHook } from "../../../hooks/useOptimisticHook";

const BoardCandidatesContext = createContext(null);

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

export function BoardCandidatesProvider({ children }) {
  // candidates are grouped by stage { applied: [], screen: [], ... }
  const [stageCandidates, setStageCandidates] = useState(
    Object.fromEntries(stages.map((s) => [s, []]))
  );
  const [optimisticCandidates, setOptimisticCandidates] =
    useOptimisticHook(stageCandidates);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch candidates page (50 candidates total, grouped by stage)
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getCandidatesPage({ page });
        setStageCandidates(res.data); // grouped { applied: [...], screen: [...] }
        setTotalPages(res.meta.totalPages);
      } catch (err) {
        toast.error("Failed to load candidates ❌");
      } finally {
        setLoading(false);
      }
    })();
  }, [page]);

  const handleStageChange = async (candidate, newStage) => {
  const originalStage = candidate.stage;
  if (originalStage === newStage) return;

  // 🔹 Optimistic update
  setStageCandidates((prev) => {
    const updated = { ...prev };
    updated[originalStage] = updated[originalStage].filter(
      (c) => c.id !== candidate.id
    );
    updated[newStage] = [{ ...candidate, stage: newStage }, ...updated[newStage]];
    return updated;
  });

  // 🔹 Send PATCH request
  try {
    await updateCandidate(candidate.id, { stage: newStage });
    
  } catch (err) {
    // 🔹 Rollback on failure
    setStageCandidates((prev) => {
      const updated = { ...prev };
      updated[newStage] = updated[newStage].filter((c) => c.id !== candidate.id);
      updated[originalStage] = [
        { ...candidate, stage: originalStage },
        ...updated[originalStage],
      ];
      return updated;
    });
    toast.error("Failed to update stage ❌");
  }
};

  return (
    <BoardCandidatesContext.Provider
      value={{
        stageCandidates,
        optimisticCandidates,
        page,
        setPage,
        totalPages,
        loading,
        handleStageChange,
      }}
    >
      {children}
    </BoardCandidatesContext.Provider>
  );
}

export function useBoardCandidates() {
  const ctx = useContext(BoardCandidatesContext);
  if (!ctx) {
    throw new Error(
      "useBoardCandidates must be used within a <BoardCandidatesProvider>. Wrap your app (e.g. in index.jsx or App.jsx) with <BoardCandidatesProvider>."
    );
  }
  return ctx;
}

