// import Input from "../../../../components/Input";

// export default function ShortTextQuestion({ question, updateQuestion }) {
//   return (
//     <Input
//       label="Answer Placeholder"
//       value={question.placeholder || ""}
//       onChange={(e) => updateQuestion(question.id, { placeholder: e.target.value })}
//       placeholder="Short answer..."
//     />
//   );
// }


// ShortTextQuestion.jsx
import Input from "../../../../components/Input";

export default function ShortTextQuestion({ question, updateQuestion }) {
  return (
    <div className="space-y-4">
      <Input
        label="Answer Placeholder"
        value={question.placeholder || ""}
        onChange={(e) => updateQuestion(question.id, { placeholder: e.target.value })}
        placeholder="Short answer..."
      />
      
      <div className="flex gap-4">
        <Input
          label="Min Length"
          type="number"
          value={question.validation?.minLength || ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { ...question.validation, minLength: Number(e.target.value) || undefined }
          })}
          placeholder="0"
          className="w-24"
        />
        
        <Input
          label="Max Length"
          type="number"
          value={question.validation?.maxLength || ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { ...question.validation, maxLength: Number(e.target.value) || undefined }
          })}
          placeholder="255"
          className="w-24"
        />
      </div>
    </div>
  );
}
