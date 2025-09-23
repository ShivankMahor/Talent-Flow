// // SectionCard.jsx
// import { useState } from "react";
// import Input from "../../../components/Input";
// import Textarea from "../../../components/Textarea";
// import Button from "../../../components/Button";
// import Select from "../../../components/Select";
// import Card from "../../../components/Card";
// import Badge from "../../../components/Badge";
// import QuestionList from "./QuestionList";
// import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
// import { Trash2, GripVertical, Plus } from "lucide-react";

// const questionTypes = [
//   { value: "single-choice", label: "Single Choice" },
//   { value: "multi-choice", label: "Multi Choice" },
//   { value: "short-text", label: "Short Text" },
//   { value: "long-text", label: "Long Text" },
//   { value: "numeric", label: "Numeric" },
//   { value: "file-upload", label: "File Upload" },
// ];

// export default function SectionCard({ section }) {
//   const { updateSection, removeSection } = useAssessmentsBuilder();
//   const [newType, setNewType] = useState("short-text");
//   const [isExpanded, setIsExpanded] = useState(true);

//   function updateField(field, value) {
//     updateSection(section.id, { [field]: value });
//   }

//   function addQuestion() {
//     const newQuestion = {
//       id: Date.now(),
//       type: newType,
//       question: "",
//       options: newType.includes("choice") ? [""] : [],
//       required: false,
//       validation: {}
//     };
    
//     updateSection(section.id, {
//       questions: [...(section.questions || []), newQuestion],
//     });
//   }

//   const questionCount = section.questions?.length || 0;

//   return (
//     <Card className="group hover:shadow-lg transition-all duration-200">
//       <div className="p-6">
//         {/* Section Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div className="flex items-center gap-3 flex-1">
//             <GripVertical className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-move" />
            
//             <div className="flex-1 space-y-4">
//               <div className="flex items-center gap-3">
//                 <Input
//                   label=""
//                   value={section.title}
//                   onChange={(e) => updateField("title", e.target.value)}
//                   placeholder="Section Title (e.g. Frontend Basics)"
//                   className="text-lg font-semibold border-none px-0 focus:ring-0 shadow-none"
//                 />
//                 <Badge variant="secondary" size="sm">
//                   {questionCount} question{questionCount !== 1 ? 's' : ''}
//                 </Badge>
//               </div>
              
//               <Textarea
//                 label=""
//                 value={section.description || ""}
//                 onChange={(e) => updateField("description", e.target.value)}
//                 placeholder="Optional section description..."
//                 className="resize-none border-none px-0 focus:ring-0 shadow-none"
//                 rows={2}
//               />
//             </div>
//           </div>
          
//           <div className="flex items-center gap-2 ml-4">
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
//             >
//               <svg 
//                 className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//               </svg>
//             </button>
            
//             <button
//               onClick={() => removeSection(section.id)}
//               className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
//               aria-label="Delete section"
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>

//         {/* Section Content */}
//         {isExpanded && (
//           <div className="space-y-6">
//             {/* Questions List */}
//             <QuestionList sectionId={section.id} questions={section.questions} />

//             {/* Add Question Controls */}
//             <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//               <div className="flex items-center gap-3">
//                 <Select
//                   label=""
//                   value={newType}
//                   onChange={(e) => setNewType(e.target.value)}
//                   options={questionTypes}
//                   className="w-48"
//                 />
//                 <Button 
//                   size="sm" 
//                   onClick={addQuestion}
//                   variant="primary"
//                   className="flex items-center gap-2"
//                 >
//                   <Plus className="w-4 h-4" />
//                   Add Question
//                 </Button>
//               </div>
              
//               <div className="text-xs text-gray-500">
//                 Section ID: {section.id}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// }



// SectionCard.jsx
import { useState } from "react";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import QuestionList from "./QuestionList";
import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
import { Trash2, GripVertical, Plus, ChevronDown, ChevronUp } from "lucide-react";

const questionTypes = [
  { value: "single-choice", label: "Single Choice" },
  { value: "multi-choice", label: "Multi Choice" },
  { value: "short-text", label: "Short Text" },
  { value: "long-text", label: "Long Text" },
  { value: "numeric", label: "Numeric" },
  { value: "file-upload", label: "File Upload" },
];

export default function SectionCard({ section }) {
  const { updateSection, removeSection } = useAssessmentsBuilder();
  const [newType, setNewType] = useState("short-text");
  const [isExpanded, setIsExpanded] = useState(true);

  function updateField(field, value) {
    updateSection(section.id, { [field]: value });
  }

  function addQuestion() {
    const newQuestion = {
      id: Date.now(),
      type: newType,
      question: "",
      options: newType.includes("choice") ? [""] : [],
      required: false,
      validation: {}
    };
    
    updateSection(section.id, {
      questions: [...(section.questions || []), newQuestion],
    });
  }

  const questionCount = section.questions?.length || 0;

  return (
    <Card className="group hover:shadow-sm transition-all duration-200">
      <div className="">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1 flex-1">
            {/* <GripVertical className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 cursor-move" /> */}
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  label=""
                  value={section.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="Section Title"
                  className="text-base font-semibold border-none px-0 focus:ring-0 shadow-none"
                />
                 <Badge variant="secondary" size="sm">
                   {questionCount} question{questionCount !== 1 ? 's' : ''}
                 </Badge>
              </div>
              
              <Textarea
                label=""
                value={section.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Section description..."
                className="resize-none border px-0 focus:ring-0 shadow-none text-sm"
                rows={1}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            
            <button
              onClick={() => removeSection(section.id)}
              className="p-1 text-gray-400 hover:text-red-600 rounded opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-2">
            <QuestionList sectionId={section.id} questions={section.questions} />

            <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
              <Select
                label=""
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                options={questionTypes}
                className="w-40"
              />
              <Button size="md" onClick={addQuestion} className="flex items-center gap-1">
                <Plus className="w-3 h-3" />
                Add Question
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}