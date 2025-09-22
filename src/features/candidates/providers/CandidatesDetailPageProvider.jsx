// src/features/candidates/providers/CandidateDetailProvider.jsx
import { useParams } from "react-router-dom";
import { CandidateDetailProvider } from "../context/CandidateDetailContext";
import CandidateDetailsPage from "../pages/CandidateDetailsPage";

export default function CandidatesDetailPageProvider() {
  const { id } = useParams();

  return (
    <CandidateDetailProvider candidateId={id}>
      <CandidateDetailsPage />
    </CandidateDetailProvider>
  );
}
