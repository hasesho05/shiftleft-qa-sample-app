package domain

import (
	"errors"
	"time"
)

// Status represents the lifecycle state of a task.
type Status string

const (
	StatusDraft            Status = "draft"
	StatusOpen             Status = "open"
	StatusInProgress       Status = "in_progress"
	StatusPendingApproval  Status = "pending_approval"
	StatusDone             Status = "done"
)

// Task is the core domain entity.
type Task struct {
	ID              string
	Title           string
	Description     string
	Status          Status
	AssigneeID      string
	ApproverID      string
	RejectionReason string
	CreatedAt       time.Time
	UpdatedAt       time.Time
}

// validTransitions defines the allowed state machine edges.
var validTransitions = map[Status][]Status{
	StatusDraft:           {StatusOpen},
	StatusOpen:            {StatusInProgress},
	StatusInProgress:      {StatusPendingApproval},
	StatusPendingApproval: {StatusDone, StatusInProgress},
}

// Transition moves the task to newStatus if the transition is valid.
func (t *Task) Transition(newStatus Status) error {
	allowed, ok := validTransitions[t.Status]
	if !ok {
		return errors.New("no transitions from current status")
	}
	for _, s := range allowed {
		if s == newStatus {
			t.Status = newStatus
			t.UpdatedAt = time.Now()
			return nil
		}
	}
	return errors.New("invalid status transition: " + string(t.Status) + " -> " + string(newStatus))
}

// Approve transitions the task to done if it is pending approval.
func (t *Task) Approve(approverID string) error {
	if t.Status != StatusPendingApproval {
		return errors.New("task must be pending approval to approve")
	}
	t.ApproverID = approverID
	t.Status = StatusDone
	t.UpdatedAt = time.Now()
	return nil
}

// Reject returns the task to in_progress with a reason.
func (t *Task) Reject(reason string) error {
	if t.Status != StatusPendingApproval {
		return errors.New("task must be pending approval to reject")
	}
	if reason == "" {
		return errors.New("rejection reason is required")
	}
	t.RejectionReason = reason
	t.Status = StatusInProgress
	t.UpdatedAt = time.Now()
	return nil
}

// Validate checks business invariants.
func (t *Task) Validate() error {
	if t.Title == "" {
		return errors.New("title is required")
	}
	if len(t.Title) > 200 {
		return errors.New("title must be 200 characters or fewer")
	}
	return nil
}
