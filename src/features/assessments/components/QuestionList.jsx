// // QuestionList.jsx
// import QuestionCard from "./QuestionCard";
// import EmptyState from "../../../components/EmptyState";
// import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
// import { FileQuestion } from "lucide-react";

// export default function QuestionList({ sectionId, questions = [] }) {
//   const { updateSection } = useAssessmentsBuilder();

//   function setQuestions(updated) {
//     updateSection(sectionId, { questions: updated });
//   }

//   function duplicateQuestion(question) {
//     const duplicated = {
//       ...question,
//       id: Date.now(),
//       question: `${question.question} (Copy)`
//     };
//     setQuestions([...questions, duplicated]);
//   }

//   if (questions.length === 0) {
//     return (
//       <EmptyState
//         icon={FileQuestion}
//         title="No questions yet"
//         description="Add your first question to get started with this section."
//         className="my-8 py-12"
//       />
//     );
//   }

//   return (
//     <div className="space-y-4 mt-6">
//       {questions.map((q, index) => (
//         <div key={q.id} className="relative">
//           {index > 0 && (
//             <div className="absolute -top-2 left-4 w-px h-4 bg-gray-200" />
//           )}
//           <QuestionCard
//             question={q}
//             updateQuestion={(id, updates) =>
//               setQuestions(
//                 questions.map((item) =>
//                   item.id === id ? { ...item, ...updates } : item
//                 )
//               )
//             }
//             removeQuestion={(id) =>
//               setQuestions(questions.filter((item) => item.id !== id))
//             }
//             duplicateQuestion={duplicateQuestion}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }



// QuestionList.jsx
import QuestionCard from "./QuestionCard";
import EmptyState from "../../../components/EmptyState";
import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
import { FileQuestion } from "lucide-react";

export default function QuestionList({ sectionId, questions = [] }) {
  const { updateSection } = useAssessmentsBuilder();

  function setQuestions(updated) {
    updateSection(sectionId, { questions: updated });
  }

  function duplicateQuestion(question) {
    const duplicated = {
      ...question,
      id: Date.now(),
      question: `${question.question} (Copy)`
    };
    setQuestions([...questions, duplicated]);
  }

  if (questions.length === 0) {
    return (
      <EmptyState
        icon={FileQuestion}
        title="No questions"
        description="Add questions to this section."
        className="my-4 py-6"
      />
    );
  }

  return (
    <div className="space-y-2 mt-2">
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          updateQuestion={(id, updates) =>
            setQuestions(
              questions.map((item) =>
                item.id === id ? { ...item, ...updates } : item
              )
            )
          }
          removeQuestion={(id) =>
            setQuestions(questions.filter((item) => item.id !== id))
          }
          duplicateQuestion={duplicateQuestion}
        />
      ))}
    </div>
  );
}