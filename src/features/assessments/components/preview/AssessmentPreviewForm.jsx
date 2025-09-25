import { useEffect, useState } from "react";
import Card from "../../../../components/Card";
import Button from "../../../../components/Button";
import { CheckCircle } from "lucide-react";
import SectionPreview from "./SectionPreview";
import { useAssessmentsBuilder } from "../../context/AssessmentsBuilderProvider";

export default function AssessmentPreviewForm({ sections }) {
  const { jobId, submit } = useAssessmentsBuilder();
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    const saved = localStorage.getItem(`submission-${jobId}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      setAnswers(parsed.answers || {});
      console.log("Loaded saved submission from localStorage:", parsed);
    }
  }, [jobId]);

  function handleChange(qId, value, question) {
  console.log("Answer updated:", qId, value);
  setAnswers((prev) => ({ ...prev, [qId]: value }));

  // Run validation for this question only
  const error = validateSingle(question, value);
  setErrors((prev) => ({ ...prev, [qId]: error || null }));
  }

  function validate() {
    let newErrors = {};
    sections.forEach((section) => {
      section.questions.forEach((q) => {
        const value = answers[q.id];

        // Required validation
        if (q.required && (!value || (Array.isArray(value) && value.length === 0))) {
          newErrors[q.id] = "This field is required.";
        }

        // String length
        if (q.validation?.maxLength && value?.length > q.validation.maxLength) {
          newErrors[q.id] = `Max length is ${q.validation.maxLength} characters`;
        }
        if (q.validation?.minLength && value?.length < q.validation.minLength) {
          newErrors[q.id] = `Min length is ${q.validation.minLength} characters`;
        }

        // Numeric range
        if (q.type === "numeric" && value !== undefined && value !== "") {
          const num = Number(value);
          if (isNaN(num)) {
            newErrors[q.id] = "Please enter a valid number";
          } else {
            if (q.validation?.min !== undefined && num < q.validation.min) {
              newErrors[q.id] = `Minimum value is ${q.validation.min}`;
            }
            if (q.validation?.max !== undefined && num > q.validation.max) {
              newErrors[q.id] = `Maximum value is ${q.validation.max}`;
            }
          }
        }
      });
    });
    return newErrors;
  }

  function validateSingle(q, value) {
    // Required
    if (q.required && (!value || (Array.isArray(value) && value.length === 0))) {
      return "This field is required.";
    }

    // Length checks
    if (q.validation?.maxLength && value?.length > q.validation.maxLength) {
      return `Max length is ${q.validation.maxLength} characters`;
    }
    if (q.validation?.minLength && value?.length < q.validation.minLength) {
      return `Min length is ${q.validation.minLength} characters`;
    }

    // Numeric checks
    if (q.type === "numeric" && value !== undefined && value !== "") {
      const num = Number(value);
      if (isNaN(num)) {
        return "Please enter a valid number";
      }
      if (q.validation?.min !== undefined && num < q.validation.min) {
        return `Minimum value is ${q.validation.min}`;
      }
      if (q.validation?.max !== undefined && num > q.validation.max) {
        return `Maximum value is ${q.validation.max}`;
      }
    }

    // File upload checks
    if (q.type === "file-upload" && value?.length) {
      const maxSize = q.validation?.maxSizeMB;
      if (maxSize) {
        const oversized = value.find((f) => f.size / 1024 / 1024 > maxSize);
        if (oversized) {
          return `File ${oversized.name} exceeds ${maxSize}MB`;
        }
      }
    }
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    console.log("validare",validate)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorElement = document.querySelector(".error-field");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else {
      setIsSubmitted(true);
      setErrors({});
      console.log("Assessment submitted:", answers);

      const submission = {
        submittedAt: new Date().toISOString(),
        answers,
      };
      localStorage.setItem(`submission-${jobId}`, JSON.stringify(submission));
      console.log("Saved submission to localStorage:", submission);

      submit(answers);
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Submitted!</h2>
        <p className="text-gray-600">Thank you for completing the assessment.</p>
      </div>
    );
  }

  return (<>
    <div className="flex items-center justify-between py-5">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
        <p className="text-sm text-gray-500 mt-1">
          You can test the assesment while builing the form
        </p>
      </div>
    </div>
    <form onSubmit={handleSubmit} className="space-y-6">
      {sections.map((section) => (
        <Card key={section.id} className="p-2">
          <SectionPreview
            section={section}
            answers={answers}
            errors={errors}
            onChange={handleChange}
          />
        </Card>
      ))}
      <div className="flex justify-end pt-2">
        <Button type="submit" size="lg" className="min-w-32">
          Submit Assessment
        </Button>
      </div>
    </form>
  </>
  
  );
}
