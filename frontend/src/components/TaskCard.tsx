import React from "react";
import { StatusBadge } from "./StatusBadge";

type TaskCardProps = {
  id: string;
  title: string;
  status: string;
  assignee: string;
  onTransition?: (id: string, newStatus: string) => void;
};

export function TaskCard({ id, title, status, assignee, onTransition }: TaskCardProps) {
  return (
    <div className="task-card" data-testid={`task-${id}`}>
      <h3>{title}</h3>
      <StatusBadge status={status} />
      <p className="assignee">Assigned to: {assignee}</p>
      {onTransition && status === "in_progress" && (
        <button onClick={() => onTransition(id, "done")}>
          Mark Done
        </button>
      )}
    </div>
  );
}
