package usecase

import (
	"errors"

	"github.com/hasesho05/shiftleft-qa-sample-app/backend/domain"
)

// TaskRepository abstracts persistence.
type TaskRepository interface {
	FindByID(id string) (*domain.Task, error)
	Save(task *domain.Task) error
}

// TaskService orchestrates task operations.
type TaskService struct {
	repo TaskRepository
}

// NewTaskService creates a TaskService.
func NewTaskService(repo TaskRepository) *TaskService {
	return &TaskService{repo: repo}
}

// Create validates and persists a new task.
func (s *TaskService) Create(task *domain.Task) error {
	if err := task.Validate(); err != nil {
		return err
	}
	task.Status = domain.StatusDraft
	return s.repo.Save(task)
}

// TransitionStatus moves a task to a new status.
func (s *TaskService) TransitionStatus(id string, newStatus domain.Status) error {
	task, err := s.repo.FindByID(id)
	if err != nil {
		return err
	}
	if task == nil {
		return errors.New("task not found")
	}
	if err := task.Transition(newStatus); err != nil {
		return err
	}
	return s.repo.Save(task)
}

// SubmitForApproval moves a task to pending_approval status.
func (s *TaskService) SubmitForApproval(id string) error {
	return s.TransitionStatus(id, domain.StatusPendingApproval)
}

// ApproveTask approves a pending task.
func (s *TaskService) ApproveTask(id string, approverID string, role string) error {
	if role != "lead" && role != "admin" {
		return errors.New("only lead or admin can approve tasks")
	}
	task, err := s.repo.FindByID(id)
	if err != nil {
		return err
	}
	if task == nil {
		return errors.New("task not found")
	}
	if err := task.Approve(approverID); err != nil {
		return err
	}
	return s.repo.Save(task)
}

// RejectTask rejects a pending task with a reason.
func (s *TaskService) RejectTask(id string, reason string) error {
	task, err := s.repo.FindByID(id)
	if err != nil {
		return err
	}
	if task == nil {
		return errors.New("task not found")
	}
	if err := task.Reject(reason); err != nil {
		return err
	}
	return s.repo.Save(task)
}
