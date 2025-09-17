import React, { useMemo, useState } from "react";
import FlashCardComponent from "./FlashCard";
import type { FlashCardDeckProps, FlashCard } from "../types";
import './index.css'

/**
 * Renders the deck and a Shuffle button.
 * DOM requirements:
 * - deck container: data-testid="flashcard-deck"
 * - shuffle button: data-testid="shuffle-button"
 */

const FlashCardDeck: React.FC<FlashCardDeckProps> = ({ flashCards }) => {
  const original = useMemo(() => flashCards.map(c => c.id), [flashCards]);
  const [order, setOrder] = useState<number[]>(original); // keep ids only

  // TODO: implement a shuffle that guarantees a different order than `original`
  const shuffle = () => {
    const newOrder = [...order];
    let currentIndex = order.length;
    let randomIndex: number;

    while(currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [newOrder[currentIndex], newOrder[randomIndex]] = [newOrder[randomIndex], newOrder[currentIndex]];
    }
    setOrder([...newOrder]);
  };

  const byId = useMemo<Record<number, FlashCard>>(() => {
    const map: Record<number, FlashCard> = {};
    flashCards.forEach(c => (map[c.id] = c));
    return map;
  }, [flashCards]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div
        className="flashcard-deck"
        data-testid="flashcard-deck"
      >
        {order.map(o => <FlashCardComponent key={o} flashCard={byId[o]} />)}
      </div>

      <div className="mt-4">
        <button
          data-testid="shuffle-button"
          onClick={() => shuffle()}
          className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white font-medium shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Shuffle
        </button>
      </div>
    </div>
  );
};

export default FlashCardDeck;
