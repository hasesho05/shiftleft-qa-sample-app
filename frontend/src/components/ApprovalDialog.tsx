import React, { useState } from "react";

type ApprovalDialogProps = {
  taskId: string;
  taskTitle: string;
  isOpen: boolean;
  onApprove: (taskId: string) => void;
  onReject: (taskId: string, reason: string) => void;
  onClose: () => void;
};

export function ApprovalDialog({
  taskId,
  taskTitle,
  isOpen,
  onApprove,
  onReject,
  onClose,
}: ApprovalDialogProps) {
  const [rejectionReason, setRejectionReason] = useState("");
  const [mode, setMode] = useState<"choose" | "reject">("choose");

  if (!isOpen) return null;

  const handleReject = () => {
    if (rejectionReason.trim() === "") return;
    onReject(taskId, rejectionReason);
    setRejectionReason("");
    setMode("choose");
  };

  return (
    <div className="approval-dialog-overlay" role="dialog" aria-modal="true">
      <div className="approval-dialog">
        <h2>Review Task</h2>
        <p>
          <strong>{taskTitle}</strong>
        </p>

        {mode === "choose" ? (
          <div className="approval-actions">
            <button
              className="btn-approve"
              onClick={() => onApprove(taskId)}
            >
              Approve
            </button>
            <button
              className="btn-reject"
              onClick={() => setMode("reject")}
            >
              Reject
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="rejection-form">
            <label htmlFor="rejection-reason">Rejection Reason</label>
            <textarea
              id="rejection-reason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              rows={3}
            />
            <div className="rejection-actions">
              <button
                className="btn-confirm-reject"
                onClick={handleReject}
                disabled={rejectionReason.trim() === ""}
              >
                Confirm Rejection
              </button>
              <button className="btn-cancel" onClick={() => setMode("choose")}>
                Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
