import { fireEvent, render, screen } from "@testing-library/react";
import PollManager from "./components/PollManager";

const resultText = () => screen.getByTestId("result-text");

describe("Poll Manager", () => {
  it("renders pieces and has disabled View Winner initially", () => {
    render(<PollManager />);
    expect(screen.getByTestId("poll-manager")).toBeInTheDocument();
    expect(screen.getByTestId("option-1")).toBeInTheDocument();
    expect(screen.getByTestId("option-2")).toBeInTheDocument();
    expect(screen.getByTestId("choice-1")).toHaveTextContent(/superman/i);
    expect(screen.getByTestId("choice-2")).toHaveTextContent(/batman/i);
    const btn = screen.getByTestId("result-button") as HTMLButtonElement;
    expect(btn).toBeDisabled();
    expect(resultText()).toHaveTextContent("");
  });

  it("running status shows leader and diff; tie shows tie", () => {
    render(<PollManager />);
    const [voteA, voteB] = screen.getAllByText("Vote");
    fireEvent.click(voteA); // A:1
    expect(resultText()).toHaveTextContent(/superman is leading by 1 vote/i);
    fireEvent.click(voteB); // A:1 B:1
    expect(resultText()).toHaveTextContent(/it's a tie/i);
  });

  it("declaring winner shows final text and disables voting and button", () => {
    render(<PollManager />);
    const [voteA] = screen.getAllByText("Vote");
    fireEvent.click(voteA); fireEvent.click(voteA); // A:2, B:0
    const btn = screen.getByTestId("result-button") as HTMLButtonElement;
    expect(btn).not.toBeDisabled();
    fireEvent.click(btn);
    expect(resultText()).toHaveTextContent(/superman won by 2 vote/i);
    // vote buttons disabled after lock
    const votes = screen.getAllByText("Vote") as HTMLButtonElement[];
    votes.forEach(v => expect(v).toBeDisabled());
    expect(btn).toBeDisabled();
  });
});
