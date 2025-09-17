import React, { useState } from "react";
import Vote from "./Vote";
import Results from "./Results";
import "./index.css";

/**
 * State owner. Must expose:
 * - data-testid="poll-manager" on the container
 * - pass counts to Vote, disable Vote buttons after winner declared
 */
const PollManager: React.FC = () => {
  const [aCount, setACount] = useState(0);
  const [bCount, setBCount] = useState(0);
  const [locked, setLocked] = useState(false);

  const aText = "Superman";
  const bText = "Batman";

  // TODO: onVote handlers (no voting after locked)
  const onVoteA = () => {
    if(!locked) {
      setACount(aCount => aCount+1)
    }
  };
  const onVoteB = () => {
    if(!locked) {
      setBCount(bCount => bCount+1)
    }
  };

  // TODO: onDeclare (set locked)
  const onDeclare = () => {
    setLocked(true)
  };

  return (
    <div data-testid="poll-manager">
      <h3>Who is your favorite superhero?</h3>
      <div style={{ display: "flex", gap: 16 }}>
        <Vote
          text={aText}
          count={aCount}
          disabled={locked}
          onVote={onVoteA}
          testId="option-1"
          choiceId="choice-1"
        />
        <Vote
          text={bText}
          count={bCount}
          disabled={locked}
          onVote={onVoteB}
          testId="option-2"
          choiceId="choice-2"
        />
      </div>

      <Results
        aText={aText}
        bText={bText}
        aCount={aCount}
        bCount={bCount}
        locked={locked}
        onDeclare={onDeclare}
      />
    </div>
  );
};

export default PollManager;
