// src/features/dashboard/context/DashboardContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify"

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [jobsSummary, setJobsSummary] = useState(null);
  const [jobsByTags, setJobsByTags] = useState([]);
  const [candidatesPipeline, setCandidatesPipeline] = useState([]);
  const [candidatesTotal, setCandidatesTotal] = useState(null);
  const [topJobs, setTopJobs] = useState([]);
  const [tagsUsage, setTagsUsage] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [
        jobsSummaryRes,
        jobsByTagsRes,
        candidatesPipelineRes,
        candidatesTotalRes,
        topJobsRes,
        tagsUsageRes,
      ] = await Promise.all([
        fetch("/api/dashboard/jobs-summary"),
        fetch("/api/dashboard/jobs-by-tags"),
        fetch("/api/dashboard/candidates-pipeline"),
        fetch("/api/dashboard/candidates-total"),
        fetch("/api/dashboard/top-jobs"),
        fetch("/api/dashboard/tags-usage"),
      ]);

      if (!jobsSummaryRes.ok) throw new Error("Failed to load Jobs Summary");
      if (!jobsByTagsRes.ok) throw new Error("Failed to load Jobs by Tags");
      if (!candidatesPipelineRes.ok) throw new Error("Failed to load Candidates Pipeline");
      if (!candidatesTotalRes.ok) throw new Error("Failed to load Candidates Total");
      if (!topJobsRes.ok) throw new Error("Failed to load Top Jobs");
      if (!tagsUsageRes.ok) throw new Error("Failed to load Tags Usage");

      setJobsSummary(await jobsSummaryRes.json());
      setJobsByTags(await jobsByTagsRes.json());
      setCandidatesPipeline(await candidatesPipelineRes.json());
      setCandidatesTotal(await candidatesTotalRes.json());
      setTopJobs(await topJobsRes.json());
      setTagsUsage(await tagsUsageRes.json());
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DashboardContext.Provider
      value={{
        jobsSummary,
        jobsByTags,
        candidatesPipeline,
        candidatesTotal,
        topJobs,
        tagsUsage,
        loading,
        refresh: fetchData, // allow manual refresh
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used inside DashboardProvider");
  }
  return ctx;
}
