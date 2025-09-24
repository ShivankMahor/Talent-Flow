import { useCandidates } from "../context/CandidatesContext.jsx";
import Input from "../../../components/Input.jsx";
import Select from "../../../components/Select.jsx";
import Button from "../../../components/Button.jsx";
import Modal from "../../../components/Modal.jsx";
import CandidateForm from "./CandidateForm.jsx";
import { useEffect, useState } from "react";
import Loader from "../../../components/Loader.jsx";
import { Users } from "lucide-react";
import Card from "../../../components/Card.jsx";
import SmallDetailItem from "../../../components/SmallDetailItem.jsx";
import { useBoardCandidates } from "../context/BoardCandidatesContext.jsx";
import { useDebounce } from "../../../hooks/useDebounce.js";

const stages = [
  { value: "", label: "All Stages" },
  { value: "applied", label: "Applied" },
  { value: "screen", label: "Screen" },
  { value: "tech", label: "Technical" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

export default function CandidatesBoardToolbar() {
  const {
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
    searchTerm,
    setSearchTerm,
  } = useBoardCandidates();

  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);
  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);
  return (
    <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-6 h-6 text-[var(--color-accent)]" />
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                Candidates KanBan Board
              </h1>
          </div>
          <SmallDetailItem label={"Total Candidates"} value={total} />
        </div>

        {/* Filters */}
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
            <Input
              label="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full sm:w-64"
            />
          </div>
        </div>
    </div>
  );
}
