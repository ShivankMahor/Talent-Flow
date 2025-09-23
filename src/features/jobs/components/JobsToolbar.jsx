import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Modal from "../../../components/Modal";
import JobForm from "./JobForm";
import { createJob } from "../services/jobs.api";
import { toast } from "react-toastify";
import { useJobs } from "../context/JobsContext";

export default function JobsToolbar() {
  const { filters, setFilters, tags, onJobCreated } = useJobs()
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [openModal, setOpenModal] = useState(false);
  const handleCreateJob = async (newJob) => {
    // 1. Create temporary optimistic job
    const tempId = `temp-${Date.now()}`;
    const tempJob = {
      ...newJob,
      id: tempId,
      optimistic: true,
    };
    if (onJobCreated) onJobCreated(tempJob);

    setOpenModal(false);

    try {
      // 2. Try actual API call
      const created = await createJob(newJob);

      // 3. Replace temp with real job
      if (onJobCreated) onJobCreated(created, tempId);
      toast.success("Job created successfully ✅");
    } catch (err) {
      // 4. Rollback
      console.error("❌ Failed to create job:", err);
      toast.error(err.message || "Failed to create job ❌");
      if (onJobCreated) onJobCreated(null, tempId);
    }
  };

  // keep filters in sync with search
  useEffect(() => {
    setFilters({ ...filters, search: searchInput });
  }, [searchInput]);

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex space-x-1.5">
        {/* Search */}
        <Input
          placeholder="Search jobs (title or tag)..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="min-w-sm"
        />

        {/* Status filter */}
        <Select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          options={[
            { value: "", label: "All Statuses" },
            { value: "active", label: "Active" },
            { value: "archived", label: "Archived" },
            { value: "closed", label: "Closed" },
          ]}
        />

        {/* Tag filter */}
        <Select
          value={filters.tag || ""}
          onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
          options={[
            { value: "", label: "All Tags" },
            ...tags.map((tag) => ({ value: tag, label: tag.charAt(0).toUpperCase() + tag.slice(1) })),
          ]}
        />
      </div>

      {/* Create Job */}
      <Button onClick={() => setOpenModal(true)}>+ Create Job</Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)} title="Create Job">
        <JobForm onSubmit={handleCreateJob} onCancel={() => setOpenModal(false)} />
      </Modal>
    </div>
  );
}
