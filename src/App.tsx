import { useState } from "react";
import FlashCardDeck from "./flashcards/components/FlashCardDeck";
import { flashCardsData } from "./flashcards/data/cards-data";
import KanbanBoard from "./kanban/components/KanbanBoard";
import PollManager from "./poll/components/PollManager";

type View = "flashcards" | "kanban" | "poll";

export default function App() {
  const [view, setView] = useState<View>("flashcards");

  const tabs: { key: View; label: string }[] = [
    { key: "flashcards", label: "Flashcards" },
    { key: "kanban", label: "Kanban" },
    { key: "poll", label: "Poll Manager" },
  ];

  return (
    <div className="min-h-screen bg-white text-neutral-100">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* simple “HR” mark */}
            <div className="h-8 w-8 rounded-md bg-green-500 grid place-items-center font-black text-neutral-900">
              HR
            </div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
              React TS Hackerrank Practice
            </h1>
          </div>

          {/* Tabs */}
          <nav
            aria-label="Select exercise"
            className="flex items-center gap-2 rounded-lg border border-neutral-800 p-1 bg-neutral-900/40"
          >
            {tabs.map((t) => {
              const active = view === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setView(t.key)}
                  aria-pressed={active}
                  className={[
                    "px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/70",
                    active
                      ? "bg-green-500 text-neutral-900 shadow shadow-green-500/30"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-800"
                  ].join(" ")}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-8xl px-4 py-6 sm:py-8">
        <section className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 sm:p-6">
          {view === "flashcards" && <FlashCardDeck flashCards={flashCardsData} />}
          {view === "kanban" && <KanbanBoard />}
          {view === "poll" && <PollManager />}
        </section>
      </main>

      {/* Footer accent */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-neutral-400">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
            HackerRank style: green & black
          </span>
        </div>
      </footer>
    </div>
  );
}
