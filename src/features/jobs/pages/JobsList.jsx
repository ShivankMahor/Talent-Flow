import { useEffect, useState, useOptimistic, startTransition } from "react";
import { toast } from "react-toastify";
import JobsListCards from "../components/JobListCards";
import JobsToolbar from "../components/JobsToolbar";
import JobsPagination from "../components/JobsPagination";
import { getJobs, reorderJob } from "../services/jobs.api";
import Navbar from "../../../components/Navbar"

export default function JobsList() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "", sort: "order" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [optimisticJobs, setOptimisticJobs] = useOptimistic( jobs,(currentJobs, newData) => {
      const fromJob = newData.fromJob
      const toJob = newData.toJob
      const updated = currentJobs.map((job) => {
        if (job.id === fromJob.id) return fromJob;
        if (job.id === toJob.id) return toJob;
        return job;
      });
      return [...updated].sort((a, b) => a.order - b.order);;
    }
  );

  useEffect(() => {
    (async () => {
      const res = await getJobs({ ...filters, page, pageSize });
      console.log(res)
      setJobs(res.data);
      setTotal(res.meta.total);
      setPage(res.meta.page);
    })();
  }, [filters, page]);

  const handleReorder = async (jobId, fromJob, toJob) => {
    const newData = {
      fromJob: { ...fromJob, order: toJob.order },
      toJob: { ...toJob, order: fromJob.order }
    }
    setOptimisticJobs(newData);
    startTransition(async () => {
      try {
        const { updatedFromJob, updatedToJob } = await reorderJob(jobId, fromJob.order, toJob.order );
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
        console.error("[handleReorder] failed:", err);
        toast.error("Failed to reorder job ❌");
      }
      });
  };
  // derive tags list (unique)
  const allTags = Array.from(new Set(jobs.flatMap((j) => j.tags || [])));

  return (
    <div>
      <Navbar />
      <div className="p-4 space-y-4">
        <JobsToolbar
          filters={filters}
          onChangeFilters={setFilters}
          allTags={allTags}
        />
        <JobsListCards jobs={optimisticJobs} onReorder={handleReorder} />
        <JobsPagination
          page={page}
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}