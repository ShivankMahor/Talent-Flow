import { createContext, useContext, useEffect, useState, startTransition } from "react";
import { toast } from "react-toastify";
import { createCandidate, getCandidates, updateCandidate } from "../services/candidates.api";
import { useOptimisticHook } from "../../../hooks/useOptimisticHook";

const CandidatesContext = createContext(null);

export function CandidatesProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [stage, setStage] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 100; // fixed page size
  
  // Optimistic wrapper for UI updates
  const [optimisticCandidates, setOptimisticCandidates] = useOptimisticHook(candidates);
  // Load candidates when filters or page changes
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getCandidates(searchTerm, stage, page, pageSize);

        if (page === 1) {
          // first page → replace
          // console.log(res.data)
          setCandidates(res.data);
        } else {
          // subsequent page → append
          setCandidates((prev) => [...prev, ...res.data]);
        }

        setTotal(res.meta.total);
        setHasMore(page < res.meta.totalPages);
      } catch (err) {
        toast.error("Failed to load candidates ❌");
      } finally {
        setLoading(false);
      }
    })();
  }, [stage, page, searchTerm]);

  // Infinite scroll loader
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  };

  // Example: update candidate (optimistic)
  const handleEdit = async (id, updates) => {
    const original = candidates.find((c) => c.id === id);
    if (!original) return;

    setOptimisticCandidates({ type: "replaceOne", id, item: updates });

    startTransition(async () => {
      try {
        const updated = await updateCandidate(id, updates);
        setCandidates((prev) => prev.map((c) => (c.id === id ? updated : c)));
        toast.success("Candidate updated ✅");
      } catch (err) {
        setCandidates((prev) => prev.map((c) => (c.id === id ? original : c)));
        toast.error("Failed to update candidate ❌");
      }
    });
  };

  // const filteredCandidates = optimisticCandidates.filter((c) => {
  //   if (!searchTerm) return true;
  //   return (
  //     c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     c.email.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  const handleAddCandidate = async (newCandidate) => {
    console.log("new: ",newCandidate)
    // 1. Create a temp candidate with negative id to avoid clash
    const tempId = Date.now() * 0;
    const optimisticCandidate = { id: tempId, ...newCandidate };

    // 2. Show optimistically in UI
    setOptimisticCandidates({ type: "prependOne", item: optimisticCandidate });

    startTransition(async () => {
      try {
        // 3. Call API
        const created = await createCandidate(newCandidate);
        // 4. Replace temp with real candidate
        setCandidates((prev) =>
          prev.map((c) => (c.id === tempId ? created : c))
        );
        setTotal(prev => prev + 1)

        toast.success("Candidate added ✅");
      } catch (err) {
        console.log(err)
        toast.error("Failed to add candidate ❌");
      }
    });
  };
  return (
    <CandidatesContext.Provider
      value={{
        candidates,
        setSearchTerm,
        // filteredCandidates,
        optimisticCandidates,
        stage,
        setStage,
        searchTerm,
        total,
        page,
        loading,
        hasMore,
        loadMore,
        handleEdit,
        handleAddCandidate
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
}

export function useCandidates() {
  const ctx = useContext(CandidatesContext);
  if(!ctx){
    return new Error("Context Error, useCandidate must be inside a CandidateProvider")
  }
  return ctx
}