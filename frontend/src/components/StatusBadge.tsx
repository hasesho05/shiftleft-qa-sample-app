import React from "react";

type StatusBadgeProps = {
  status: string;
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  open: "Open",
  in_progress: "In Progress",
  done: "Done",
};

const statusColors: Record<string, string> = {
  draft: "#9ca3af",
  open: "#3b82f6",
  in_progress: "#f59e0b",
  done: "#10b981",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: statusColors[status] ?? "#6b7280",
        color: "white",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
      }}
    >
      {statusLabels[status] ?? status}
    </span>
  );
}
