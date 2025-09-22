import { useCandidates } from "../context/CandidatesContext.jsx";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button.jsx";
import Modal from "../../../components/Modal.jsx";
import CandidateForm from "./CandidateForm.jsx";
import { useState } from "react";
import Loader from "../../../components/Loader.jsx";

const stages = [
  { value: "", label: "All Stages" },
  { value: "applied", label: "Applied" },
  { value: "screen", label: "Screen" },
  { value: "tech", label: "Technical" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

export default function CandidatesToolbar() {
  const { filters, setFilters, searchTerm, setSearchTerm, total, loading, handleAddCandidate } =
    useCandidates();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="p-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      {/* Left side: search + filter */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto flex-1">
        <Input
          label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full sm:w-64"
        />

        <Select
          label="Stage"
          value={filters.stage}
          onChange={(e) => setFilters({ stage: e.target.value })}
          options={stages}
          className="w-full sm:w-48"
          disabled={loading}
        />
      </div>

      {/* Right side: total count + button */}
      <div className="flex items-center gap-3">
        {loading ? (
          <Loader/>
        ) : (
          <Button onClick={() => setOpenModal(true)}>New Candidate</Button>
        )}

        
      </div>

      {/* Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Add new Candidate">
        <CandidateForm onSubmit={handleAddCandidate} onCancel={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}
