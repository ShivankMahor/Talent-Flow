import { createContext, useContext, useState, useEffect } from "react";
import { getAssessment, loadSampleAssessment, saveAssessment } from "../services/assessments.api";
import { useLocalStorage } from "../../../hooks/useLocalStorage"
import { toast } from "react-toastify";
const AssessmentsBuilderContext = createContext();

export function AssessmentsBuilderProvider({ jobId, children }) {
  const [title, setTitle] = useLocalStorage(`title-${jobId}`,"");
  const [sections, setSections] = useLocalStorage(`sections-${jobId}`,[]);
  const [loading, setLoading] = useState(false);

  // Fetch existing assessment
  useEffect(() => {
    (async () => {
      if (!jobId) return;
      try {
        const res = await getAssessment(jobId);
        setTitle(res.title || "");
        setSections(res.sections || []);
      } catch {
        console.log("No existing assessment, starting fresh");
      }
    })();
  }, [jobId]);

  async function handleLoadSampleAssesment(type) {
    setLoading(true);
    try {
      const res = await loadSampleAssessment(type);
      setTitle(res.title || "");
      setSections(res.sections || []);
      toast.success(`Loaded ${type} sample assessment`);
    } catch (err) {
      console.error("Error loading sample assessment:", err);
      toast.error("Failed to load sample assessment");
    } finally {
      setLoading(false);
    }
  }
  async function save() {
    setLoading(true);
    try {
      await saveAssessment(jobId, { title, sections });
      alert("Assessment saved ✅");
    } catch (err) {
      alert(err.message || "Failed to save assessment ❌");
    } finally {
      setLoading(false);
    }
  }

  // Section helpers
  function addSection() {
    setSections((prev) => [
      ...prev,
      { id: Date.now(), title: "", description: "", questions: [] },
    ]);
  }
  function updateSection(id, updates) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  }
  function removeSection(id) {
    setSections((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <AssessmentsBuilderContext.Provider
      value={{
        jobId,
        title,
        setTitle,
        sections,
        setSections,
        addSection,
        updateSection,
        removeSection,
        save,
        handleLoadSampleAssesment,
        loading,
      }}
    >
      {children}
    </AssessmentsBuilderContext.Provider>
  );
}

export function useAssessmentsBuilder() {
  const ctx = useContext(AssessmentsBuilderContext);
  if (!ctx) {
    throw new Error("useAssessmentsBuilder must be used inside an AssessmentsBuilderProvider");
  }
  return ctx;
}
