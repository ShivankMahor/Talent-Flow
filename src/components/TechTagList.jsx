import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaDocker,
  FaAws 
} from "react-icons/fa";
import {
  SiPostgresql,
  SiPython,
} from "react-icons/si";
import { BsBrush, BsBug, BsPeople } from "react-icons/bs"; // for design, testing, agile
import { FcLinux } from "react-icons/fc";

export default function TechTagsList({ tags = [], limit = 6, size, px, py }) {

  const tagIcons = {
    javascript: <FaJs className={`w-${size} h-${size} text-yellow-400`} />,
    react: <FaReact className={`w-${size} h-${size} text-cyan-500`} />,
    nodejs: <FaNodeJs className={`w-${size} h-${size} text-green-600`} />,
    python: <SiPython className={`w-${size} h-${size} text-blue-500`} />,
    aws: <FaAws className={`w-${size} h-${size} text-orange-500`} />,
    docker: <FaDocker className={`w-${size} h-${size} text-blue-500`} />,
    sql: <SiPostgresql className={`w-${size} h-${size} text-indigo-600`} />,
    design: <BsBrush className={`w-${size} h-${size} text-pink-500`} />,
    testing: <BsBug className={`w-${size} h-${size} text-red-500`} />,
    agile: <BsPeople className={`w-${size} h-${size} text-purple-500`} />,
    linux: <FcLinux className={`w-${size} h-${size}`}/>,
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.slice(0, limit).map((tag, index) => {
        const label = tag.charAt(0).toUpperCase() + tag.slice(1);
        return (
          <span
            key={index}
            className={`
              flex items-center gap-1 px-${px?px:"2"} py-${py?py:'0.5'} text-xs font-medium rounded-full
              bg-[var(--color-surface)] text-[var(--color-text)]
              border border-[var(--color-border)] shadow-sm
              transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {tagIcons[tag.toLowerCase()] || null}
            {label}
          </span>
        );
      })}
    </div>
  );
}
