// export default function FileUploadQuestion() {
//   return (
//     <p className="text-sm text-gray-500">
//       (File upload is just a stub — not stored, only for UI preview)
//     </p>
//   );
// }



// FileUploadQuestion.jsx
import { Upload, FileText, X } from "lucide-react";
import Input from "../../../../components/Input";
import Select from "../../../../components/Select";
import Button from "../../../../components/Button";

const fileTypeOptions = [
  { value: "any", label: "Any file type" },
  { value: "image", label: "Images only (jpg, png, gif, etc.)" },
  { value: "document", label: "Documents (pdf, doc, docx, etc.)" },
  { value: "spreadsheet", label: "Spreadsheets (xls, xlsx, csv)" },
  { value: "custom", label: "Custom file types" }
];

export default function FileUploadQuestion({ question, updateQuestion }) {
  const allowedTypes = question.validation?.allowedTypes || [];
  const fileType = question.validation?.fileType || "any";
  
  const updateFileType = (newType) => {
    let updatedValidation = { ...question.validation, fileType: newType };
    
    // Reset allowedTypes when switching away from custom
    if (newType !== "custom") {
      updatedValidation.allowedTypes = [];
    }
    
    updateQuestion(question.id, { validation: updatedValidation });
  };
  
  const addFileType = () => {
    updateQuestion(question.id, {
      validation: { 
        ...question.validation, 
        allowedTypes: [...allowedTypes, ""] 
      }
    });
  };
  
  const updateFileTypeAtIndex = (index, value) => {
    const updated = [...allowedTypes];
    updated[index] = value;
    updateQuestion(question.id, {
      validation: { 
        ...question.validation, 
        allowedTypes: updated 
      }
    });
  };
  
  const removeFileType = (index) => {
    updateQuestion(question.id, {
      validation: { 
        ...question.validation, 
        allowedTypes: allowedTypes.filter((_, i) => i !== index)
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* File upload preview area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-sm text-gray-500 mb-1">File upload preview</p>
        <p className="text-xs text-gray-400">
          (Upload functionality is for UI preview only)
        </p>
      </div>
      
      {/* File type restriction */}
      <Select
        label="Allowed File Types"
        value={fileType}
        onChange={(e) => updateFileType(e.target.value)}
        options={fileTypeOptions}
      />
      
      {/* Custom file types */}
      {fileType === "custom" && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Custom File Extensions
          </label>
          
          {allowedTypes.map((type, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">.</span>
              <input
                value={type}
                onChange={(e) => updateFileTypeAtIndex(i, e.target.value)}
                placeholder="pdf"
                className="flex-1 border border-gray-300 rounded px-3 py-1 text-sm"
              />
              <button
                onClick={() => removeFileType(i)}
                className="text-gray-400 hover:text-red-500 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          
          <Button
            size="sm"
            variant="ghost"
            onClick={addFileType}
            className="border-dashed border-gray-300"
          >
            <FileText className="w-4 h-4 mr-2" />
            Add File Type
          </Button>
        </div>
      )}
      
      {/* File size limit */}
      <div className="flex gap-4">
        <Input
          label="Max File Size (MB)"
          type="number"
          value={question.validation?.maxSizeMB || ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { 
              ...question.validation, 
              maxSizeMB: Number(e.target.value) || undefined 
            }
          })}
          placeholder="10"
          className="w-32"
        />
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Multiple Files
          </label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`multiple-${question.id}`}
                checked={!question.validation?.multiple}
                onChange={() => updateQuestion(question.id, { 
                  validation: { ...question.validation, multiple: false }
                })}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Single file</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`multiple-${question.id}`}
                checked={question.validation?.multiple}
                onChange={() => updateQuestion(question.id, { 
                  validation: { ...question.validation, multiple: true }
                })}
                className="text-blue-600"
              />
              <span className="text-sm text-gray-700">Multiple files</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Help text */}
      <Input
        label="Instructions for Candidates"
        value={question.placeholder || ""}
        onChange={(e) => updateQuestion(question.id, { placeholder: e.target.value })}
        placeholder="Please upload your resume..."
      />
    </div>
  );
}