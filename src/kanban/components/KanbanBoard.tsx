import React, { useMemo, useState } from "react";
import './index.css'

type Task = { id: string; name: string; stage: number };
const STAGES = ["Backlog", "To Do", "Ongoing", "Done"] as const;

const slug = (s: string) => s.trim().toLowerCase().replace(/\s+/g, "-");

const makeId = () => Math.random().toString(36).slice(2, 10)

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    // optional seed if you want to see something:
    // { name: "task 0", stage: 0 },
    // { name: "task 1", stage: 1 }
  ]);
  const [name, setName] = useState("");

  const grouped = useMemo<Task[][]>(() => {
    const out: Task[][] = Array.from({ length: STAGES.length }, () => []);
    for (const t of tasks) out[t.stage].push(t);
    return out;
  }, [tasks]);

  const createTask = () => {
    if(name.trim() === "") {
      return;
    } else {
      const newTask: Task = { id: makeId(), name, stage: 0 };
      setTasks([...tasks, newTask]);
      setName("");
    }
    // TODO: if name empty => do nothing; else push {name, stage:0}; clear input
  };

  const back = (t: Task) => {
    if(t.stage === 0) {
      return;
    }
    const movedTask = {...t, stage: t.stage - 1};
    const updatedTask = tasks.map((task) => (task.id === t.id ? movedTask : task ))
    setTasks(updatedTask);
  }

  const forward = (t: Task) => {
    if(t.stage === STAGES.length) {
      return;
    }
    const movedTask = {...t, stage: t.stage + 1};
    const updatedTask = tasks.map((task) => (task.id === t.id ? movedTask : task ))
    setTasks(updatedTask);
  };

  const remove = (t: Task) => {
    const filteredTasks = tasks.filter(task => task.id !== t.id);
    setTasks(filteredTasks);
  };

  return (
    <div className="kanban">
      <div className="controls">
        <input
          className="task-input"
          data-testid="create-task-input"
          placeholder="New task name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button data-testid="create-task-button" onClick={createTask}>Create task</button>
      </div>

      <div className="stages" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {STAGES.map((stageName, i) => (
          <div key={i}>
            <h3>{stageName}</h3>
            <ul data-testid={`stage-${i}`}>
              {grouped[i].map((t) => {
                const id = slug(t.name);
                return (
                  <li key={id} className="task">
                    <div className="li-content" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span data-testid={`${id}-name`}>{t.name}</span>
                      <div className="icons" style={{ display: "flex", gap: 8 }}>
                        <button
                          data-testid={`${id}-back`}
                          disabled={t.stage === 0}
                          onClick={() => back(t)}
                          className="back-btn"
                        >
                          Back
                        </button>
                        <button
                          data-testid={`${id}-forward`}
                          disabled={t.stage === STAGES.length - 1}
                          onClick={() => forward(t)}
                          className="forward-btn"
                        >
                          Forward
                        </button>
                        <button
                          data-testid={`${id}-delete`}
                          onClick={() => remove(t)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
