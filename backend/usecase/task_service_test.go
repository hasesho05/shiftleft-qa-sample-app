package usecase

import (
	"testing"

	"github.com/hasesho05/shiftleft-qa-sample-app/backend/domain"
)

type mockRepo struct {
	tasks map[string]*domain.Task
}

func newMockRepo() *mockRepo {
	return &mockRepo{tasks: make(map[string]*domain.Task)}
}

func (m *mockRepo) FindByID(id string) (*domain.Task, error) {
	t, ok := m.tasks[id]
	if !ok {
		return nil, nil
	}
	return t, nil
}

func (m *mockRepo) Save(task *domain.Task) error {
	m.tasks[task.ID] = task
	return nil
}

func TestCreate_ValidTask(t *testing.T) {
	svc := NewTaskService(newMockRepo())
	task := &domain.Task{ID: "1", Title: "My Task"}
	if err := svc.Create(task); err != nil {
		t.Fatalf("create should succeed: %v", err)
	}
	if task.Status != domain.StatusDraft {
		t.Fatalf("new task should be draft, got %s", task.Status)
	}
}

func TestCreate_InvalidTask(t *testing.T) {
	svc := NewTaskService(newMockRepo())
	task := &domain.Task{ID: "1", Title: ""}
	if err := svc.Create(task); err == nil {
		t.Fatal("create with empty title should fail")
	}
}

func TestTransitionStatus_NotFound(t *testing.T) {
	svc := NewTaskService(newMockRepo())
	err := svc.TransitionStatus("nonexistent", domain.StatusOpen)
	if err == nil {
		t.Fatal("should return error for missing task")
	}
}
