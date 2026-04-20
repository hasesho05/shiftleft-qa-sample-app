import React, { useEffect, useState } from "react";

type ApprovalTask = {
  id: string;
  title: string;
  status: string;
  requestedBy: string;
  requestedAt: string;
};

export function TaskApprovalPage() {
  const [tasks, setTasks] = useState<ApprovalTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPendingApprovals()
      .then(setTasks)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load"))
      .finally(() => setLoading(false));
  }, []);

  function toggleSelection(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleBulkApprove() {
    if (selectedIds.size === 0) return;
    try {
      await bulkApprove([...selectedIds]);
      setTasks((prev) =>
        prev.filter((t) => !selectedIds.has(t.id))
      );
      setSelectedIds(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Approval failed");
    }
  }

  async function handleBulkReject() {
    if (selectedIds.size === 0) return;
    try {
      await bulkReject([...selectedIds]);
      setTasks((prev) =>
        prev.filter((t) => !selectedIds.has(t.id))
      );
      setSelectedIds(new Set());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Rejection failed");
    }
  }

  if (loading) return <div data-testid="loading">Loading approvals...</div>;
  if (error) return <div data-testid="error" role="alert">{error}</div>;

  return (
    <div className="approval-page" data-testid="approval-page">
      <h1>Pending Approvals</h1>
      <div className="approval-actions">
        <button
          onClick={handleBulkApprove}
          disabled={selectedIds.size === 0}
          data-testid="bulk-approve-btn"
        >
          Approve Selected ({selectedIds.size})
        </button>
        <button
          onClick={handleBulkReject}
          disabled={selectedIds.size === 0}
          data-testid="bulk-reject-btn"
        >
          Reject Selected ({selectedIds.size})
        </button>
      </div>
      {tasks.length === 0 ? (
        <p data-testid="empty-state">No pending approvals</p>
      ) : (
        <ul data-testid="approval-list">
          {tasks.map((task) => (
            <li key={task.id} data-testid={`approval-item-${task.id}`}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedIds.has(task.id)}
                  onChange={() => toggleSelection(task.id)}
                />
                <strong>{task.title}</strong> — requested by {task.requestedBy}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

async function fetchPendingApprovals(): Promise<ApprovalTask[]> {
  const res = await fetch("/api/tasks/pending-approvals");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function bulkApprove(ids: string[]): Promise<void> {
  const res = await fetch("/api/tasks/bulk-approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskIds: ids }),
  });
  if (!res.ok) throw new Error(`Approval failed: HTTP ${res.status}`);
}

async function bulkReject(ids: string[]): Promise<void> {
  const res = await fetch("/api/tasks/bulk-reject", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ taskIds: ids }),
  });
  if (!res.ok) throw new Error(`Rejection failed: HTTP ${res.status}`);
}
