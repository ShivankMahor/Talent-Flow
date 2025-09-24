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

export default function CandidatesToolbar() {
  const {
    stage,
    setStage,
    setSearchTerm,
    total,
    loading,
    handleAddCandidate,
    
  } = useCandidates();
  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(()=>{
    setSearchTerm(inputValue)
  },[debouncedValue])
  return (
    <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 mb-1.5">
            <Users className="w-6 h-6 text-[var(--color-accent)]" />
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
                Candidates
              </h1>
          </div>
          <SmallDetailItem label={"Total Candidates"} value={total} />
        </div>

        {/* Filters */}
        <div className="md:flex grid grid-cols-1 gap-3 justify-between ">
          <div className="grid grid-cols-1 md:flex flex-col sm:flex-row gap-3 w-full sm:w-auto ">
            <Input
              label="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full sm:w-64"
            />

            <Select
              label="Stage"
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              options={stages}
              className="w-full sm:w-48"
              disabled={loading}
            />
          </div>
          <div className="flex items-end w-max">
            <div>
              {loading ? (
                <Loader />
              ) : (
                <Button className={"w-80 md:w-auto"} variant="primary" onClick={() => setOpenModal(true)}>
                  New Candidate
                </Button>
              )}
            </div>
          </div>
        </div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          title="Add new Candidate"
        >
          <CandidateForm
            onSubmit={handleAddCandidate}
            onCancel={() => setOpenModal(false)}
          />
        </Modal>
    </div>
  );
}
