// features/jobs/context/JobsContext.jsx
import { createContext, useContext, useEffect, useState, useOptimistic, startTransition } from "react";
import { toast } from "react-toastify";
import { getJobs, reorderJob, updateJob } from "../services/jobs.api";

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", sort: "order" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const pageSize = 10;

  // optimistic wrapper
  const [optimisticJobs, setOptimisticJobs] = useOptimistic(jobs, (currentJobs, newData) => {
    const fromJob = newData.fromJob;
    const toJob = newData.toJob;
    const updated = currentJobs.map((job) => {
      if (job.id === fromJob.id) return fromJob;
      if (job.id === toJob.id) return toJob;
      return job;
    });
    return [...updated].sort((a, b) => a.order - b.order);
  });

  // fetch jobs
  useEffect(() => {
    (async () => {
      const res = await getJobs({ ...filters, page, pageSize });
      setJobs(res.data);
      setTotal(res.meta.total);
      setPage(res.meta.page);
      setTags(res.tags);
    })();
  }, [filters, page]);

  // --- Actions ---
  const handleReorder = async (jobId, fromJob, toJob) => {
    const newData = {
      fromJob: { ...fromJob, order: toJob.order },
      toJob: { ...toJob, order: fromJob.order },
    };
    setOptimisticJobs(newData);

    startTransition(async () => {
      try {
        const { updatedFromJob, updatedToJob } = await reorderJob(jobId, fromJob.order, toJob.order);
        setJobs((prev) => {
          const updated = prev.map((job) =>
            job.id === updatedFromJob.id ? updatedFromJob :
            job.id === updatedToJob.id ? updatedToJob :
            job
          );
          return [...updated].sort((a, b) => a.order - b.order);
        });
        toast.success("Job order updated ✅");
      } catch (err) {
        toast.error("Failed to reorder job ❌");
      }
    });
  };

  
  const openEditModal = (job) => {
    console.log("open")
    setSelectedJob(job);
    setOpenEdit(true);
  };
  
  const closeEditModal = () => {
    console.log("close")
    setSelectedJob(null);
    setOpenEdit(false);
  };

  const handleEdit = async (jobId, updates) => {
    const original = jobs.find((j) => j.id === jobId);
    if (!original) return;

    const optimistic = { ...original, ...updates, optimistic: true };
    setJobs((prev) => prev.map((j) => (j.id === jobId ? optimistic : j)));

    try {
      const updated = await updateJob(jobId, updates);
      setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)));
      toast.success("Job updated ✅");
    } catch (err) {
      setJobs((prev) => prev.map((j) => (j.id === jobId ? original : j)));
      toast.error(err.message || "Failed to update job ❌");
    }
  };

  const handleArchive = async (job) => {
    const original = job;
    const toggledStatus = job.status === "archived" ? "active" : "archived";

    // optimistic update
    const optimistic = { ...job, status: toggledStatus, optimistic: true };
    setJobs((prev) => prev.map((j) => (j.id === job.id ? optimistic : j)));

    try {
      const result = await updateJob(job.id, { status: toggledStatus });
      setJobs((prev) => prev.map((j) => (j.id === job.id ? result : j)));
      toast.success(result.status === "archived" ? "Job archived ✅" : "Job restored ✅");
    } catch (err) {
      setJobs((prev) => prev.map((j) => (j.id === job.id ? original : j)));
      toast.error(err.message || "Failed to update status ❌");
    }
  };


  return (
    <JobsContext.Provider
      value={{
        jobs,
        selectedJob,
        optimisticJobs,
        filters,
        setFilters,
        page,
        setPage,
        total,
        tags,
        openEdit,
        handleReorder,
        handleEdit,
        handleArchive,
        setJobs,
        openEditModal,
        closeEditModal,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}
