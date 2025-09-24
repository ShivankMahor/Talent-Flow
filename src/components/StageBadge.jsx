import { CheckCircle, XCircle, FileText, Users, Laptop, Award } from "lucide-react";

export default function StageBadge({ stage, size = 4, px = 2, py = 0.5 }) {
  const stageIcons = {
    applied: <FileText style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}/>,
    screen: <Users style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}/>,
    tech: <Laptop style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}/>,
    offer: <Award style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }} />,
    hired: <CheckCircle style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}/>,
    rejected: <XCircle style={{ width: `${size * 0.25}rem`, height: `${size * 0.25}rem` }}/>,
  };

  const stageStyles = {
    applied: "bg-gray-100 text-gray-700 border border-gray-300",
    screen: "bg-yellow-100 text-yellow-800 border border-yellow-300",
    tech: "bg-purple-100 text-purple-700 border border-purple-300",
    offer: "bg-blue-100 text-blue-700 border border-blue-300",
    hired: "bg-green-100 text-green-700 border border-green-300",
    rejected: "bg-red-100 text-red-700 border border-red-300",
  };

  const label = stage ? stage.charAt(0).toUpperCase() + stage.slice(1) : "";

  return (
    <span
      className={`
        inline-flex items-center gap-1 px-${px} py-${py} text-xs font-medium rounded-full
        ${stageStyles[stage] || "bg-gray-100 text-gray-700 border border-gray-300"}
        shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md
      `}
    >
      {stageIcons[stage] || null}
      {label}
    </span>
  );
}
