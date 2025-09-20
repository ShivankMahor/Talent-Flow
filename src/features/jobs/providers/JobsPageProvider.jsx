// features/jobs/providers/JobsPageProvider.jsx
import { JobsProvider } from "../context/JobsContext";
import JobsPage from "../pages/JobsPage";

export default function JobsPageProvider() {
  return (
    <JobsProvider>
      <JobsPage />
    </JobsProvider>
  );
}
