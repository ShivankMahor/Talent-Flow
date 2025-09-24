// import { FileText, TabletSmartphone, Binary, SquarePercent, Check, X } from 'lucide-react';
// const STAGES = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// const stageConfig = {
//   applied: { color: "#64748b", icon: FileText },
//   screen: { color: "#f59e0b", icon: TabletSmartphone },
//   tech: { color: "#8b5cf6", icon: Binary },
//   offer: { color: "#06b6d4", icon: SquarePercent },
//   hired: { color: "#10b981", icon: Check },
//   rejected: { color: "#ef4444", icon: X }
// };

// function CandidateTimelineBar({ timeline }) {
//   console.log("timeline insde: ",timeline)
//   const { stage, events } = timeline 
//   const currentIndex = STAGES.indexOf(stage);
//   const isRejected = stage === "rejected";
//   console.log("timeline: ",events)
//   return (
//     <div className="w-full py-2">
//       <div className="flex items-center justify-between relative">
//         {/* Progress line */}
//         <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[var(--color-border)]" />
//         <div
//           className="absolute top-1/2 left-4 h-0.5 transition-all duration-300"
//           style={{ 
//             width: isRejected 
//               ? 'calc(100% - 32px)' 
//               : `calc(${(currentIndex / (STAGES.length - 2)) * 100}% - 16px)`,
//             backgroundColor: stageConfig[stage].color
//           }}
//         />
        
//         {/* Stage markers */}
//         {STAGES.map((stage, idx) => {
//           if (!isRejected && stage === "rejected") return null;
//           if (isRejected && stage !== "applied" && stage !== "rejected") return null;
          
//           const isCompleted = isRejected ? (stage === "rejected" || idx === 0) : idx <= currentIndex;
//           const config = stageConfig[stage];
//           const IconComponent = config.icon;
          
//           return (
//             <div key={stage} className="flex flex-col items-center">
//               <div
//                 className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
//                   isCompleted 
//                     ? 'bg-white shadow-sm' 
//                     : 'bg-[var(--color-surface-alt)]'
//                 }`}
//                 style={{
//                   borderColor: isCompleted ? config.color : 'var(--color-border)',
//                   color: isCompleted ? config.color : 'var(--color-text-muted)'
//                 }}
//               >
//                 <IconComponent size={12} />
//               </div>
//               <span 
//                 className="text-xs mt-5 capitalize"
//                 style={{
//                   color: isCompleted ? config.color : 'var(--color-text-muted)'
//                 }}
//               >
//                 {stage}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default CandidateTimelineBar;

import { FileText, TabletSmartphone, Binary, SquarePercent, Check, X } from 'lucide-react';
import SmallDetailItem from '../../../components/SmallDetailItem';

const STAGES = ["applied", "screen", "tech", "offer", "hired", "rejected"];

const stageConfig = {
  applied: { color: "#64748b", icon: FileText },
  screen: { color: "#f59e0b", icon: TabletSmartphone },
  tech: { color: "#8b5cf6", icon: Binary },
  offer: { color: "#06b6d4", icon: SquarePercent },
  hired: { color: "#10b981", icon: Check },
  rejected: { color: "#ef4444", icon: X }
};

function CandidateTimelineBar({ timeline = {} }) {
  const { stage, events = [] } = timeline;
  const currentIndex = STAGES.indexOf(stage);
  const isRejected = stage === "rejected";

  return (
    <div className="w-full py-2">
      <div className="flex items-center justify-between relative">
        {/* Base progress line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-[var(--color-border)]" />
        {/* Active progress */}
        {stage && (
          <div
            className="absolute top-1/2 left-4 h-0.5 transition-all duration-300"
            style={{
              width: isRejected
                ? 'calc(100% - 32px)'
                : `calc(${(currentIndex / (STAGES.length - 2)) * 100}% - 16px)`,
              backgroundColor: stageConfig[stage].color
            }}
          />
        )}

        {/* Stage markers */}
        {STAGES.map((s, idx) => {
          if (!isRejected && s === "rejected") return null;
          if (isRejected && s !== "applied" && s !== "rejected") return null;

          const event = events.find((e) => e.stage === s);
          const isCompleted = !!event;
          const config = stageConfig[s];
          const IconComponent = config.icon;

          return (
            <div key={s} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 mb-2.5 rounded-full border flex items-center justify-center transition-all ${
                  isCompleted ? "bg-white shadow-sm" : "bg-[var(--color-surface-alt)]"
                }`}
                style={{
                  borderColor: isCompleted ? config.color : "var(--color-border)",
                  color: isCompleted ? config.color : "var(--color-text-muted)"
                }}
                
              >
                <IconComponent size={12} />
              </div>

              {/* Date below icon */}
              {event ? (
                <span className="text-[10px] text-[var(--color-text-muted)]">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              ): (<span className="text-[10px] text-[var(--color-text-muted)]">
                  ....
                </span>)}

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CandidateTimelineBar;
