import { render, screen, fireEvent } from "@testing-library/react";
import FlashCardDeck from "./components/FlashCardDeck";
import { flashCardsData } from "./data/cards-data";

describe("Flashcards", () => {
  it("renders deck and shows questions first", () => {
    render(<FlashCardDeck flashCards={flashCardsData} />);
    expect(screen.getByTestId("flashcard-deck")).toBeInTheDocument();

    for (const c of flashCardsData) {
      expect(screen.getByTestId(`flashcard-question-${c.id}`)).toBeInTheDocument();
    }
  });

  it("clicking a card flips to show the answer", () => {
    render(<FlashCardDeck flashCards={flashCardsData} />);
    const card = screen.getByTestId("flashcard-container-1");
    fireEvent.click(card);
    expect(screen.getByTestId("flashcard-answer-1")).toBeInTheDocument();
  });

  it("shuffle reorders; new order differs from original", () => {
    render(<FlashCardDeck flashCards={flashCardsData} />);
    const before = [...document.querySelectorAll('[data-testid^="flashcard-container-"]')]
      .map(el => Number(el.getAttribute("data-testid")!.split("-").pop()));
    fireEvent.click(screen.getByTestId("shuffle-button"));
    const after = [...document.querySelectorAll('[data-testid^="flashcard-container-"]')]
      .map(el => Number(el.getAttribute("data-testid")!.split("-").pop()));
    expect(after.join(",")).not.toBe(before.join(","));
  });
});
