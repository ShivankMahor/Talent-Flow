// import Input from "../../../../components/Input";

// export default function NumericQuestion({ question, updateQuestion }) {
//   return (
//     <div className="flex gap-2">
//       <Input
//         label="Min"
//         type="number"
//         value={question.min || ""}
//         onChange={(e) => updateQuestion(question.id, { min: Number(e.target.value) })}
//       />
//       <Input
//         label="Max"
//         type="number"
//         value={question.max || ""}
//         onChange={(e) => updateQuestion(question.id, { max: Number(e.target.value) })}
//       />
//     </div>
//   );
// }




// NumericQuestion.jsx
import Input from "../../../../components/Input";

export default function NumericQuestion({ question, updateQuestion }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          label="Minimum Value"
          type="number"
          value={question.validation?.min !== undefined ? question.validation.min : ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { ...question.validation, min: e.target.value !== "" ? Number(e.target.value) : undefined }
          })}
          placeholder="0"
        />
        <Input
          label="Maximum Value"
          type="number"
          value={question.validation?.max !== undefined ? question.validation.max : ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { ...question.validation, max: e.target.value !== "" ? Number(e.target.value) : undefined }
          })}
          placeholder="100"
        />
      </div>
      
      <div className="flex gap-4">
        <Input
          label="Step"
          type="number"
          value={question.validation?.step || ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { ...question.validation, step: Number(e.target.value) || undefined }
          })}
          placeholder="1"
          className="w-24"
        />
        
        <Input
          label="Decimal Places"
          type="number"
          value={question.validation?.decimals !== undefined ? question.validation.decimals : ""}
          onChange={(e) => updateQuestion(question.id, { 
            validation: { ...question.validation, decimals: e.target.value !== "" ? Number(e.target.value) : undefined }
          })}
          placeholder="0"
          className="w-24"
        />
      </div>
      
      <Input
        label="Answer Placeholder"
        value={question.placeholder || ""}
        onChange={(e) => updateQuestion(question.id, { placeholder: e.target.value })}
        placeholder="Enter a number..."
      />
    </div>
  );
}