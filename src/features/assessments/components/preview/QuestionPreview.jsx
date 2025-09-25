import { AlertCircle, Badge } from "lucide-react";
import ConditionalPreview from "./ConditionalPreview";

export default function QuestionPreview({ question, answers, errors, onChange }) {
  const value = answers[question.id];
  // console.log("props: ", question)
  return (
    <div className={`space-y-3 ${errors[question.id] ? "error-field" : ""}`}>
      <div className="flex items-center gap-2">
        <label className="block text-sm font-medium text-gray-900">
          {question.question}
        </label>
        {question.required && (
          <span className="text-xs text-red-500 border border-red-300 rounded px-1">
            Required
          </span>
        )}
      </div>

      {/* Text */}
      {question.type === "short-text" && (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value, question)}
          placeholder={question.placeholder || "Enter your answer..."}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      )}

      {question.type === "long-text" && (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value, question)}
          placeholder={question.placeholder || "Enter your detailed answer..."}
          rows={4}
          className="w-full border rounded-lg px-3 py-2 text-sm resize-vertical"
        />
      )}

      {/* Numeric */}
      {question.type === "numeric" && (
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(question.id, e.target.value, question)}
          placeholder={question.placeholder || "Enter a number..."}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
      )}
      {/* Single Choice */}
      {question.type === "single-choice" && (
        <div className="space-y-2">
          {question.options?.map((opt, idx) => (
            <div key={idx} className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt.label}
                  checked={value === opt.label}
                  onChange={() => onChange(question.id, opt.label, question)} // ✅ pass question
                />
                <span>{opt.label}</span>
              </label>

              {value === opt.label && opt.conditionalQuestion && (
                <ConditionalPreview
                  question={opt.conditionalQuestion}
                  answers={answers}
                  errors={errors}
                  onChange={onChange}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Multi Choice */}
      {question.type === "multi-choice" && (
        <div className="space-y-2">
          {question.options?.map((opt, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={opt}
                checked={value?.includes(opt) || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  const newValue = checked
                    ? [...(value || []), opt]
                    : (value || []).filter((o) => o !== opt);

                  onChange(question.id, newValue, question); // ✅ pass question
                }}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {/* Single Choice */}
      {/* {question.type === "single-choice" && (
        <div className="space-y-2">
          {question.options?.map((opt, idx) => (
            <div key={idx} className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={`q-${question.id}`}
                  value={opt.label}
                  checked={value === opt.label}
                  onChange={() => onChange(question.id, opt.label)}
                />
                <span>{opt.label}</span>
              </label>

              {value === opt.label && opt.conditionalQuestion && (
                <ConditionalPreview
                  question={opt.conditionalQuestion}
                  answers={answers}
                  errors={errors}
                  onChange={onChange}
                />
              )}
            </div>
          ))}
        </div>
      )} */}

      {/* Multi Choice */}
      {/* {question.type === "multi-choice" && (
        <div className="space-y-2">
          {question.options?.map((opt, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                value={opt.label}
                checked={value?.includes(opt.label) || false}
                onChange={(e) => {
                  const checked = e.target.checked;
                  onChange(
                    question.id,
                    checked
                      ? [...(value || []), opt.label]
                      : value.filter((o) => o !== opt.label)
                  );
                }}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      )} */}

      {/* File Upload */}
      {question.type === "file-upload" && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {question.placeholder || "Upload your file(s)"}
          </label>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
            onClick={() => document.getElementById(`file-input-${question.id}`).click()}
          >
            <svg
              className="w-8 h-8 text-gray-400 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-400 mt-1">
              {question.validation?.maxSizeMB
                ? `Max size: ${question.validation.maxSizeMB}MB`
                : "(Upload functionality is for preview only)"}
            </p>
          </div>

          <input
            id={`file-input-${question.id}`}
            type="file"
            multiple={question.validation?.multiple || false}
            accept={
              question.validation?.fileType === "any"
                ? "*"
                : question.validation?.fileType === "custom"
                ? question.validation?.allowedTypes?.map((ext) => `.${ext}`).join(",")
                : question.validation?.fileType === "image"
                ? "image/*"
                : question.validation?.fileType === "document"
                ? ".pdf,.doc,.docx"
                : question.validation?.fileType === "spreadsheet"
                ? ".xls,.xlsx,.csv"
                : "*"
            }
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              console.log("Files selected:", files);
              onChange(question.id, files);
            }}
            className="hidden"
          />

          {/* Preview selected files */}
          {Array.isArray(answers?.[question.id]) && answers[question.id].length > 0 && (
            <ul className="mt-2 text-sm text-gray-600 space-y-1">
              {answers[question.id].map((file, i) => (
                <li key={i} className="flex justify-between items-center">
                  <span>{file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}


      {/* Error message */}
      {errors[question.id] && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {errors[question.id]}
        </div>
      )}
    </div>
  );
}
