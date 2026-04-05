package handler

import (
	"encoding/json"
	"net/http"

	"github.com/hasesho05/shiftleft-qa-sample-app/backend/usecase"
)

type DelegateRequest struct {
	TaskID     string `json:"taskId"`
	DelegateTo string `json:"delegateTo"`
	Reason     string `json:"reason"`
}

type DelegateResponse struct {
	Success bool   `json:"success"`
	TaskID  string `json:"taskId"`
	NewOwner string `json:"newOwner"`
}

func HandleDelegateTask(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req DelegateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if req.TaskID == "" || req.DelegateTo == "" {
		http.Error(w, "taskId and delegateTo are required", http.StatusBadRequest)
		return
	}

	result, err := usecase.DelegateTask(req.TaskID, req.DelegateTo, req.Reason)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(DelegateResponse{
		Success:  true,
		TaskID:   result.TaskID,
		NewOwner: result.NewOwner,
	})
}
