// import { GripVertical, Plus, X } from "lucide-react";
// import Input from "../../../../components/Input";
// import { useEffect } from "react";
// import Button from "../../../../components/Button";

// export default function SingleChoiceQuestion({ question, updateQuestion }) {
//  const options = question.options || [];
  
//   const updateOption = (index, value) => {
//     const updated = [...options];
//     updated[index] = value;
//     updateQuestion(question.id, { options: updated });
//   };
  
//   const addOption = () => {
//     updateQuestion(question.id, { options: [...options, ""] });
//   };
  
//   const removeOption = (index) => {
//     updateQuestion(question.id, {
//       options: options.filter((_, i) => i !== index),
//     });
//   };
  
//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <label className="block text-sm font-medium text-gray-700">
//           Answer Options
//         </label>
//         <span className="text-xs text-gray-500">
//           {options.length} option{options.length !== 1 ? 's' : ''}
//         </span>
//       </div>
      
//       <div className="space-y-3">
//         {options.map((opt, i) => (
//           <div key={i} className="group flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
//             <div className="flex items-center text-gray-400">
//               <GripVertical className="w-4 h-4" />
//             </div>
            
//             <div className="flex items-center gap-2 text-gray-500">
//               <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
//               <span className="text-sm font-medium">
//                 {String.fromCharCode(65 + i)}
//               </span>
//             </div>
            
//             <input
//               value={opt}
//               onChange={(e) => updateOption(i, e.target.value)}
//               placeholder={`Option ${i + 1}`}
//               className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
//             />
            
//             {options.length > 1 && (
//               <button
//                 onClick={() => removeOption(i)}
//                 className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
//               >
//                 <X  className="w-4 h-4" />
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
      
//       <Button
//         size="sm" 
//         variant="ghost" 
//         onClick={addOption}
//         className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-600"
//       >
//         <Plus className="w-4 h-4 mr-2" />
//         Add Option
//       </Button>
//     </div>
//   );
// };



import { GripVertical, Plus, X } from "lucide-react";
import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import QuestionCard from "../QuestionCard"; // reuse main question UI

export default function SingleChoiceQuestion({ question, updateQuestion, removeQuestion, duplicateQuestion }) {
  const options = question.options || [];

  const updateOption = (index, field, value) => {
    const updated = [...options];
    updated[index] = { ...updated[index], [field]: value };
    updateQuestion(question.id, { options: updated });
  };

  const addOption = () => {
    updateQuestion(question.id, { options: [...options, { label: "" }] });
  };

  const removeOption = (index) => {
    updateQuestion(question.id, {
      options: options.filter((_, i) => i !== index),
    });
  };

  const addConditional = (index) => {
    const updated = [...options];
    updated[index] = {
      ...updated[index],
      conditionalQuestion: {
        id: Date.now(),
        type: "short-text",
        question: "Follow-up question",
        options: [],
        required: false,
        validation: {}
      }
    };
    updateQuestion(question.id, { options: updated });
  };

  const updateConditional = (index, qid, updates) => {
    const updated = [...options];
    if (updated[index]?.conditionalQuestion?.id === qid) {
      updated[index] = {
        ...updated[index],
        conditionalQuestion: {
          ...updated[index].conditionalQuestion,
          ...updates
        }
      };
    }
    updateQuestion(question.id, { options: updated });
  };

  const removeConditional = (index) => {
    const updated = [...options];
    delete updated[index].conditionalQuestion;
    updateQuestion(question.id, { options: updated });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Answer Options
        </label>
        <span className="text-xs text-gray-500">
          {options.length} option{options.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-2">
        {options.map((opt, i) => (
          <div key={i} className="space-y-2">
            {/* Option row */}
            <div className="group flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center text-gray-400">
                <GripVertical className="w-4 h-4" />
              </div>

              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                <span className="text-sm font-medium">
                  {String.fromCharCode(65 + i)}
                </span>
              </div>

              <input
                value={opt.label || ""}
                onChange={(e) => updateOption(i, "label", e.target.value)}
                placeholder={`Option ${i + 1}`}
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
              />

              {/* Add follow-up button */}
              {!opt.conditionalQuestion && (
                <button
                  onClick={() => addConditional(i)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add follow-up
                </button>
              )}

              {options.length > 1 && (
                <button
                  onClick={() => removeOption(i)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Nested conditional question */}
            {opt.conditionalQuestion && (
              <div className="ml-8 border-l pl-4 space-y-2">
                <QuestionCard
                  question={opt.conditionalQuestion}
                  updateQuestion={(qid, updates) =>
                    updateConditional(i, qid, updates)
                  }
                  removeQuestion={() => removeConditional(i)}
                  duplicateQuestion={(q) => console.log("Dup nested not implemented", q)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        size="sm"
        variant="ghost"
        onClick={addOption}
        className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 hover:text-blue-600"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Option
      </Button>
    </div>
  );
}
