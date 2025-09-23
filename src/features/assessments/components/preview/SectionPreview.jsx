import QuestionPreview from "./QuestionPreview";

export default function SectionPreview({ section, answers, errors, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
        {section.description && (
          <p className="text-gray-600 text-sm">{section.description}</p>
        )}
      </div>

      <div className="space-y-4">
        {section.questions.map((q) => (
          <QuestionPreview
            key={q.id}
            question={q}
            answers={answers}
            errors={errors}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}
