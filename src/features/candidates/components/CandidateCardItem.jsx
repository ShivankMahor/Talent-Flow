// CandidateCardItem.jsx
import React from "react";
import CandidateBoardCard from "./CandidateBoardCard";

const CandidateCardItem = React.forwardRef(({ candidate, style, listeners, attributes }, ref) => (
  <div
    ref={ref}
    style={{
      cursor: "grab",
      ...style,
    }}
    {...listeners}
    {...attributes}
  >
    <CandidateBoardCard candidate={candidate} />
  </div>
));

export default CandidateCardItem;
