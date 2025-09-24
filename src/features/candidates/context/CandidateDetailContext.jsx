import { createContext, useContext, useEffect, useState, startTransition } from "react";
import { toast } from "react-toastify";
import { getCandidateById, getCandidateTimeline, updateCandidate } from "../services/candidates.api";

const CandidateDetailContext = createContext(null);

export function CandidateDetailProvider({ candidateId, children }) {
  const [candidate, setCandidate] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [notes, setNotes] = useState([]); // local notes with @mentions
  const [loading, setLoading] = useState(true);
  // Fetch candidate + timeline on mount
  useEffect(() => {
    if (!candidateId) return;

    (async () => {
      try {
        setLoading(true);
        const data = await getCandidateById(candidateId);
        console.log("[CandidateDetailProvider] data:",{data})
        const res = await getCandidateTimeline(candidateId);
        setCandidate(data);
        console.log("history: ",res)
        setTimeline(res);
      } catch (err) {
        toast.error("Failed to load candidate ❌");
      } finally {
        setLoading(false);
      }
    })();
  }, [candidateId]);

  // Update candidate (edit or stage change)
  const handleUpdate = async (updates) => {
    if (!candidate) return;

    const original = candidate;
    setCandidate({ ...candidate, ...updates }); // optimistic update

    startTransition(async () => {
      try {
        const updated = await updateCandidate(candidate.id, updates);
        setCandidate(updated);
        toast.success("Candidate updated ✅");
      } catch (err) {
        setCandidate(original); // rollback
        toast.error("Failed to update candidate ❌");
      }
    });
  };

  // Add a note with @mentions
  const addNote = (text) => {
    const newNote = {
      id: Date.now(),
      text,
      createdAt: new Date().toISOString(),
      mentions: extractMentions(text), // utility to parse @mentions
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const extractMentions = (text) => {
    const matches = text.match(/@\w+/g) || [];
    return matches.map((m) => m.slice(1)); // strip @
  };

  return (
    <CandidateDetailContext.Provider
      value={{
        candidate,
        timeline,
        notes,
        loading,
        handleUpdate,
        addNote,
      }}
    >
      {children}
    </CandidateDetailContext.Provider>
  );
}

export function useCandidateDetail() {
  return useContext(CandidateDetailContext);
}
