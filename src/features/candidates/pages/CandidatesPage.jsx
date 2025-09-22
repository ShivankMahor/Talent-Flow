import { useEffect, useRef, useCallback } from "react";
import { List } from "react-window";
import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import CandidatesToolbar from "../components/CandidatesToolbar";
import CandidateCard from "../components/CandidateCard";
import { useCandidates } from "../context/CandidatesContext";
import { useDebounce } from "../../../hooks/useDebounce";

function RowComponent({ index, style, candidates, onLastVisible }) {
  const isLast = index === candidates.length - 1;
  const ref = useRef(null);

  useEffect(() => {
    if (!isLast) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLastVisible(); 
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [isLast, onLastVisible]);

  return (
    <div style={style} ref={isLast ? ref : null}>
      <CandidateCard candidate={candidates[index]} />
    </div>
  );
}

export default function CandidatesPage() {
  const {
    optimisticCandidates,
    loading,
    hasMore,
    loadMore,
    searchTerm
  } = useCandidates();

  // 👇 debounce the search term here
  const debouncedSearch = useDebounce(searchTerm, 300);
  console.log("optimisticCandidates: ",optimisticCandidates)
  // Client-side filtering using debounced value
  const candidates = optimisticCandidates.filter((c) => {
    if (!debouncedSearch) return true;
    return (
      c.name.toLowerCase().includes(debouncedSearch) ||
      c.email.toLowerCase().includes(debouncedSearch)
    );
  });

  // callback ensures stable reference for observer
  const handleLastVisible = useCallback(() => {
    if (hasMore && !loading) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  return (
    <div className="h-screen bg-[var(--color-background)]">
      <Navbar />
      <div className="p-4 space-y-4">
        <CandidatesToolbar/>
        <div className="bg-gray-400/50 p-2 rounded-xl shadow-inner">

          {candidates.length === 0 && loading ? (
            <Loader />
          ) : candidates.length === 0 && !loading ? (
            <div className="p-6 text-center text-[var(--color-text-muted)]">
              No candidates found ❌
            </div>
          ) : (
            <List
            rowComponent={RowComponent}
            rowCount={candidates.length}
            rowHeight={100}
            rowProps={{
              candidates,
              onLastVisible: handleLastVisible,
            }}
            height={600}
            width="100%"
            />
          )}

        </div>
        {loading && candidates.length > 0 && (
          <div className="text-center py-4">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
