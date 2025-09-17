import { fireEvent, render, screen, within } from "@testing-library/react";
import KanbanBoard from "./components/KanbanBoard";

const getStage = (n: 0 | 1 | 2 | 3) => screen.getByTestId(`stage-${n}`);

describe("Kanban Board", () => {
  it("creates task only when input has text and starts in stage 0; clears input", () => {
    render(<KanbanBoard />);
    const input = screen.getByTestId("create-task-input") as HTMLInputElement;
    fireEvent.click(screen.getByTestId("create-task-button"));
    expect(getStage(0).querySelectorAll("li").length).toBe(0);

    fireEvent.change(input, { target: { value: "task 0" } });
    fireEvent.click(screen.getByTestId("create-task-button"));
    expect(within(getStage(0)).getByTestId("task-0-name")).toBeInTheDocument();
    expect(input.value).toBe("");
  });

  it("moves forward/back and disables at ends; delete removes", () => {
    render(<KanbanBoard />);
    const input = screen.getByTestId("create-task-input");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(screen.getByTestId("create-task-button"));

    const name = within(getStage(0)).getByTestId("abc-name");
    const back = within(getStage(0)).getByTestId("abc-back") as HTMLButtonElement;
    const fwd = within(getStage(0)).getByTestId("abc-forward") as HTMLButtonElement;
    expect(back).toBeDisabled();
    expect(fwd).not.toBeDisabled();

    fireEvent.click(fwd); // -> stage 1
    expect(within(getStage(1)).getByTestId("abc-name")).toBeInTheDocument();

    fireEvent.click(within(getStage(1)).getByTestId("abc-forward")); // -> 2
    fireEvent.click(within(getStage(2)).getByTestId("abc-forward")); // -> 3
    const fwd3 = within(getStage(3)).getByTestId("abc-forward") as HTMLButtonElement;
    expect(fwd3).toBeDisabled();

    fireEvent.click(within(getStage(3)).getByTestId("abc-delete"));
    expect(getStage(3).querySelectorAll("li").length).toBe(0);
  });
});
