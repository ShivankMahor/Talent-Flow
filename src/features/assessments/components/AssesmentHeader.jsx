// // AssessmentHeader.jsx
// import Input from "../../../components/Input";
// import Badge from "../../../components/Badge";
// import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
// import Button from "../../../components/Button";

// export default function AssessmentHeader() {
//   const { title, setTitle, jobId, handleLoadSampleAssesment } = useAssessmentsBuilder();

//   return (
//     <div className="space-y-6 pb-6 border-b border-gray-200 flex justify-between">
//       <div className="justify-between">
//         <div className="">
//           <h1 className="text-2xl font-bold text-gray-900">
//             Assessment Builder
//           </h1>
//           <div className="flex justify-center items-center">
//             <p className="text-sm text-gray-500">
//               Create comprehensive assessments for candidate evaluation
//             </p>
//             <Badge variant="secondary" className="text-sm">
//               Job ID: {jobId}
//             </Badge>
//           </div>
//         </div>
//         <div className="mt-1">
//           <Input
//             label="Assessment Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="e.g. Frontend Developer Assessment"
//             className="text-lg font-medium"
//             />
//         </div>
//       </div>

//       <div className="max-w-md">
        
//           {/* Sample load buttons */}
//         <div className="flex gap-3">
//           <Button
//             size="sm"
//             variant="secondary"
//             onClick={() => handleLoadSampleAssesment("frontend")}
//           >
//             Load Frontend Sample
//           </Button>
//           <Button
//             size="sm"
//             variant="secondary"
//             onClick={() => handleLoadSampleAssesment("backend")}
//           >
//             Load Backend Sample
//           </Button>
//           <Button
//             size="sm"
//             variant="secondary"
//             onClick={() => handleLoadSampleAssesment("general")}
//           >
//             Load General Sample
//           </Button>
//         </div>
//       </div>
      
//     </div>
//   );
// }


// // AssessmentHeader.jsx
// import Input from "../../../components/Input";
// import Badge from "../../../components/Badge";
// import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";

// export default function AssessmentHeader() {
//   const { title, setTitle, jobId } = useAssessmentsBuilder();

//   return (
//     <div className="space-y-3 pb-3 border-b border-gray-200">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-bold text-gray-900">Assessment Builder</h1>
//           <p className="text-xs text-gray-500">Create assessments for candidate evaluation</p>
//         </div>
//         <Badge variant="secondary" className="text-xs">Job ID: {jobId}</Badge>
//       </div>

//       <div className="max-w-md">
//         <Input
//           label="Assessment Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="e.g. Frontend Developer Assessment"
//         />
//       </div>
//     </div>
//   );
// }





import Input from "../../../components/Input";
import Badge from "../../../components/Badge";
import { useAssessmentsBuilder } from "../context/AssessmentsBuilderProvider";
import Button from "../../../components/Button";

export default function AssessmentHeader() {
  const { title, setTitle, jobId, handleLoadSampleAssessment } = useAssessmentsBuilder();

  return (
    <div className="flex items-start justify-between pb-6 mb-6 border-b border-gray-200">
      {/* Left side: title + description */}
      <div className="flex-1 space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          Assessment Builder
          <Badge variant="secondary" className="text-xs">
            Job ID: {jobId}
          </Badge>
        </h1>
        <p className="text-sm text-gray-500 max-w-lg">
          Create comprehensive assessments with multiple sections and questions. 
          You can also start from a ready-made template.
        </p>

        <div className="mt-3 max-w-md">
          <Input
            label="Assessment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Frontend Developer Assessment"
            className="text-base"
          />
        </div>
      </div>

      {/* Right side: sample assessment buttons */}
      <div className="ml-6 bg-gray-50/50 border border-gray-200 rounded-lg p-3.5 shadow-sm w-72">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Load Sample Assessment
        </h2>
        <div className="flex flex-col gap-1.5">
          <Button
            size="sm"
            variant="secondary"
            className="justify-start"
            onClick={() => handleLoadSampleAssessment("frontend")}
          >
            🚀 Frontend Developer
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="justify-start"
            onClick={() => handleLoadSampleAssessment("backend")}
          >
            ⚙️ Backend Developer
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="justify-start"
            onClick={() => handleLoadSampleAssessment("general")}
          >
            📘 General Aptitude
          </Button>
        </div>
      </div>
    </div>
  );
}
