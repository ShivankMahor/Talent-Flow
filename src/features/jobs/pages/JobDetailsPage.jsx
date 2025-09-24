// import { useParams, useNavigate } from "react-router-dom";
// import { useJobs } from "../context/JobsContext";
// import Navbar from "../../../components/Navbar";
// import Button from "../../../components/Button";
// import Loader from "../../../components/Loader";
// import Card from "../../../components/Card";
// import Badge from "../../../components/Badge";
// import EmptyState from "../../../components/EmptyState";
// import { Building2, MapPin, Banknote, ArrowLeft, FileText, Tag, Users } from "lucide-react";
// import TechTagsList from "../../../components/TechTagList";
// import { MdOutlineDescription } from "react-icons/md";
// import SmallDetailItem from "../../../components/SmallDetailItem";
// import { useEffect, useState } from "react";

// export default function JobDetailsPage() {
//   const { jobId } = useParams();
//   const navigate = useNavigate();
//   const [job, setJob] = useState()
//   const [loading, setLoading] = useState(false)
//   console.log("jObid:",jobId)

//   useEffect( async ()=>{
//     try{
//       setLoading(true)
//       const res = await getJobById(jobId)
//       console.log(res)
//       setJob(res)
//     }catch(err){
//       toast.error("Failed to get job")
//     }finally{
//       setLoading(false)
//     }
//   })

//   if (!job) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)]">
//         <Navbar />
//         <div className="flex justify-center items-center h-[70vh]">
//           <Loader />
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen bg-[var(--color-background)]">
//         <Navbar />
//         <div className="max-w-3xl mx-auto p-6">
//           <EmptyState
//             title="Job not found"
//             description="The job you are looking for does not exist or has been removed."
//             action={
//               <Button size="sm" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={14} /> Go Back
//               </Button>
//             }
//           />
//         </div>
//       </div>
//     );
//   }

//   const getStatusVariant = (status) => {
//     switch (status) {
//       case "active":
//         return "success";
//       case "archived":
//         return "warning";
//       default:
//         return "secondary";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[var(--color-background)]">
//       <Navbar />

//       <div className="max-w-5xl mx-auto p-3">
//         <Card variant="elevated" className="p-6 space-y-8">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-6">
//             <div>
//               <h1 className="flex gap-2 items-start text-4xl font-extrabold text-[var(--color-text)] mb-2">
//                 {job.title} 
//                 <span className="mt-1.5 flex items-start animate-pulse"><Badge variant={getStatusVariant(job.status)} size="md"> 
//                   {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
//                 </Badge></span>
//               </h1>
//               <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)]">
//                 {job.company && (
//                   <span className="flex items-center gap-2">
//                     <Building2 size={16} /> {job.company} 
//                   </span>
//                 )}
//                 {job.location && (
//                   <span className="flex items-center gap-2">
//                     <MapPin size={16} /> {job.location}
//                   </span>
//                 )}
//                 {job.salary && (
//                   <span className="flex items-center gap-2 font-semibold text-[var(--color-success)]">
//                     <Banknote size={16} /> {job.salary}
//                   </span>
//                 )}
//               </div>
//             </div>
//             {/* Actions */}
//             <div className="flex flex-wrap gap-3">
//               <Button size="sm" variant="ghost" onClick={() => navigate(-1)}>
//                 <ArrowLeft size={14} /> Back
//               </Button>
//               <Button size="sm" variant="secondary" onClick={() => navigate(`/assessments/${job.id}`)}>
//                 <FileText size={14} /> Assessment
//               </Button>
//             </div>
//           </div>

//           {/* Quick Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             <StatCard label="Job ID" value={`#${job.id}`} icon={<FileText size={16} />} />
//             {job.applicants && (
//               <StatCard label="Applicants" value={job.applicants} icon={<Users size={16} />} />
//             )}
//             {job.type && <StatCard label="Type" value={job.type} />}
//             {job.experience && <StatCard label="Experience" value={job.experience} />}
//           </div>

          
          
//           {/* Job Details */}
//           <Card variant="inset">
//             <section className="space-y-3 rounded-2xl">
//               {job.description && (
//                 <div>
//                   <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2 flex items-center gap-1">
//                     <MdOutlineDescription/> Description
//                   </h3>
//                   <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
//                     {job.description}
//                   </p>
//                 </div>
//               )}

//               {job.tags?.length > 0 && (
//                 <Card>
//                   <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
//                     <Tag size={16} /> Skills & Technologies
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     <TechTagsList tags={job.tags} size={4} px={3} py={1.5}/>
//                   </div>
//                 </Card>
//               )}
//               {job.postedDate && (
//                 <SmallDetailItem label="Posted" value={job.postedDate} />
//               )}
//             </section>
//           </Card>
//         </Card>
//       </div>
//     </div>
//   );
// }


// function StatCard({ label, value, icon }) {
//   return (
//     <Card variant="default">
//       <div className="flex flex-col items-center justify-center">
//         <div className="flex items-center gap-1 text-xl font-bold text-[var(--color-text)]">
//           {icon} {value}
//         </div>
//         <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
//       </div>
//     </Card>
//   );
// }



import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getJobById } from "../services/jobs.api";

import Navbar from "../../../components/Navbar";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import Card from "../../../components/Card";
import Badge from "../../../components/Badge";
import EmptyState from "../../../components/EmptyState";
import { Building2, MapPin, Banknote, ArrowLeft, FileText, Tag, Users } from "lucide-react";
import TechTagsList from "../../../components/TechTagList";
import { MdOutlineDescription } from "react-icons/md";
import SmallDetailItem from "../../../components/SmallDetailItem";

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await getJobById(jobId);
        setJob(res);
      } catch (err) {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <div className="flex justify-center items-center h-[70vh]">
          <Loader />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <div className="max-w-3xl mx-auto p-6">
          <EmptyState
            title="Job not found"
            description="The job you are looking for does not exist or has been removed."
            action={
              <Button size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft size={14} /> Go Back
              </Button>
            }
          />
        </div>
      </div>
    );
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "archived":
        return "warning";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />

      <div className="max-w-5xl mx-auto p-3">
        <Card variant="elevated" className="p-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b pb-6">
            <div>
              <h1 className="flex gap-2 items-start text-4xl font-extrabold text-[var(--color-text)] mb-2">
                {job.title}
                <span className="mt-1.5 flex items-start animate-pulse">
                  <Badge variant={getStatusVariant(job.status)} size="md">
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </span>
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-muted)]">
                {job.company && (
                  <span className="flex items-center gap-2">
                    <Building2 size={16} /> {job.company}
                  </span>
                )}
                {job.location && (
                  <span className="flex items-center gap-2">
                    <MapPin size={16} /> {job.location}
                  </span>
                )}
                {job.salary && (
                  <span className="flex items-center gap-2 font-semibold text-[var(--color-success)]">
                    <Banknote size={16} /> {job.salary}
                  </span>
                )}
              </div>
            </div>
            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button size="sm" variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft size={14} /> Back
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/assessments/${job.id}`)}
              >
                <FileText size={14} /> Assessment
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard label="Job ID" value={`#${job.id}`} icon={<FileText size={16} />} />
            <StatCard label="Applicants" value={job.applicants} icon={<Users size={16} />} />
            {job.type && <StatCard label="Type" value={job.type} />}
            {job.experience && <StatCard label="Experience" value={job.experience} />}
          </div>

          {/* Job Details */}
          <Card variant="inset">
            <section className="space-y-3 rounded-2xl">
              {job.description && (
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text)] mb-2 flex items-center gap-1">
                    <MdOutlineDescription /> Description
                  </h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {job.description}
                  </p>
                </div>
              )}

              {job.tags?.length > 0 && (
                <Card>
                  <h3 className="text-xl font-semibold text-[var(--color-text)] mb-3 flex items-center gap-2">
                    <Tag size={16} /> Skills & Technologies
                  </h3>
                  <TechTagsList tags={job.tags} size={4} px={3} py={1.5} />
                </Card>
              )}
              {job.postedDate && <SmallDetailItem label="Posted" value={job.postedDate} />}
            </section>
          </Card>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <Card variant="default">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-1 text-xl font-bold text-[var(--color-text)]">
          {icon} {value}
        </div>
        <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
      </div>
    </Card>
  );
}
