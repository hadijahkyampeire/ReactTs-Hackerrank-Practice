## React (TypeScript): Flashcards

Using Typescript and React, design a flashcard app that displays a series of flashcards with questions on the front and answers on the back. Certain core React functionalities are already implemented.

The application has two components: `FlashCardDeck.tsx` and `FlashCard.tsx` where the functionalities should be implemented.

### Functionalities

- Display a series of flashcards with questions on the front and answers on the back.
- Clicking a flashcard should flip it to reveal the other side.
- Update the `isFlipped` constant to a state variable in `src/flashcards/components/FlashCard.tsx`.
  - When `isFlipped` is **true**:
    - `flipped` is appended to divs with the class name `flashcard-content`.
    - the **answer** is shown.
  - When `isFlipped` is **false**:
    - `""` (empty string) is appended to divs with the class name `flashcard-content`.
    - the **question** is shown.
- Clicking the **Shuffle** button should reorder the flashcards.
- Ensure the shuffled order of the flashcards is **different** from the original order present in `src/flashcards/data/cards-data.ts`.

### Types

All the types are defined under file `src/flashcards/types.ts`.

Create a type for `FlashCard` in `src/flashcards/types.ts` with the following properties:

- `id`, a **number**  
- `question`, a **string**  
- `answer`, a **string**

### Data-testid attributes (required)

| Attribute                         | Component                               |
| --------------------------------- | --------------------------------------- |
| `flashcard-deck`                  | the main FlashCardApp component         |
| `flashcard-container-{card.id}`   | an individual FlashCard                  |
| `flashcard-question-{card.id}`    | the question text in a FlashCard        |
| `flashcard-answer-{card.id}`      | the answer text in a FlashCard          |
| `shuffle-button`                  | a button to shuffle the flashcards      |

**Note:**
- Components have `data-testid` attributes for test cases and certain classes/ids for rendering purposes. **They should not be changed.**
- The files that should be modified by the candidate are:
  - `src/flashcards/components/FlashCardDeck.tsx`
  - `src/flashcards/components/FlashCard.tsx`
  - `src/flashcards/types.ts`
