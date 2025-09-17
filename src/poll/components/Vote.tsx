import React from "react";

type Props = {
  text: string;
  count: number;
  disabled: boolean;
  onVote: () => void;
  testId: "option-1" | "option-2";
  choiceId: "choice-1" | "choice-2";
};

/** Renders one option box with text and a Vote button. */
const Vote: React.FC<Props> = ({ text, count, disabled, onVote, testId, choiceId }) => {
  return (
    <div data-testid={testId} className="option">
      <div data-testid={choiceId}>{text}</div>
      <button disabled={disabled} onClick={onVote}>Vote</button>
      <div aria-label="votes">({count})</div>
    </div>
  );
};

export default Vote;
