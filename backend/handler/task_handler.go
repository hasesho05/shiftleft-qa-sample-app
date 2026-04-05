package handler

import (
	"encoding/json"
	"net/http"

	"github.com/hasesho05/shiftleft-qa-sample-app/backend/domain"
	"github.com/hasesho05/shiftleft-qa-sample-app/backend/usecase"
)

// TaskHandler handles HTTP requests for tasks.
type TaskHandler struct {
	service *usecase.TaskService
}

// NewTaskHandler creates a TaskHandler.
func NewTaskHandler(service *usecase.TaskService) *TaskHandler {
	return &TaskHandler{service: service}
}

// CreateTask handles POST /tasks.
func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var input struct {
		ID    string `json:"id"`
		Title string `json:"title"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	task := &domain.Task{ID: input.ID, Title: input.Title}
	if err := h.service.Create(task); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(task)
}

// TransitionTask handles POST /tasks/:id/transition.
func (h *TaskHandler) TransitionTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	taskID := r.PathValue("id")
	var input struct {
		Status string `json:"status"`
	}
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "invalid request body", http.StatusBadRequest)
		return
	}

	if err := h.service.TransitionStatus(taskID, domain.Status(input.Status)); err != nil {
		http.Error(w, err.Error(), http.StatusUnprocessableEntity)
		return
	}

	w.WriteHeader(http.StatusOK)
}
