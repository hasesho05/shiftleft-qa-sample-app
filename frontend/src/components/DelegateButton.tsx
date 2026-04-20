import React, { useState } from "react";

type DelegateButtonProps = {
  taskId: string;
  onDelegated?: (newOwner: string) => void;
};

export function DelegateButton({ taskId, onDelegated }: DelegateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [delegateTo, setDelegateTo] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!delegateTo.trim()) {
      setError("Delegate target is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tasks/delegate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, delegateTo, reason }),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      setIsOpen(false);
      setDelegateTo("");
      setReason("");
      onDelegated?.(data.newOwner);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delegation failed");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        data-testid="delegate-trigger"
      >
        Delegate
      </button>
    );
  }

  return (
    <div className="delegate-form" data-testid="delegate-form">
      <input
        type="text"
        placeholder="Delegate to..."
        value={delegateTo}
        onChange={(e) => setDelegateTo(e.target.value)}
        data-testid="delegate-to-input"
      />
      <textarea
        placeholder="Reason (optional)"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        data-testid="delegate-reason-input"
      />
      {error && <p data-testid="delegate-error" role="alert">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        data-testid="delegate-submit"
      >
        {loading ? "Delegating..." : "Confirm Delegation"}
      </button>
      <button
        onClick={() => setIsOpen(false)}
        data-testid="delegate-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
