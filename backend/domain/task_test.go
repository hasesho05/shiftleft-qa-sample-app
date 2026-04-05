package domain

import (
	"testing"
)

func TestTransition_ValidPath(t *testing.T) {
	task := &Task{Title: "Test", Status: StatusDraft}

	if err := task.Transition(StatusOpen); err != nil {
		t.Fatalf("draft -> open should succeed: %v", err)
	}
	if task.Status != StatusOpen {
		t.Fatalf("expected open, got %s", task.Status)
	}
}

func TestTransition_InvalidSkip(t *testing.T) {
	task := &Task{Title: "Test", Status: StatusDraft}

	err := task.Transition(StatusDone)
	if err == nil {
		t.Fatal("draft -> done should fail")
	}
}

func TestValidate_EmptyTitle(t *testing.T) {
	task := &Task{Title: ""}
	if err := task.Validate(); err == nil {
		t.Fatal("empty title should fail validation")
	}
}

func TestValidate_TitleTooLong(t *testing.T) {
	long := make([]byte, 201)
	for i := range long {
		long[i] = 'a'
	}
	task := &Task{Title: string(long)}
	if err := task.Validate(); err == nil {
		t.Fatal("title > 200 chars should fail validation")
	}
}
