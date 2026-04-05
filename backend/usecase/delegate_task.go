package usecase

import "fmt"

type DelegationResult struct {
	TaskID   string
	NewOwner string
	Reason   string
}

// DelegateTask transfers ownership of a task to another user.
func DelegateTask(taskID, delegateTo, reason string) (*DelegationResult, error) {
	if taskID == "" {
		return nil, fmt.Errorf("taskID is required")
	}
	if delegateTo == "" {
		return nil, fmt.Errorf("delegateTo is required")
	}

	// In a real implementation, this would update the database
	return &DelegationResult{
		TaskID:   taskID,
		NewOwner: delegateTo,
		Reason:   reason,
	}, nil
}
