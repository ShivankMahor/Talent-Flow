import { useCallback } from "react";
import { List } from "react-window";
import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import CandidatesToolbar from "../components/CandidatesToolbar";
import { useCandidates } from "../context/CandidatesContext";
import { useDebounce } from "../../../hooks/useDebounce";
import RowComponent from "../components/RowComponent";
import Card from "../../../components/Card";

export default function CandidatesPage() {
  const {
    optimisticCandidates,
    loading,
    hasMore,
    loadMore,
  } = useCandidates();

  const candidates = optimisticCandidates

  // callback ensures stable reference for observer
  const handleLastVisible = useCallback(() => {
    if (hasMore && !loading) {
      loadMore();
    }
  }, [hasMore, loading, loadMore]);

  return (
    <div className="h-screen bg-[var(--color-surface-alt)]">
      <Navbar />
      <Card className="m-4">
        <CandidatesToolbar/>
        <div className="border-b w-full -mx-4 mb-4 -mt-2 border-[var(--color-border)]"></div>
        {/* <Card variant=""> */}
          {candidates.length === 0 && !loading ? (
            <Loader />
          ) : candidates.length === 0 && !loading ? (
            <div className="p-6 text-center text-[var(--color-text-muted)]">
              No candidates found ❌
            </div>
          ) : (
            <List
            rowComponent={RowComponent}
            rowCount={candidates.length}
            rowHeight={105}
            rowProps={{
              candidates,
              onLastVisible: handleLastVisible,
            }}
            // height={1}
            width="100%"
            />
          )}

        </Card>
        {loading && candidates.length > 0 && (
          <div className="text-center py-4">
            <Loader />
          </div>
        )}
    </div>
  );
}
