import { useEffect, useRef } from "react";
import CandidateCard from "./CandidateCard";
import { useNavigate } from "react-router-dom";
export default function RowComponent({ index, style, candidates, onLastVisible }) {
  const isLast = index === candidates.length - 1;
  const ref = useRef(null);
  const navigate = useNavigate()
  const candidate = candidates[index]
  useEffect(() => {
    if (!isLast) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLastVisible(); 
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [isLast, onLastVisible]);

  return (
    <div style={style} ref={isLast ? ref : null} onClick={()=>navigate(`/candidate/${candidate.id}`,{ state: { candidate } })}>
      <CandidateCard candidate={candidate} />
    </div>
  );
}