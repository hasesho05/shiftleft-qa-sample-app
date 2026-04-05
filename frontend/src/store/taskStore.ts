import { useState, useCallback } from "react";

type Task = {
  id: string;
  title: string;
  status: string;
  assignee: string;
  approverID?: string;
  rejectionReason?: string;
};

export function useTaskStore() {
  const [tasks, setTasksState] = useState<Task[]>([]);

  const setTasks = useCallback((newTasks: Task[]) => {
    setTasksState(newTasks);
  }, []);

  const updateTaskStatus = useCallback((id: string, newStatus: string) => {
    setTasksState((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }, []);

  return { tasks, setTasks, updateTaskStatus };
}
