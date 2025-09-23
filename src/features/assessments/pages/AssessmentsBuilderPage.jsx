import AssessmentHeader from "../components/AssesmentHeader";
import SectionList from "../components/SectionList";
import Button from "../../../components/Button";
import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
import AssessmentPreviewForm from "../components/preview/AssessmentPreviewForm";
import Navbar from "../../../components/Navbar"

export default function AssessmentsBuilderPage() {
  const { title, setTitle, sections, save, loading } = useAssessmentsBuilder();
  return (
    <div>
      <Navbar/>
      <div className="space-y-2 p-6">
          <AssessmentHeader title={title} setTitle={setTitle} />
          <div className="flex">
            <div className="p-4 space-y-4 min-w-1/2">
              <SectionList sections={sections} />
              {sections && sections.length !== 0 && <Button onClick={save} loading={loading}>Save Assessment</Button>}
            </div>
            {sections.length !== 0 &&
              <div className="w-1/2">
                <AssessmentPreviewForm title={title} sections={sections}/>
              </div>
            }
          </div>
      </div>
    </div>
  );
}
