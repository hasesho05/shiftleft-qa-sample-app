-- Add approval workflow columns to tasks table
ALTER TABLE tasks ADD COLUMN approver_id TEXT;
ALTER TABLE tasks ADD COLUMN rejection_reason TEXT;
ALTER TABLE tasks ADD COLUMN approved_at TIMESTAMP;

-- Add pending_approval to the status check constraint
-- (SQLite does not support ALTER CHECK, so this is for documentation)
-- Valid statuses: draft, open, in_progress, pending_approval, done

CREATE INDEX idx_tasks_pending_approval ON tasks(status) WHERE status = 'pending_approval';
