// QuestionCard.jsx
import Select from "../../../components/Select";
import Input from "../../../components/Input";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import { Trash2, Copy, GripVertical } from "lucide-react";

import SingleChoiceQuestion from "./types/SingleChoiceQuestion";
import MultiChoiceQuestion from "./types/MultipleChoiceQuestion";
import ShortTextQuestion from "./types/ShortTextQuestion";
import LongTextQuestion from "./types/LongTextQuestion";
import NumericQuestion from "./types/NumericQuestion";
import FileUploadQuestion from "./types/FileUploadQuestion";

const questionTypes = [
  { value: "single-choice", label: "Single Choice" },
  { value: "multi-choice", label: "Multi Choice" },
  { value: "short-text", label: "Short Text" },
  { value: "long-text", label: "Long Text" },
  { value: "numeric", label: "Numeric" },
  { value: "file-upload", label: "File Upload" },
];

const typeColors = {
  "single-choice": "blue",
  "multi-choice": "purple", 
  "short-text": "green",
  "long-text": "emerald",
  "numeric": "orange",
  "file-upload": "pink"
};

export default function QuestionCard({
  question,
  updateQuestion,
  removeQuestion,
  duplicateQuestion,
}) {
  function renderQuestionType() {
    switch (question.type) {
      case "single-choice":
        return <SingleChoiceQuestion question={question} updateQuestion={updateQuestion} />;
      case "multi-choice":
        return <MultiChoiceQuestion question={question} updateQuestion={updateQuestion} />;
      case "short-text":
        return <ShortTextQuestion question={question} updateQuestion={updateQuestion} />;
      case "long-text":
        return <LongTextQuestion question={question} updateQuestion={updateQuestion} />;
      case "numeric":
        return <NumericQuestion question={question} updateQuestion={updateQuestion} />;
      case "file-upload":
        return <FileUploadQuestion question={question} updateQuestion={updateQuestion} />;
      default:
        return null;
    }
  }

  return (
    <Card className="group hover:shadow-sm transition-all duration-200 border-l-2 border-l-blue-500">
      <div className="p-1 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 cursor-move" />
            <Badge variant={typeColors[question.type] || "warning"} size="sm">
              {questionTypes.find(t => t.value === question.type)?.label}
            </Badge>
          </div>
          
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => duplicateQuestion(question)}
              className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={() => removeQuestion(question.id)}
              className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="space-y-3 grid col-span-1">
            <Input
              label="Question Text"
              value={question.question}
              onChange={(e) => updateQuestion(question.id, { question: e.target.value })}
              placeholder="Enter your question..."
              />
              </div>
              <div className="grid col-span-1">

            <Select
              label="Question Type"
              value={question.type}
              onChange={(e) => updateQuestion(question.id, { type: e.target.value })}
              options={questionTypes}
              />
              </div>
              <div className="grid col-span-2">

            {renderQuestionType()}
              </div>
          
          <div className="space-y-3">
            
            
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={question.required || false}
                onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                className="rounded text-blue-600"
              />
              <span className="text-gray-700">Required field</span>
            </label>
          </div>
        </div>
      </div>
    </Card>
  );
}