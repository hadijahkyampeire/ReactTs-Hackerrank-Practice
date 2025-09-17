## React (TypeScript): Poll Manager

Design a small poll app that lets users vote for one of two options and view the winner. The app has three components:

- `PollManager.tsx` — owns state and wires callbacks
- `Vote.tsx` — renders an option with a **Vote** button and count
- `Results.tsx` — shows running status and a **View Winner** button

> Keep all `data-testid` attributes exactly as specified.

### Files to modify
- `src/poll/components/PollManager.tsx`
- `src/poll/components/Vote.tsx`
- `src/poll/components/Results.tsx`

---

### Requirements

#### Vote behavior
- Each `Vote` shows:
  - the option text in a node with `data-testid="choice-1"` or `"choice-2"`
  - a **Vote** button
  - the current count in a node with `aria-label="votes"` as text like `(3)`
- The **Vote** button triggers the provided `onVote` callback.
- When the poll is **locked** (winner declared), both **Vote** buttons are **disabled**.

#### Live status (Results, when not locked)
Compute **running** status from counts:

- If **no votes** (total = 0): show an **empty string** `""`.
- If **tie** (counts equal, total > 0): show **`It's a tie`**.
- Otherwise: show  
  **`{LEADER} is leading by {DIFF} vote(s)`**  
  where:
  - `LEADER` is `aText` or `bText` (the option with higher count)
  - `DIFF` is the absolute difference between counts

#### View Winner
- Button has `data-testid="result-button"` (and a hidden `winner-button` test id is present for compatibility).
- The button is **disabled** when `total === 0` or the poll is already **locked**.
- Clicking the button **locks** the poll and the status changes to **final**:
  - If tie: **`It's a tie`**
  - Else: **`{LEADER} won by {DIFF} vote(s)`**
- After locking, disable:
  - the **View Winner** button
  - both **Vote** buttons

---

### DOM test contract

- Poll container: `data-testid="poll-manager"`
- Option boxes: `data-testid="option-1"`, `data-testid="option-2"`
- Choice text: `data-testid="choice-1"`, `data-testid="choice-2"`
- Running/final text node: `data-testid="result-text"`
- Winner button: `data-testid="result-button"` (plus a hidden `winner-button` for compatibility)

---

### Implementation tips

- Keep `aCount`, `bCount`, and `locked` in `PollManager` state.
- In `PollManager`, `onVoteA` / `onVoteB` should increment only when `locked === false`.
- `Results` should:
  - receive `aText`, `bText`, `aCount`, `bCount`, `locked`
  - compute the running text when `locked === false`
  - compute the final text when `locked === true`
  - call `onDeclare` when “View Winner” is clicked
- Styling is provided in `src/poll/components/index.css`:
  - white cards, subtle borders/shadows
  - green primary buttons and accessible focus rings
  - disabled buttons appear gray and are not clickable
