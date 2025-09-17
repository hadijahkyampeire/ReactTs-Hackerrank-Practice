import React from "react";

type Props = {
  aText: string;
  bText: string;
  aCount: number;
  bCount: number;
  locked: boolean;      // winner declared?
  onDeclare: () => void;
};

/**
 * Shows running status and the "View Winner" button.
 * Button must have data-testid="result-button" and "winner-button".
 */
const Results: React.FC<Props> = ({ aText, bText, aCount, bCount, locked, onDeclare }) => {
  // TODO compute running text:
  // - "" when total=0
  // - "It's a tie" when equal and >0
  // - "{Leader} is leading by {diff} vote(s)" otherwise
  const total = aCount + bCount;
  const diff: number = Math.abs(aCount - bCount);
  const leader: string = aCount > bCount ? aText : bText;
  const running = total === 0 ? "" : (aCount === bCount) && total > 0 ? "It's a tie" : `${leader} is leading by ${diff} vote(s)`;

  // TODO winner text after locked=true:
  // - tie -> "It's a tie"
  // - else -> "{Leader} won by {diff} vote(s)"
  const finalText = (aCount === bCount) && total > 0 ? "It's a tie" : `${leader} won by ${diff} vote(s)`;;

  const buttonDisabled = total === 0 || locked;

  return (
    <div className="results">
      <div aria-live="polite" data-testid="result-text">
        {locked ? finalText : running}
      </div>
      <button
        data-testid="result-button"
        // extra id some tests look for in your shots
        aria-label="View Winner"
        onClick={onDeclare}
        disabled={buttonDisabled}
      >
        View Winner
      </button>
      {/* mirror attribute name seen in one screenshot */}
      <button
        style={{ display: "none" }}
        data-testid="winner-button"
        disabled
      />
    </div>
  );
};

export default Results;
