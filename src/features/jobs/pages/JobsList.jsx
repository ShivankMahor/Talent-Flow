import { JobsProvider } from "../context/JobsContext";
import JobsPage from "./JobsPage"; // split UI part

export default function JobsList() {
  return (
    <JobsProvider>
      <JobsPage />
    </JobsProvider>
  );
}
