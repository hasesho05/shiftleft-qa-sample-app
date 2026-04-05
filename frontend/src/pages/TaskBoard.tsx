import React, { useEffect } from "react";
import { TaskCard } from "../components/TaskCard";
import { useTaskStore } from "../store/taskStore";
import { fetchTasks, transitionTask } from "../api/tasks";

export function TaskBoard() {
  const { tasks, setTasks, updateTaskStatus } = useTaskStore();

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, [setTasks]);

  const handleTransition = async (id: string, newStatus: string) => {
    await transitionTask(id, newStatus);
    updateTaskStatus(id, newStatus);
  };

  return (
    <div className="task-board">
      <h1>Task Board</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            assignee={task.assignee}
            onTransition={handleTransition}
          />
        ))}
      </div>
    </div>
  );
}

// DelegateButton integration point (imported in TaskCard)
export const DELEGATION_ENABLED = true;
