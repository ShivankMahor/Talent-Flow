import { useParams } from "react-router-dom";
import { AssessmentsBuilderProvider } from "../context/AssessmentsBuilderProvider";
import AssessmentsBuilderPage from "../../assessments/pages/AssessmentsBuilderPage";

// Wrapper for route so we can pass jobId
export default function AssessmentsBuilderRouterWrapper() {
  const { jobId } = useParams();
  return (
    <AssessmentsBuilderProvider jobId={jobId}>
      <AssessmentsBuilderPage />
    </AssessmentsBuilderProvider>
  );
}
