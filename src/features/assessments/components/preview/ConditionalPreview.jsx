import QuestionPreview from "./QuestionPreview";

export default function ConditionalPreview({ question, answers, errors, onChange }) {
  return (
    <div className="ml-6 mt-2 border-l pl-4 space-y-2">
      <QuestionPreview
        question={question}
        answers={answers}
        errors={errors}
        onChange={onChange}
      />
    </div>
  );
}
