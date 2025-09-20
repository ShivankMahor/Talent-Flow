// features/jobs/providers/JobDetailProvider.jsx
import { JobsProvider } from "../context/JobsContext";
import JobDetailsPage from "../pages/JobDetailsPage";

export default function JobDetailProvider() {
  return (
    <JobsProvider>
      <JobDetailsPage />
    </JobsProvider>
  );
}
