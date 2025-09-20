import { JobsProvider } from "../context/JobsContext";
import JobDetailsPage from "./JobDetailsPage";

export default function JobDetail(){
  return (
    <JobsProvider>
      <JobDetailsPage />
    </JobsProvider>
  );
}