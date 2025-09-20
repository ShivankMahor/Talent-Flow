import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Card from "../../../components/Card";
import Button from "../../../components/Button";
import Badge from "../../../components/Badge";
import Pagination from "../../../components/Pagination";
import Loader from "../../../components/Loader";
import { getJobs, applyToJob } from "../services/jobs.api";

export default function CandidateJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    loadJobs();
  }, [page]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobs({ page, pageSize: perPage, status: "active" });
      setJobs(res.data);
    } catch {
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await applyToJob(jobId);
      toast.success("Applied successfully");
    } catch {
      toast.error("Failed to apply");
    }
  };

  return (
    <div className="p-6 bg-[var(--color-background)] min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-[var(--color-text)]">Available Jobs</h1>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-[var(--color-text)]">{job.title}</h2>
              <Badge variant="success">{job.status}</Badge>
              <Button className="mt-auto" onClick={() => handleApply(job.id)}>
                Apply
              </Button>
            </Card>
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={5}
        onChange={setPage}
        withJump
      />
    </div>
  );
}
