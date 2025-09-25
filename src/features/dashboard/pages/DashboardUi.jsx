// src/features/dashboard/components/DashboardUI.jsx
import { useDashboard } from "../context/DashboardContext";
import Navbar from "../../../components/Navbar";
import Loader from "../../../components/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import {
  Briefcase,
  Archive,
  Users,
  FileText,
  Tag,
  TrendingUp,
} from "lucide-react";

export default function DashboardUI() {
  const {
    jobsSummary,
    jobsByTags,
    candidatesPipeline,
    candidatesTotal,
    topJobs,
    tagsUsage,
    loading,
  } = useDashboard();

  // Mock extra data: trend of candidates pipeline over months
  const candidateTrend = [
    { month: "Jan", applied: 120, hired: 20 },
    { month: "Feb", applied: 140, hired: 25 },
    { month: "Mar", applied: 160, hired: 30 },
    { month: "Apr", applied: 180, hired: 40 },
    { month: "May", applied: 200, hired: 50 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Navbar />
        <Header title="Dashboard" />
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Navbar />
      <Header title="Dashboard" />

      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            title="Active Jobs"
            value={jobsSummary?.activeCount}
            icon={<Briefcase className="text-[var(--color-primary)] w-5 h-5" />}
          />
          <StatCard
            title="Archived Jobs"
            value={jobsSummary?.archivedCount}
            icon={<Archive className="text-[var(--color-warning)] w-5 h-5" />}
          />
          <StatCard
            title="Total Candidates"
            value={candidatesTotal?.totalCandidates}
            icon={<Users className="text-[var(--color-accent)] w-5 h-5" />}
          />
          <StatCard
            title="Total Tags"
            value={tagsUsage?.length}
            icon={<Tag className="text-[var(--color-danger)] w-5 h-5" />}
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ChartCard title="Jobs by Tags">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={jobsByTags}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-primary)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Candidate Pipeline">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={candidatesPipeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis dataKey="stage" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-accent)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <ChartCard title="Top Jobs by Candidate Volume">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topJobs} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis type="number" stroke="var(--color-text-secondary)" />
                <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-warning)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Most Used Tags">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tagsUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis dataKey="name" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip />
                <Bar dataKey="count" fill="var(--color-danger)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Extra Trend Chart */}
        <div className="grid grid-cols-1">
          <ChartCard title="Candidates Applied vs Hired (Trend)">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={candidateTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-light)" />
                <XAxis dataKey="month" stroke="var(--color-text-secondary)" />
                <YAxis stroke="var(--color-text-secondary)" />
                <Tooltip />
                <Line type="monotone" dataKey="applied" stroke="var(--color-sky)" strokeWidth={2} />
                <Line type="monotone" dataKey="hired" stroke="var(--color-success)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}

/* -------------------------
   Helper components
-------------------------- */

function Header({ title }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <h1 className="text-lg font-semibold text-[var(--color-text)] flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-[var(--color-primary)]" />
        {title}
      </h1>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 shadow-sm flex flex-col items-center">
      <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
        {icon}
        {title}
      </div>
      <div className="text-xl font-semibold text-[var(--color-text)]">{value ?? "-"}</div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-3 shadow-sm">
      <h2 className="text-sm font-medium text-[var(--color-text)] mb-2">{title}</h2>
      {children}
    </div>
  );
}









// import React, { useMemo } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// import {
//   Briefcase,
//   Archive,
//   Users,
//   Clock,
//   CheckCircle,
//   XCircle,
//   Target,
//   TrendingUp,
//   Activity,
//   Award,
//   FileText,
//   Tag,
// } from "lucide-react";

// // Mock data context - simulating the useDashboard hook
// const useDashboard = () => {
//   return {
//     jobsSummary: { activeCount: 23, archivedCount: 8 },
//     jobsByTags: [
//       { name: "React", count: 45 },
//       { name: "Node.js", count: 38 },
//       { name: "Python", count: 42 },
//       { name: "AWS", count: 29 },
//       { name: "Docker", count: 33 },
//     ],
//     candidatesPipeline: [
//       { stage: "Applied", count: 245 },
//       { stage: "Screen", count: 89 },
//       { stage: "Tech", count: 67 },
//       { stage: "Offer", count: 34 },
//       { stage: "Hired", count: 28 },
//       { stage: "Rejected", count: 156 },
//     ],
//     candidatesTotal: { totalCandidates: 619 },
//     topJobs: [
//       { name: "Frontend Engineer", count: 89 },
//       { name: "Backend Developer", count: 76 },
//       { name: "Data Scientist", count: 68 },
//       { name: "DevOps Engineer", count: 54 },
//       { name: "Product Manager", count: 43 },
//     ],
//     tagsUsage: [
//       { name: "React", count: 45 },
//       { name: "Python", count: 42 },
//       { name: "Node.js", count: 38 },
//       { name: "TypeScript", count: 35 },
//       { name: "Docker", count: 33 },
//     ],
//     loading: false,
//   };
// };

// // Generate additional mock data to support existing API data
// const generateSupportingData = (apiData) => {
//   const totalCandidates = apiData.candidatesTotal?.totalCandidates || 0;
//   const hiredCount = apiData.candidatesPipeline?.find(p => p.stage === "Hired")?.count || 0;
//   const rejectedCount = apiData.candidatesPipeline?.find(p => p.stage === "Rejected")?.count || 0;
  
//   // Calculate success rate
//   const successRate = totalCandidates > 0 ? ((hiredCount / totalCandidates) * 100).toFixed(1) : "0.0";
  
//   // Generate pipeline with percentages
//   const pipelineWithPercentages = apiData.candidatesPipeline?.map(stage => ({
//     ...stage,
//     percentage: totalCandidates > 0 ? ((stage.count / totalCandidates) * 100).toFixed(1) + "%" : "0%",
//     color: getPipelineColor(stage.stage)
//   })) || [];

//   // Mock performance metrics based on API data
//   const performanceMetrics = [
//     { 
//       name: "Time to Hire", 
//       value: "18 days", 
//       change: "-12%", 
//       positive: true, 
//       icon: <Clock className="w-4 h-4" /> 
//     },
//     { 
//       name: "Interview Rate", 
//       value: "36.3%", 
//       change: "+8.2%", 
//       positive: true, 
//       icon: <Activity className="w-4 h-4" /> 
//     },
//     { 
//       name: "Offer Accept", 
//       value: "82.4%", 
//       change: "+5.1%", 
//       positive: true, 
//       icon: <Award className="w-4 h-4" /> 
//     },
//     { 
//       name: "Success Rate", 
//       value: successRate + "%", 
//       change: totalCandidates > 500 ? "+2.1%" : "-1.3%", 
//       positive: totalCandidates > 500, 
//       icon: <Target className="w-4 h-4" /> 
//     },
//   ];

//   // Mock monthly trend data
//   const monthlyTrend = [
//     { month: "Jan", applications: 120, hired: 18, interviews: 45 },
//     { month: "Feb", applications: 140, hired: 22, interviews: 52 },
//     { month: "Mar", applications: 160, hired: 28, interviews: 68 },
//     { month: "Apr", applications: 180, hired: 34, interviews: 72 },
//     { month: "May", applications: 200, hired: 41, interviews: 85 },
//     { month: "Jun", applications: Math.floor(totalCandidates * 0.4), hired: hiredCount, interviews: 89 },
//   ];

//   return { 
//     successRate, 
//     pipelineWithPercentages, 
//     performanceMetrics, 
//     monthlyTrend,
//     totalCandidates,
//     activeInProgress: (apiData.candidatesPipeline?.find(p => p.stage === "Tech")?.count || 0) + 
//                      (apiData.candidatesPipeline?.find(p => p.stage === "Offer")?.count || 0)
//   };
// };

// // Helper function for pipeline colors
// const getPipelineColor = (stage) => {
//   const colors = {
//     'Applied': '#E5E7EB',
//     'Screen': '#FEF3C7', 
//     'Tech': '#E0E7FF',
//     'Offer': '#DBEAFE',
//     'Hired': '#D1FAE5',
//     'Rejected': '#FEE2E2'
//   };
//   return colors[stage] || '#F3F4F6';
// };

// const getStageChartColor = (stage) => {
//   const colors = {
//     'Applied': '#9CA3AF',
//     'Screen': '#F59E0B',
//     'Tech': '#8B5CF6',
//     'Offer': '#3B82F6',
//     'Hired': '#10B981',
//     'Rejected': '#EF4444'
//   };
//   return colors[stage] || '#9CA3AF';
// };

// export default function DashboardUI() {
//   const apiData = useDashboard();
//   const supportingData = useMemo(() => generateSupportingData(apiData), [apiData]);

//   if (apiData.loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       {/* Header */}
//       <div className="bg-white border border-gray-200 rounded-lg mb-4 px-4 py-3">
//         <div className="flex items-center gap-2">
//           <TrendingUp className="w-5 h-5 text-blue-600" />
//           <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {/* Key Metrics Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
//           <MetricCard
//             title="Active Jobs"
//             value={apiData.jobsSummary?.activeCount}
//             icon={<Briefcase className="w-4 h-4 text-blue-600" />}
//             bgColor="bg-blue-50"
//             borderColor="border-blue-200"
//           />
//           <MetricCard
//             title="Archived Jobs"
//             value={apiData.jobsSummary?.archivedCount}
//             icon={<Archive className="w-4 h-4 text-gray-600" />}
//             bgColor="bg-gray-50"
//             borderColor="border-gray-200"
//           />
//           <MetricCard
//             title="Total Candidates"
//             value={supportingData.totalCandidates}
//             icon={<Users className="w-4 h-4 text-green-600" />}
//             bgColor="bg-green-50"
//             borderColor="border-green-200"
//           />
//           <MetricCard
//             title="In Progress"
//             value={supportingData.activeInProgress}
//             icon={<Clock className="w-4 h-4 text-orange-600" />}
//             bgColor="bg-orange-50"
//             borderColor="border-orange-200"
//           />
//           <MetricCard
//             title="Hired"
//             value={apiData.candidatesPipeline?.find(s => s.stage === "Hired")?.count}
//             icon={<CheckCircle className="w-4 h-4 text-emerald-600" />}
//             bgColor="bg-emerald-50"
//             borderColor="border-emerald-200"
//           />
//           <MetricCard
//             title="Total Tags"
//             value={apiData.tagsUsage?.length}
//             icon={<Tag className="w-4 h-4 text-purple-600" />}
//             bgColor="bg-purple-50"
//             borderColor="border-purple-200"
//           />
//         </div>

//         {/* Pipeline Overview - Kanban Style */}
//         <div className="bg-white rounded-lg border border-gray-200 p-4">
//           <h2 className="text-base font-semibold text-gray-900 mb-3">Candidate Pipeline</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
//             {supportingData.pipelineWithPercentages.map((stage) => (
//               <PipelineColumn key={stage.stage} stage={stage} />
//             ))}
//           </div>
//         </div>

//         {/* Performance Metrics */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//           {supportingData.performanceMetrics.map((metric, index) => (
//             <PerformanceCard key={index} metric={metric} />
//           ))}
//         </div>

//         {/* Charts Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {/* Monthly Trend Chart */}
//           <ChartCard title="Monthly Hiring Trend">
//             <ResponsiveContainer width="100%" height={220}>
//               <LineChart data={supportingData.monthlyTrend}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
//                 <YAxis stroke="#6b7280" fontSize={11} />
//                 <Tooltip />
//                 <Line 
//                   type="monotone" 
//                   dataKey="applications" 
//                   stroke="#3b82f6" 
//                   strokeWidth={2}
//                   name="Applications"
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="interviews" 
//                   stroke="#f59e0b" 
//                   strokeWidth={2}
//                   name="Interviews"
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="hired" 
//                   stroke="#10b981" 
//                   strokeWidth={2}
//                   name="Hired"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           {/* Jobs by Tags Chart */}
//           <ChartCard title="Jobs by Tags">
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={apiData.jobsByTags}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="name" stroke="#6b7280" fontSize={11} />
//                 <YAxis stroke="#6b7280" fontSize={11} />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           {/* Top Jobs Chart */}
//           <ChartCard title="Top Jobs by Candidate Volume">
//             <ResponsiveContainer width="100%" height={220}>
//               <BarChart data={apiData.topJobs} layout="horizontal">
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis type="number" stroke="#6b7280" fontSize={11} />
//                 <YAxis dataKey="name" type="category" stroke="#6b7280" fontSize={10} width={100} />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#06b6d4" radius={[0, 2, 2, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </ChartCard>

//           {/* Pipeline Distribution */}
//           <ChartCard title="Candidate Pipeline Distribution">
//             <ResponsiveContainer width="100%" height={220}>
//               <PieChart>
//                 <Pie
//                   data={apiData.candidatesPipeline}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={40}
//                   outerRadius={80}
//                   dataKey="count"
//                   fontSize={10}
//                 >
//                   {apiData.candidatesPipeline?.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={getStageChartColor(entry.stage)} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </ChartCard>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Component definitions
// function MetricCard({ title, value, icon, bgColor, borderColor }) {
//   return (
//     <div className={`${bgColor} ${borderColor} rounded-lg p-3 border`}>
//       <div className="flex items-center justify-between mb-1">
//         {icon}
//       </div>
//       <div className="text-xl font-bold text-gray-900 mb-1">{value ?? "-"}</div>
//       <div className="text-xs text-gray-600">{title}</div>
//     </div>
//   );
// }

// function PipelineColumn({ stage }) {
//   return (
//     <div 
//       className="border border-gray-200 rounded-lg p-3 text-center" 
//       style={{ backgroundColor: stage.color }}
//     >
//       <div className="text-sm font-medium text-gray-900 mb-1">{stage.stage}</div>
//       <div className="text-lg font-bold text-gray-900 mb-1">{stage.count}</div>
//       <div className="text-xs text-gray-600">{stage.percentage}</div>
//     </div>
//   );
// }

// function PerformanceCard({ metric }) {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-3">
//       <div className="flex items-center gap-2 mb-2">
//         <div className={metric.positive ? 'text-green-600' : 'text-red-600'}>
//           {metric.icon}
//         </div>
//         <div className="text-xs text-gray-600">{metric.name}</div>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="text-lg font-bold text-gray-900">{metric.value}</div>
//         <div className={`text-xs font-medium px-2 py-1 rounded-full ${
//           metric.positive 
//             ? 'text-green-700 bg-green-100' 
//             : 'text-red-700 bg-red-100'
//         }`}>
//           {metric.change}
//         </div>
//       </div>
//     </div>
//   );
// }

// function ChartCard({ title, children }) {
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4">
//       <h3 className="text-sm font-semibold text-gray-900 mb-3">{title}</h3>
//       {children}
//     </div>
//   );
// }