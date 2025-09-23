// import SectionCard from "./SectionCard";
// import Button from "../../../components/Button";
// import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";


// export default function SectionList() {
//   const { sections, addSection } = useAssessmentsBuilder();

//   return (
//     <div className="space-y-6">
//       {sections.map((s) => (
//         <SectionCard key={s.id} section={s} />
//       ))}

//       <Button onClick={addSection} >+ Add Section</Button>
//     </div>
//   );
// }



// SectionList.jsx
import SectionCard from "./SectionCard";
import Button from "../../../components/Button";
import EmptyState from "../../../components/EmptyState";
import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
import { FileText, Plus } from "lucide-react";

export default function SectionList() {
  const { sections, addSection } = useAssessmentsBuilder();

  if (sections.length === 0) {
    return (
      <div className="text-center py-10">
        <EmptyState
          icon={FileText}
          title="No sections yet"
          description="Create your first section to start building the assessment."
          action={
            <Button onClick={addSection} className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add First Section
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Assessment Sections</h2>
          <p className="text-sm text-gray-500 mt-1">
            Organize your questions into logical sections for better candidate experience.
          </p>
        </div>
        
        <Button onClick={addSection} variant="outline" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </div>

      <div className="space-y-3">
        {sections.map((section, index) => (
          <div key={section.id} className="relative">
            {index > 0 && (
              <div className="absolute -top-3 left-6 w-px h-6 bg-gray-200" />
            )}
            <SectionCard section={section} />
          </div>
        ))}
      </div>
    </div>
  );
}