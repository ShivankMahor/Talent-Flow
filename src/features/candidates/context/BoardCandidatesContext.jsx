// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import { toast } from "react-toastify";
// import { getCandidatesPage, updateCandidate } from "../services/candidates.api";
// import { useOptimisticHook } from "../../../hooks/useOptimisticHook";

// const BoardCandidatesContext = createContext(null);

// const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// export function BoardCandidatesProvider({ children }) {
//   // candidates are grouped by stage { applied: [], screen: [], ... }
//   const [stageCandidates, setStageCandidates] = useState(
//     Object.fromEntries(stages.map((s) => [s, []]))
//   );
//   const [optimisticCandidates, setOptimisticCandidates] =
//     useOptimisticHook(stageCandidates);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Fetch candidates page (50 candidates total, grouped by stage)
//   useEffect(() => {
//     (async () => {
//       try {
//         setLoading(true);
//         const res = await getCandidatesPage({ page });
//         console.log("baord res")
//         setStageCandidates(res.data); // grouped { applied: [...], screen: [...] }
//         setTotalPages(res.meta.totalPages);
//       } catch (err) {
//         toast.error("Failed to load candidates ❌");
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, [page]);

//   const handleStageChange = async (candidate, newStage) => {
//   const originalStage = candidate.stage;
//   if (originalStage === newStage) return;

//   // 🔹 Optimistic update
//   setStageCandidates((prev) => {
//     const updated = { ...prev };
//     updated[originalStage] = updated[originalStage].filter(
//       (c) => c.id !== candidate.id
//     );
//     updated[newStage] = [{ ...candidate, stage: newStage }, ...updated[newStage]];
//     return updated;
//   });

//   // 🔹 Send PATCH request
//   try {
//     await updateCandidate(candidate.id, { stage: newStage });
    
//   } catch (err) {
//     // 🔹 Rollback on failure
//     setStageCandidates((prev) => {
//       const updated = { ...prev };
//       updated[newStage] = updated[newStage].filter((c) => c.id !== candidate.id);
//       updated[originalStage] = [
//         { ...candidate, stage: originalStage },
//         ...updated[originalStage],
//       ];
//       return updated;
//     });
//     toast.error("Failed to update stage ❌");
//   }
// };

//   return (
//     <BoardCandidatesContext.Provider
//       value={{
//         stageCandidates,
//         optimisticCandidates,
//         page,
//         setPage,
//         totalPages,
//         loading,
//         handleStageChange,
//       }}
//     >
//       {children}
//     </BoardCandidatesContext.Provider>
//   );
// }

// export function useBoardCandidates() {
//   const ctx = useContext(BoardCandidatesContext);
//   if (!ctx) {
//     throw new Error(
//       "useBoardCandidates must be used within a <BoardCandidatesProvider>. Wrap your app (e.g. in index.jsx or App.jsx) with <BoardCandidatesProvider>."
//     );
//   }
//   return ctx;
// }




import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";
import { getCandidatesPage, updateCandidate } from "../services/Candidates.api";
import { useOptimisticHook } from "../../../hooks/useOptimisticHook";
import { useDebounce } from "../../../hooks/useDebounce";

const BoardCandidatesContext = createContext(null);

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

export function BoardCandidatesProvider({ children }) {
  // candidates are grouped by stage { applied: [], screen: [], ... }
  const [stageCandidates, setStageCandidates] = useState(
    Object.fromEntries(stages.map((s) => [s, []]))
  );
  const [optimisticCandidates, setOptimisticCandidates] =
    useOptimisticHook(stageCandidates);

  const [filters, setFilters] = useState({ search: "", stage: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 400);
  
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: debouncedSearch }));
    setPage(1);
  }, [debouncedSearch]);
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await getCandidatesPage({ ...filters, page });
        if (!isMounted) return;

        setStageCandidates(res.data); // grouped { applied: [...], screen: [...] }
        setTotalPages(res.meta.totalPages);
        setTotal(res.meta.total)
      } catch (err) {
        if (isMounted) {
          setError(err);
          toast.error("Failed to load candidates ❌");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [filters, page]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setPage(1);
  }, [debouncedSearch]);

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
        filters,
        setFilters,
        page,
        total,
        setPage,
        totalPages,
        loading,
        error,
        handleStageChange,
        searchTerm:debouncedSearch,
        setSearchTerm,
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
