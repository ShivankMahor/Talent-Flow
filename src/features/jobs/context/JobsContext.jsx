// features/jobs/context/JobsContext.jsx
import { createContext, useContext, useEffect, useState, startTransition, useCallback } from "react";
import { toast } from "react-toastify";
import { getJobs, reorderJob, updateJob } from "../services/jobs.api";
import { useOptimisticHook } from "../../../hooks/useOptimisticHook";

const JobsContext = createContext(null);

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "active", sort: "order" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const pageSize = 10;

  // optimistic wrapper
  const [optimisticJobs, setOptimisticJobs] = useOptimisticHook(jobs);

  // fetch jobs
  // useEffect(() => {
  //   (async () => {
  //     const res = await getJobs({ ...filters, page, pageSize });
  //     setJobs(res.data);
  //     setTotal(res.meta.total);
  //     setPage(res.meta.page);
  //     setTags(res.tags);
  //   })();
  // }, [filters, page]);

    // fetch jobs
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getJobs({ ...filters, page, pageSize });
        if (!isMounted) return;

        setJobs(res.data);
        setTotal(res.meta.total);
        setPage(res.meta.page);
        setTags(res.tags);
      } catch (err) {
        if (isMounted) {
          setError(err);
          toast.error(err.message || "Failed to load jobs ❌");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [filters, page]);

  // --- Actions ---
  const handleReorder = async (jobId, fromJob, toJob) => {
    console.log("Handle Reorder")
    const items = [
      { ...fromJob, order: toJob.order },
      { ...toJob, order: fromJob.order },
    ];

    // optimistic update
    setOptimisticJobs({ type: "updateTwoJobs", items});
    
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

  const handleEdit = async (jobId, updates) => {
    const original = jobs.find((j) => j.id === jobId);
    if (!original) return;

    // optimistic update
    setOptimisticJobs({
      type: "replaceOne",
      id: jobId,
      item: updates,
    });

    startTransition(async () => {
      try {
        const updated = await updateJob(jobId, updates);
        setJobs((prev) => prev.map((j) => (j.id === jobId ? updated : j)));
        toast.success("Job updated ✅");
      } catch (err) {
        toast.error(err.message || "Failed to update job ❌");
      }
    });
  };

  const handleArchive = useCallback(async (job) => {
    console.log("handleArchive render")
    const toggledStatus = job.status === "archived" ? "active" : "archived";

    // optimistic update
    setOptimisticJobs({
      type: "replaceOne",
      id: job.id,
      item: { status: toggledStatus },
    });

    startTransition(async () => {
      try {
        const result = await updateJob(job.id, { status: toggledStatus });
        setJobs((prev) => prev.map((j) => (j.id === job.id ? result : j)));
        toast.success(
          result.status === "archived" ? "Job archived ✅" : "Job restored ✅"
        );
      } catch (err) {
        toast.error(err.message || "Failed to update status ❌");
      }
    });
  },[jobs]);


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
        pageSize,
        openEdit,
        loading,
        handleReorder,
        handleEdit,
        handleArchive,
        setJobs,
        openEditModal: (job) => {
          setSelectedJob(job);
          setOpenEdit(true);
        },
        closeEditModal: () => {
          setSelectedJob(null);
          setOpenEdit(false);
        },
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}
