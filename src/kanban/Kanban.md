## React: Kanban Board

Kanban is a popular workflow used in task management, project management, issue tracking, and similar purposes. The workflow is visualized using a Kanban Board.

Create a **Kanban Board** component with tasks where each task consists of a **name** only.

### Functionalities

- The board contains **4 stages** of tasks in the sequence: **Backlog**, **To Do**, **Ongoing**, and **Done**.
- The **“New task name”** input should initially be empty.
  - The user can type a task name into this input.
  - Clicking **“Create task”** should add a new task with this name.
  - The newly created task must be added to **Backlog** (stage index `0`).
  - After creation, the input field should be **cleared**.
- If **“Create task”** is clicked when the input is **empty**, **nothing should happen**.
- In every stage, tasks are rendered inside a `<ul>`. Each task is a single `<li>` showing the name and three icon buttons on the right:
  1. **Back** button: moves the task to the **previous** stage (if any). This button is **disabled** in the first stage.
  2. **Forward** button: moves the task to the **next** stage (if any). This button is **disabled** in the last stage.
  3. **Delete** button: removes the task from the board.

### Task shape

- `name`: string (unique identifier for a task)
- `stage`: number  
  Mapping:
  - `0` → Backlog
  - `1` → To Do
  - `2` → Ongoing
  - `3` → Done

### Required `data-testid` attributes

- Input: `create-task-input`
- Button: `create-task-button`
- Stage lists (`<ul>`):
  - Backlog: `stage-0`
  - To Do: `stage-1`
  - Ongoing: `stage-2`
  - Done: `stage-3`
- For each `<li>` representing task **TASK_NAME** (lowercase, spaces replaced by hyphens):
  - Name `<span>`: **`TASK_NAME-name`**
  - Back button: **`TASK_NAME-back`**
  - Forward button: **`TASK_NAME-forward`**
  - Delete button: **`TASK_NAME-delete`**

> Example: for a task named `"task 0"`, the testids should be:  
> `task-0-name`, `task-0-back`, `task-0-forward`, `task-0-delete`.

### Notes

- Keep the required `data-testid` attributes and the class names used for rendering; do **not** change them.
- You only need to modify the Kanban Board component and its styles.
- Visual style: white background, subtle borders and shadows, green primary actions (HackerRank green).
