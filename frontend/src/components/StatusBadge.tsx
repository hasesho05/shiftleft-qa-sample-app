import React from "react";

type StatusBadgeProps = {
  status: string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  open: "Open",
  in_progress: "In Progress",
  review: "In Review",
  approved: "Approved",
  done: "Done",
  rejected: "Rejected",
};

const statusColors: Record<string, string> = {
  draft: "#9ca3af",
  open: "#3b82f6",
  in_progress: "#f59e0b",
  review: "#8b5cf6",
  approved: "#10b981",
  done: "#10b981",
  rejected: "#ef4444",
};

const statusIcons: Record<string, string> = {
  draft: "📝",
  open: "📋",
  in_progress: "🔄",
  review: "👀",
  approved: "✅",
  done: "✅",
  rejected: "❌",
};

const sizeStyles: Record<string, { padding: string; fontSize: string }> = {
  sm: { padding: "1px 6px", fontSize: "10px" },
  md: { padding: "2px 8px", fontSize: "12px" },
  lg: { padding: "4px 12px", fontSize: "14px" },
};

export function StatusBadge({
  status,
  size = "md",
  showIcon = false,
}: StatusBadgeProps) {
  const label = statusLabels[status] ?? status;
  const icon = showIcon ? statusIcons[status] ?? "" : "";
  const sizeStyle = sizeStyles[size] ?? sizeStyles.md;

  return (
    <span
      className="status-badge"
      data-status={status}
      data-size={size}
      style={{
        backgroundColor: statusColors[status] ?? "#6b7280",
        color: "white",
        padding: sizeStyle.padding,
        borderRadius: "4px",
        fontSize: sizeStyle.fontSize,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  );
}
