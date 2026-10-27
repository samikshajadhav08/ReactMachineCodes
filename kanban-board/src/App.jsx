import { useState } from "react";
import "./App.css";

const initialTasks = [
  { id: 1, title: "Learn React Hooks", status: "todo" },
  { id: 2, title: "Build a Login Form", status: "progress" },
  { id: 3, title: "Practice JavaScript", status: "todo" },
  { id: 4, title: "Complete API Integration", status: "done" },
];

const columns = [
  { id: "todo", title: "To Do" },
  { id: "progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const handleAddTask = (event) => {
    event.preventDefault();

    const title = newTask.trim();

    if (!title) return;

    const task = {
      id: crypto.randomUUID(),
      title,
      status: "todo",
    };

    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask("");
  };

  // Start dragging a task
  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData("text/plain", String(taskId));
    event.dataTransfer.effectAllowed = "move";
  };

  // Allow dropping inside a column
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Move a task to another column
  const handleDrop = (event, newStatus) => {
    event.preventDefault();

    const taskId = event.dataTransfer.getData("text/plain");

    if (!taskId) return;

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        String(task.id) === taskId ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="app">
      <header className="board-header">
        <h1>My Kanban Board</h1>
        <p>Organize your work and track your progress.</p>
      </header>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          aria-label="New task title"
        />

        <button type="submit">+ Add Task</button>
      </form>

      <main className="board">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <section
              className={`column column-${column.id}`}
              key={column.id}
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, column.id)}
            >
              <div className="column-header">
                <h2>{column.title}</h2>
                <span className="task-count">{columnTasks.length}</span>
              </div>

              <div className="task-list">
                {columnTasks.length === 0 ? (
                  <p className="empty-message">
                    No tasks here. Drop a task here.
                  </p>
                ) : (
                  columnTasks.map((task) => (
                    <article
                      className="task-card"
                      key={task.id}
                      draggable
                      onDragStart={(event) => handleDragStart(event, task.id)}
                    >
                      <p>{task.title}</p>

                      <div className="task-actions">
                        <span className="drag-hint">⠿ Drag to move</span>

                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDeleteTask(task.id)}
                          onDragStart={(event) => event.stopPropagation()}
                          draggable={false}
                          aria-label={`Delete ${task.title}`}
                        >
                          Delete
                        </button>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}

export default App;
