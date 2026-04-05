type Task = {
  id: string;
  title: string;
  status: string;
  assignee: string;
};

const API_BASE = "/api";

export async function fetchTasks(): Promise<Task[]> {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function transitionTask(id: string, newStatus: string): Promise<void> {
  const res = await fetch(`${API_BASE}/tasks/${id}/transition`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!res.ok) throw new Error("Failed to transition task");
}
