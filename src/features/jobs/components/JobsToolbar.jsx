import { useState, useEffect } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Modal from "../../../components/Modal";
import JobForm from "./JobForm";
import { createJob } from "../services/jobs.api";
import { toast } from "react-toastify";
import { useJobs } from "../context/JobsContext";
import SmallDetailItem from "../../../components/SmallDetailItem";
import { Briefcase } from "lucide-react";
import Loader from "../../../components/Loader";

export default function JobsToolbar() {
  const { filters, setFilters, tags, onJobCreated, total, loading } = useJobs();
  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [openModal, setOpenModal] = useState(false);

  const handleCreateJob = async (newJob) => {
    // optimistic temp job
    const tempId = `temp-${Date.now()}`;
    const tempJob = { ...newJob, id: tempId, optimistic: true };
    if (onJobCreated) onJobCreated(tempJob);

    setOpenModal(false);

    try {
      const created = await createJob(newJob);
      if (onJobCreated) onJobCreated(created, tempId);
      toast.success("Job created successfully ✅");
    } catch (err) {
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
    <div className="mb-6">
      {/* <div
        className="
          bg-[var(--color-surface)]
          border border-[var(--color-border)]
          rounded-xl shadow-sm
          p-4 sm:p-5
          flex flex-col gap-4
        "
      > */}
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-[var(--color-accent)]" />
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
              Jobs
            </h1>
          </div>
          <SmallDetailItem
            label="Total Jobs"
            value={loading ? "…" : total}
          />
        </div>

        {/* Filters + Button */}
        <div className="flex justify-between">
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto ">
            {/* Search */}
            <Input
              label={"Search"}
              placeholder="Search jobs (title or tag)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full sm:w-64"
            />

            {/* Status filter */}
            <Select
              label={"Status"}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              options={[
                { value: "", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "archived", label: "Archived" },
              ]}
              disabled={loading}
              className="w-full sm:w-40"
            />

            {/* Tag filter */}
            <Select
              label={"Tags"}
              value={filters.tag || ""}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
              options={[
                { value: "", label: "All Tags" },
                ...tags.map((tag) => ({
                  value: tag,
                  label: tag.charAt(0).toUpperCase() + tag.slice(1),
                })),
              ]}
              disabled={loading}
              className="w-full sm:w-48"
            />
          </div>

          {/* Create Job */}
          {/* <div className="flex items-end">
            <div>
              
            </div>
          </div> */}
          <div className="flex items-end ">
            <div>
              {loading ? (
                <Loader />
              ) : (
                <Button variant="primary" onClick={() => setOpenModal(true)}>
                  New Job
                </Button>
              )}
            </div>
          </div> 
        </div>
      {/* </div> */}

      {/* Modal */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Create Job"
      >
        <JobForm
          onSubmit={handleCreateJob}
          onCancel={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}
