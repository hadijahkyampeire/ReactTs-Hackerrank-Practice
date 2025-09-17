import React, { useState } from "react";
import type { FlashCardProps } from "../types";
import './index.css';

/**
 * Shows one card. Clicking toggles front/back.
 * DOM requirements:
 * - outer div: data-testid="flashcard-container-{id}"
 * - question div: data-testid="flashcard-question-{id}"
 * - answer   div: data-testid="flashcard-answer-{id}"
 */
const FlashCard: React.FC<FlashCardProps> = ({ flashCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      data-testid={`flashcard-container-${flashCard.id}`}
      className="flashcard"
      onClick={() => setIsFlipped(f => !f)}
    >
      <div className={`flashcard-content ${isFlipped ? 'flipped': ''}`}>
        <div className="front" data-testid={`flashcard-question-${flashCard.id}`}>{flashCard.question}</div>
        <div className="back" data-testid={`flashcard-answer-${flashCard.id}`}>{flashCard.answer}</div>
      </div>
    </div>
  );
};

export default FlashCard;
