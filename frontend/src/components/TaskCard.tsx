import React from "react";
import { StatusBadge } from "./StatusBadge";

type TaskCardProps = {
  id: string;
  title: string;
  status: string;
  assignee: string;
  onTransition?: (id: string, newStatus: string) => void;
  onRequestApproval?: (id: string) => void;
};

export function TaskCard({ id, title, status, assignee, onTransition, onRequestApproval }: TaskCardProps) {
  return (
    <div className="task-card" data-testid={`task-${id}`}>
      <h3>{title}</h3>
      <StatusBadge status={status} />
      <p className="assignee">Assigned to: {assignee}</p>
      {onRequestApproval && status === "in_progress" && (
        <button onClick={() => onRequestApproval(id)}>
          Submit for Approval
        </button>
      )}
      {status === "pending_approval" && (
        <p className="pending-label">Awaiting approval</p>
      )}
    </div>
  );
}
